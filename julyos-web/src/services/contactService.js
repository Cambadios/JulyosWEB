// src/services/contactService.js
import { db } from "../firebase/firebaseConfig";
import {
  doc,
  onSnapshot,
  setDoc,
  getDoc,
} from "firebase/firestore";

// Usaremos un solo documento fijo: config/contacto
const contactoRef = doc(db, "config", "contacto");

// Escucha en tiempo real los datos de contacto
export const listenContacto = (callback) => {
  return onSnapshot(contactoRef, (snap) => {
    if (snap.exists()) {
      callback(snap.data());
    } else {
      callback(null);
    }
  });
};

// Obtiene una vez los datos de contacto (por si lo necesitas)
export const getContacto = async () => {
  const snap = await getDoc(contactoRef);
  if (snap.exists()) return snap.data();
  return null;
};

// Guarda / actualiza los datos de contacto
export const saveContacto = (data) => {
  return setDoc(contactoRef, data, { merge: true });
};
