import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase/auth";
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

    setCurrentUser(user);
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

  function deleteAccount() {
    deleteUser(currentUser);
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
