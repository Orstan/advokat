// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC6332DiUL75PyJdUBuZd6W63CMxZjoG5c",
  authDomain: "proidak-518f5.firebaseapp.com",
  projectId: "proidak-518f5",
  storageBucket: "proidak-518f5.appspot.com",
  messagingSenderId: "438512164318",
  appId: "1:438512164318:web:d398db680e66ca8f2bd14f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { app, db, storage, auth };
