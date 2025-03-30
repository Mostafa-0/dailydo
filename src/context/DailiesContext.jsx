import { createContext, useContext, useEffect, useState } from "react";
import { db } from "@firebaseConfig/firestore";
import AuthContext from "./AuthContext";
import { resetDailiesIfNeeded } from "@helpers/resetDailies";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";

export const DailiesContext = createContext();

export const DailiesProvider = ({ children }) => {
  const [dailies, setDailies] = useState([]);
  const [loadingDailies, setLoadingDailies] = useState(true);
  const { currentUser, loading } = useContext(AuthContext);
  const userId = currentUser?.uid;

  useEffect(() => {
    if (loading || !userId) {
      setDailies([]);
      setLoadingDailies(false);
      return;
    }

    resetDailiesIfNeeded(userId);

    const dailiesRef = query(collection(db, `users/${userId}/dailies`));

    setLoadingDailies(true);

    const unsubscribeDailies = onSnapshot(dailiesRef, (snapshot) => {
      const fetchedDailies = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDailies(fetchedDailies);
      setLoadingDailies(false);
    });

    return () => unsubscribeDailies();
  }, [loading, userId]);

  const addDaily = async (daily) => {
    if (!userId) return;

    await addDoc(collection(db, `users/${userId}/dailies`), {
      ...daily,
      createdAt: serverTimestamp(),
    });

    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);

    if (!userSnap.exists()) {
      await setDoc(userRef, { lastReset: new Date().toISOString() });
    }
  };

  const editDaily = async (id, updatedData) => {
    if (!userId) return;
    await updateDoc(doc(db, `users/${userId}/dailies`, id), updatedData);
  };

  const deleteDaily = async (id) => {
    if (!userId) return;
    await deleteDoc(doc(db, `users/${userId}/dailies`, id));
  };

  return (
    <DailiesContext.Provider
      value={{
        dailies,
        setDailies,
        loadingDailies,
        addDaily,
        editDaily,
        deleteDaily,
      }}
    >
      {children}
    </DailiesContext.Provider>
  );
};
