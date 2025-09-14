// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDWmwh-BrwFlONo4j1qT1tFJAE-7T8r3ko",
  authDomain: "jobtrack-x2rna.firebaseapp.com",
  projectId: "jobtrack-x2rna",
  storageBucket: "jobtrack-x2rna.firebasestorage.app",
  messagingSenderId: "397558567090",
  appId: "1:397558567090:web:b284b4204f740a7d59f9ab"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export { app };
