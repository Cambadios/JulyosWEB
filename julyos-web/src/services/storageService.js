// src/services/storageService.js
import { storage } from "../firebase/firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

// carpeta puede ser "imagenes", "videos", etc.
// type puede ser "imagenes", "videos", "portadas", etc.
export const uploadFile = async (file, type = "uploads") => {
  const filePath = `${type}/${Date.now()}-${file.name}`;
  const fileRef = ref(storage, filePath);

  await uploadBytes(fileRef, file);
  const url = await getDownloadURL(fileRef);

  return { url, path: filePath };
};
