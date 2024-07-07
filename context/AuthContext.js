import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createContext, useState, useEffect, useContext } from 'react';

export const AuthContext = createContext();
export const AuthContextProvider = ({children}) => {
  const [user,setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(undefined);
  const [loading,setLoading] = useState(true);
    useEffect(() => {
      //onauthstatechanged
      
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
    const register = async (email,password, username, profileUrl) => {
      try {
        
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




