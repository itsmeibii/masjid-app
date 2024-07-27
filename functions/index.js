const functions = require('firebase-functions');
const express = require('express');

const {initializeApp, applicationDefault} = require("firebase-admin/app")
const {getFirestore} = require("firebase-admin/firestore")
const prayerRouter = require('./routes/prayertimes');


const app = express();
// const fb = initializeApp({
//     credential: applicationDefault(),
//     //  databaseURL: 'https://masjid-app-b68d9.firebaseio.com'
// })
// const db = getFirestore();
app.use(express.json());
app.use('/prayer', prayerRouter);
app.listen("3000", () => console.log("app running"))
app.get('/', (req,res) => {
    res.send("hello world");
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

