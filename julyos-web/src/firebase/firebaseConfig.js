// src/firebase/firebaseConfig.js
import { initializeApp } from "firebase/app";
// Opcional: analytics, si quieres usarlo
import { getAnalytics, isSupported as isAnalyticsSupported } from "firebase/analytics";

// 🔥 Importa los servicios que vas a usar
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD7nlWP2j8X5beb32pDDKVbxfvVfmpw-ao",
  authDomain: "julyosbasedatos.firebaseapp.com",
  projectId: "julyosbasedatos",
  storageBucket: "julyosbasedatos.firebasestorage.app",
  messagingSenderId: "57628785136",
  appId: "1:57628785136:web:57283a277ed7deca66c535",
  measurementId: "G-90PCBD4J98",
};

// Inicializa app
const app = initializeApp(firebaseConfig);

// Opcional: Analytics (solo en navegador)
let analytics = null;
if (typeof window !== "undefined") {
  isAnalyticsSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

// ✅ Inicializa servicios que usas en tus services
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

// 👉 Exporta todo lo que usas en otros archivos
export { app, db, auth, storage, analytics };
