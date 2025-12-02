// src/services/cancionesService.js
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  serverTimestamp,
  updateDoc,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

const colRef = collection(db, "canciones");

export const listenCanciones = (callback) => {
  const q = query(colRef, orderBy("createdAt", "desc"));
  return onSnapshot(q, (snapshot) => {
    const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
    callback(data);
  });
};

export const createCancion = (cancion) =>
  addDoc(colRef, {
    ...cancion,
    createdAt: serverTimestamp(),
  });

export const deleteCancion = (id) => deleteDoc(doc(db, "canciones", id));

export const updateCancion = (id, data) =>
  updateDoc(doc(db, "canciones", id), data);
