import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // 1. Importe o Auth

const firebaseConfig = {
  apiKey: "AIzaSyCSZcccj_uiVEKqT_5qU-NESZFLG2NJ7mc",
  authDomain: "flashcodes-4e754.firebaseapp.com",
  projectId: "flashcodes-4e754",
  storageBucket: "flashcodes-4e754.firebasestorage.app",
  messagingSenderId: "1041994894561",
  appId: "1:1041994894561:web:24dec60ac4228b48023ba0"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app); // 2. Inicialize e exporte o Auth