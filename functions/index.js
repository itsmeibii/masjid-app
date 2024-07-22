const functions = require('firebase-functions');
const express = require('express');
// const {auth, db} = require("../backend/firebaseConfig.js");
// import {auth,db} from '../backend/firebaseConfig.js'
const {initializeApp, applicationDefault} = require("firebase-admin/app")
const {getFirestore} = require("firebase-admin/firestore")

// import functions from 'firebase-functions';
// import express from 'express';
// import pkg from '../backend/firebaseConfig.js';
// const { auth, db } = pkg;
// import {initializeApp, applicationDefault} from "firebase-admin/app"
const app = express();
const fb = initializeApp({
    credential: applicationDefault(),
     databaseURL: 'https://masjid-app-b68d9.firebaseio.com'
})
app.listen("3000", () => console.log("app running"))
app.get('/', (req,res) => {
    res.send("hello world");
})

app.get('/users/:uid', async (req,res) => {
    const id = req.params.uid;
    
    try {
        
        const db = getFirestore();
    
        // Example: Get a specific document from 'users' collection
        const userDoc = await db.collection('users').doc(id).get();
    
        if (!userDoc.exists) {
          res.status(404).json({ error: 'User not found' });
          return;
        }
    
       
        const userData = userDoc.data();
        res.json(userData);
      } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Internal server error' });
      }

    
})