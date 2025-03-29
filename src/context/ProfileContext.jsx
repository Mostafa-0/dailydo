import { createContext, useState, useContext, useEffect } from "react";
import { auth } from "../firebase/auth";
import {
  updateProfile,
  sendEmailVerification,
  updatePassword,
  verifyBeforeUpdateEmail,
  deleteUser,
} from "firebase/auth";
import { reauthenticate } from "../helpers/reauthenticate";
import {
  collection,
  deleteField,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  writeBatch,
} from "firebase/firestore";
import { db } from "../firebase/firestore";
import AuthContext from "./AuthContext";

const ProfileContext = createContext();

export function ProfileProvider({ children }) {
  const { currentUser } = useContext(AuthContext);
  const [message, setMessage] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);

  // Fetch profile picture when user changes
  useEffect(() => {
    if (!currentUser?.uid) return;

    const fetchProfilePicture = async () => {
      const userRef = doc(db, "users", currentUser.uid);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        setProfilePicture(userSnap.data().profilePicture || null);
      }
    };

    fetchProfilePicture();
  }, [currentUser]);

  async function updateProfilePicture(newImageUrl) {
    if (!currentUser) return;

    const userRef = doc(db, "users", currentUser.uid);
    await updateDoc(userRef, { profilePicture: newImageUrl });

    setProfilePicture(newImageUrl);
  }

  async function removeProfilePicture() {
    if (!currentUser) return;

    const userRef = doc(db, "users", currentUser.uid);

    await updateDoc(userRef, { profilePicture: deleteField() });
    setProfilePicture(null);
  }

  function editUsername(displayName) {
    return updateProfile(currentUser, { displayName });
  }

  async function editEmail(newEmail, password) {
    await reauthenticate(currentUser, password);
    return verifyBeforeUpdateEmail(currentUser, newEmail);
  }

  async function editPassword(currentPassword, newPassword) {
    await reauthenticate(currentUser, currentPassword);
    return updatePassword(currentUser, newPassword);
  }

  async function deleteAccount(password) {
    if (!auth.currentUser) return;

    // Re-authenticate user before deletion
    await reauthenticate(currentUser, password);

    const userId = auth.currentUser.uid;
    const userRef = doc(db, "users", userId);
    const collections = ["todos", "dailies"];

    const batch = writeBatch(db);

    for (const collectionName of collections) {
      const subCollectionRef = collection(
        db,
        `users/${userId}/${collectionName}`
      );
      const snapshot = await getDocs(subCollectionRef);

      snapshot.forEach((doc) => batch.delete(doc.ref));
    }

    batch.delete(userRef);
    await batch.commit();

    await deleteUser(auth.currentUser);
  }

  const value = {
    currentUser,
    profilePicture,
    updateProfilePicture,
    removeProfilePicture,
    editUsername,
    editEmail,
    editPassword,
    sendEmailVerification,
    deleteAccount,
    message,
    setMessage,
  };

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
}

export default ProfileContext;
