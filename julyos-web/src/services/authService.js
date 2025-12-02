// src/services/authService.js
import { auth } from "../firebase/firebaseConfig";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

export const loginAdmin = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const logoutAdmin = () => signOut(auth);

// Para escuchar si hay usuario logueado
export const subscribeToAuth = (callback) => {
  return onAuthStateChanged(auth, callback); // devuelve función para desuscribirse
};
