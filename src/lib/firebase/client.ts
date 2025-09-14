// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBw6TCeNs-kzfKd8WWYyfaeMAsVDYK2-uo",
  authDomain: "shaped-utility-430217-r8.firebaseapp.com",
  projectId: "shaped-utility-430217-r8",
  storageBucket: "shaped-utility-430217-r8.firebasestorage.app",
  messagingSenderId: "57036522763",
  appId: "1:57036522763:web:59d1d432aee1042a74ce0e",
  measurementId: "G-HCBCMJYKWQ"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export { app, analytics };
