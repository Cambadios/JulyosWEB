// src/services/agendaService.js
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

const agendaCol = collection(db, "agendas");

export const crearFecha = async (data) => {
  // data = { fecha, lugar, ciudad, descripcion, estado }
  const docRef = await addDoc(agendaCol, {
    ...data,
    creadoEn: new Date(),
  });
  return docRef.id;
};

export const obtenerFechas = async () => {
  const q = query(agendaCol, orderBy("fecha", "asc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
};

export const actualizarFecha = async (id, data) => {
  const ref = doc(db, "agendas", id);
  await updateDoc(ref, data);
};

export const eliminarFecha = async (id) => {
  const ref = doc(db, "agendas", id);
  await deleteDoc(ref);
};
