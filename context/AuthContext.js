import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createContext, useState, useEffect, useContext } from 'react';
import {onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from 'firebase/auth';
import { auth, db } from '../backend/functions/firebaseConfig';
import {doc,getDoc,setDoc} from 'firebase/firestore';


export const AuthContext = createContext();
export const AuthContextProvider = ({children}) => {
  const [user,setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading,setLoading] = useState(true);
  
    useEffect(() => {
      const unsub = onAuthStateChanged(auth, async (user) => {
        if (user) {
          setIsAuthenticated(true);
          setUser(user);
          
          
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
        return unsub;
      });
      
    },[])
    
    const login = async (email,password) => {
      try {
        const response = await signInWithEmailAndPassword(auth,email,password);
        return {success: true, user: response.user}
      } catch (error) {
        let msg;
        if (error.code == 'auth/email-already-exists') {
          msg = "Email already in use. Try loggin in";
        } else if (error.code == "auth/internal-error") {
          msg = "Internal Error"
        } else if (error.code.includes("auth/invalid")) {
          msg = "Invalid Credentials";
        } else {
          msg = "Error. Code: " + error.code;
        }
        return {success: false, data: null, error: error.code, msg};
      }
    }
    const logout = async () => {
      try {
         await signOut(auth);
         return {success: true}

      } catch (error) {
        return {success:false, error}
      }
    }
    const register = async (email,password, firstName, lastName ,age,state , city, phoneNumber ) => {
      try {
        const response = await createUserWithEmailAndPassword(auth, email, password);
        const user = response?.user;
        
        await setDoc(doc(db,'users',user?.uid), {
          email: user.email,
          "first-name" : firstName,
          "last-name" : lastName,
          "phone-number": phoneNumber,
          age,
          state,
          city,
        }) 
        return {success: true, data: user};
      } catch (error) {
        let msg;
        if (error.code == 'auth/email-already-exists') {
          msg = "Email already in use. Try loggin in";
        } else if (error.code == "auth/internal-error") {
          msg = "Internal Error"
        } else if (error.code.includes("auth/invalid")) {
          msg = "Invalid Credentials";
        } else {
          msg = "Error. Code: " + error.code;
        }
        return {success: false, data: null, error: error.code, msg};
      }
    }
  return (
    <AuthContext.Provider value = {{user, isAuthenticated, login, register, logout,loading}}>
      {children}
    </AuthContext.Provider>
  )
  
}






