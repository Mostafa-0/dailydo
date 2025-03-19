import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/auth";
import { db } from "../firebase/firestore";
import {
  EmailAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  reauthenticateWithCredential,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updatePassword,
  updateProfile,
  sendEmailVerification,
  deleteUser,
  verifyBeforeUpdateEmail,
} from "firebase/auth";
import { doc, collection, getDocs, writeBatch } from "firebase/firestore";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);

  async function signup(displayName, email, password) {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    await updateProfile(user, { displayName });
    await sendEmailVerification(user);
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth);
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  function editUsername(displayName) {
    return updateProfile(currentUser, { displayName });
  }

  async function reauthenticate(password) {
    const credential = EmailAuthProvider.credential(
      currentUser.email,
      password
    );
    return reauthenticateWithCredential(currentUser, credential);
  }

  async function editEmail(newEmail, password) {
    await reauthenticate(password);
    return verifyBeforeUpdateEmail(currentUser, newEmail);
  }

  async function editPassword(currentPassword, newPassword) {
    await reauthenticate(currentPassword);
    return updatePassword(currentUser, newPassword);
  }

  async function deleteAccount(password) {
    if (!auth.currentUser) return;

    // Re-authenticate user before deletion
    await reauthenticate(password);

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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    loading,
    signup,
    login,
    logout,
    resetPassword,
    editUsername,
    editEmail,
    editPassword,
    reauthenticate,
    sendEmailVerification,
    deleteAccount,
    message,
    setMessage,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export default AuthContext;
