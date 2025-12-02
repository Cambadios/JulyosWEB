// src/services/cancionesService.js
import { db } from "../firebase/firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";

const cancionesCol = collection(db, "canciones");

export const crearCancion = async (data) => {
  const docRef = await addDoc(cancionesCol, {
    ...data,
    creadoEn: new Date(),
  });
  return docRef.id;
};

export const obtenerCanciones = async () => {
  const q = query(cancionesCol, orderBy("creadoEn", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
};

export const actualizarCancion = async (id, data) => {
  const ref = doc(db, "canciones", id);
  await updateDoc(ref, data);
};

export const eliminarCancion = async (id) => {
  const ref = doc(db, "canciones", id);
  await deleteDoc(ref);
};
