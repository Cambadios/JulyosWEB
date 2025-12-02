// src/services/storageService.js
import { storage } from "../firebase/firebaseConfig";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

// 📤 Sube una imagen a Storage y devuelve { url, path }
export const uploadImage = async (file, folder = "galeria") => {
  if (!file) throw new Error("No se recibió archivo");

  const safeName = file.name.replace(/\s+/g, "_").toLowerCase();
  const filePath = `${folder}/${Date.now()}-${safeName}`;

  const storageRef = ref(storage, filePath);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);

  return { url, path: filePath };
};

// 🗑️ Elimina imagen de Storage por ruta
export const deleteImage = async (path) => {
  if (!path) return;
  const storageRef = ref(storage, path);
  await deleteObject(storageRef);
};
