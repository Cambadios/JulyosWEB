import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

const colRef = collection(db, "agenda");

// 🔁 Escuchar cambios en tiempo real
export const listenAgenda = (callback) => {
  const q = query(colRef, orderBy("fecha", "asc"));

  return onSnapshot(q, (snapshot) => {
    const data = snapshot.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    }));
    callback(data);
  });
};

// ➕ Agregar fecha nueva (desde admin)
export const createFechaAgenda = (fechaData) =>
  addDoc(colRef, {
    ...fechaData,
    createdAt: serverTimestamp(),
  });

// 🗑️ Eliminar fecha
export const deleteFechaAgenda = (id) =>
  deleteDoc(doc(db, "agenda", id));
