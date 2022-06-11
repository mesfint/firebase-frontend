// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA-jqeEOC8CqkrABOHxa1fyiICTRa8am_I",
  authDomain: "fir-frontend-6c7a8.firebaseapp.com",
  projectId: "fir-frontend-6c7a8",
  storageBucket: "fir-frontend-6c7a8.appspot.com",
  messagingSenderId: "4256055537",
  appId: "1:4256055537:web:9c15d6ff44fcce3a7d6950",
  measurementId: "G-20DN2GQRHH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);

export default app;
