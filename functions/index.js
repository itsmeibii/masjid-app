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
    //  databaseURL: 'https://masjid-app-b68d9.firebaseio.com'
})
const db = getFirestore();
app.listen("3000", () => console.log("app running"))
app.get('/', (req,res) => {
    res.send("hello world");
})

app.get('/users/:uid', async (req,res) => {
    const id = req.params.uid;
    
    try {
        
        
    
        
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
      console.log("returned data for user: " + id)

    
})

app.get('/maps/nearby', async (req,res) => {
    // const lat = 34.075;
    // const lng = -84.35;
    const {lat,lng} = req.query;
    const radius = 10000;
    const params = new URLSearchParams({
        location: `${lat},${lng}`,
        radius,
        type: 'mosque',
        key: "AIzaSyA76LUqRhe8V8nlAfTvPqZBq6x9iaKBYXw",
    });

    const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?${params.toString()}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        let masjids = data.results.map((result) => {
            return result.name;
        })
        res.json(masjids);
    } catch (error) {
        res.status(500).send(error.message);
    }
    console.log("returned data for nearby masjids")
})