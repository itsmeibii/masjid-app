import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createContext, useState, useEffect, useContext } from 'react';
import {onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';
import { auth } from '../backend/firebaseConfig';
import {doc,getDoc,setDoc} from 'firebase/firestore';
import bcrypt from 'bcryptjs';

export const AuthContext = createContext();
export const AuthContextProvider = ({children}) => {
  const [user,setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);
  const [loading,setLoading] = useState(true);
  const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  };
    useEffect(() => {
      const unsub = onAuthStateChanged(auth, (user) => {
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
        
      } catch (error) {
        
      }
    }
    const logout = async () => {
      try {
        
      } catch (error) {
        
      }
    }
    const register = async (email,password, firstName, lastName ,age,state , city, phoneNumber ) => {
      try {
        const response = await createUserWithEmailAndPassword(auth, email, password);
        const user = response.user;
        const hashedp = await hashPassword(password);
        await setDoc(doc(db,'users',user.uid), {
          email: user.email,
          password: hashedp,
          "first-name" : firstName,
          "last-name" : lastName,
          "phone-number": phoneNumber,
          age,
          state,
          city,
        }) 
      } catch (error) {
        
      }
    }
  return (
    <AuthContext.Provider value = {{user, isAuthenticated, login, register, logout,loading}}>
      {children}
    </AuthContext.Provider>
  )
  
}

export const useAuth = () => {
  const value = useContext(AuthContext)
  if (!value) {
    throw new Error('useAuth must be wrapped an AuthContext provider');
  }
  return value;
}




