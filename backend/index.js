// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDDOoMgWGcJu3M1aP0WElfl_ceJuNcZA2g",
  authDomain: "masjid-app-b68d9.firebaseapp.com",
  projectId: "masjid-app-b68d9",
  storageBucket: "masjid-app-b68d9.appspot.com",
  messagingSenderId: "970266916925",
  appId: "1:970266916925:web:5e76a4f86e87b858731254",
  measurementId: "G-WBX11PMD62"
};

// Initialize Firebase

export const FBAPP = initializeApp(firebaseConfig);
export const FBAUTH = getAuth(FBAPP);
