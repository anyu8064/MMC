// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCn96nqPFHa1ZOJ_90FYL2ac3o6Ni-PJDM",
  authDomain: "mmcinvetorysystem.firebaseapp.com",
  databaseURL: "https://mmcinvetorysystem-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "mmcinvetorysystem",
  storageBucket: "mmcinvetorysystem.firebasestorage.app",
  messagingSenderId: "476609495849",
  appId: "1:476609495849:web:2ba1e6be6bc57dda74ad38",
  measurementId: "G-0SPH3VHT4L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const dbs = getFirestore(app);
export const db = getDatabase(app);
export default app;