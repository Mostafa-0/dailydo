import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebase/firestore";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import AuthContext from "./AuthContext";

export const DailiesContext = createContext();

export const DailiesProvider = ({ children }) => {
  const [dailies, setDailies] = useState([]);
  const { currentUser, loading } = useContext(AuthContext);
  const userId = currentUser?.uid;

  useEffect(() => {
    if (loading || !userId) {
      setDailies([]);
      return;
    }

    const dailiesRef = collection(db, `users/${userId}/dailies`);

    const unsubscribeDailies = onSnapshot(dailiesRef, (snapshot) => {
      const fetchedDailies = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDailies(fetchedDailies);
    });

    return () => unsubscribeDailies();
  }, [loading, userId]);

  const addDaily = async (daily) => {
    if (!userId) return;
    await addDoc(collection(db, `users/${userId}/dailies`), daily);
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
        addDaily,
        editDaily,
        deleteDaily,
      }}
    >
      {children}
    </DailiesContext.Provider>
  );
};
