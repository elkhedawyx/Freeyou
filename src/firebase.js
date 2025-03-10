// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBQ3jLe6JnDl_Mfx9SJtfiXmdbsJgNzV_E",
  authDomain: "c-f-a43f0.firebaseapp.com",
  projectId: "c-f-a43f0",
  storageBucket: "c-f-a43f0.firebasestorage.app",
  messagingSenderId: "204473092972",
  appId: "1:204473092972:web:7ef992721f756288654149",
  measurementId: "G-NYR5R69GR4"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };