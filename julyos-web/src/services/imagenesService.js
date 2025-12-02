// src/services/imagenesService.js
import { db } from "../firebase/firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  orderBy,
  query,
} from "firebase/firestore";

const galeriaCol = collection(db, "galeria");

export const agregarImagen = async (data) => {
  const docRef = await addDoc(galeriaCol, {
    ...data,
    creadoEn: new Date(),
  });
  return docRef.id;
};

export const obtenerGaleria = async () => {
  const q = query(galeriaCol, orderBy("creadoEn", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
};

export const eliminarImagen = async (id) => {
  const ref = doc(db, "galeria", id);
  await deleteDoc(ref);
};
