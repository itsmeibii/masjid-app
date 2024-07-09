// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getReactNativePersistence, initializeAuth} from 'firebase/auth'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {getFirestore, collection} from 'firebase/firestore';

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
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),

})
export const db = getFirestore(app);

export const usersRef = collection(db,'users')


