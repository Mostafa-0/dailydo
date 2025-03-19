import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebase/firestore";
import {
  collection,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import AuthContext from "./AuthContext";

export const TodosContext = createContext();

export const TodosProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const { currentUser, loading } = useContext(AuthContext);
  const userId = currentUser?.uid;

  useEffect(() => {
    if (loading || !userId) {
      setTodos([]);
      return;
    }

    const todosRef = collection(db, `users/${userId}/todos`);

    const unsubscribeTodos = onSnapshot(todosRef, (snapshot) => {
      const fetchedTodos = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTodos(fetchedTodos);
    });

    return () => unsubscribeTodos();
  }, [loading, userId]);

  const addTodo = async (todo) => {
    if (!userId) return;
    await addDoc(collection(db, `users/${userId}/todos`), todo);
  };

  const editTodo = async (id, updatedData) => {
    if (!userId) return;
    await updateDoc(doc(db, `users/${userId}/todos`, id), updatedData);
  };

  const deleteTodo = async (id) => {
    if (!userId) return;
    await deleteDoc(doc(db, `users/${userId}/todos`, id));
  };

  return (
    <TodosContext.Provider
      value={{
        todos,
        setTodos,
        addTodo,
        editTodo,
        deleteTodo,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};
