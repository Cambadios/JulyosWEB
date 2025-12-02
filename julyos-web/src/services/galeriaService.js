// src/services/galeriaService.js
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

const colRef = collection(db, "galeria");

// 🔁 Escuchar galería en tiempo real
export const listenGaleria = (callback) => {
  const q = query(colRef, orderBy("createdAt", "desc"));

  return onSnapshot(q, (snapshot) => {
    const data = snapshot.docs.map((d) => ({
      id: d.id,
      ...d.data(),
    }));
    callback(data);
  });
};

// ➕ Crear item de galería
export const createItemGaleria = (item) =>
  addDoc(colRef, {
    ...item,
    createdAt: serverTimestamp(),
  });

// 🗑️ Eliminar item
export const deleteItemGaleria = (id) =>
  deleteDoc(doc(db, "galeria", id));
