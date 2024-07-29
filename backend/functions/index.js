
const express = require('express');
const {scrapeandstore,db} = require('./prayertimes');
const {onSchedule} = require("firebase-functions/v2/scheduler");
const {onRequest} = require("firebase-functions/v2/https");




const app = express();

app.use(express.json());

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

exports.scheduledScrapePrayerTimesRCM = onSchedule('15 0 * * *', async (event) => {
    await scrapeandstore('RCM');
});

exports.scheduledScrapePrayerTimesICNF = onSchedule('15 0 * * *', async (event) => {
    await scrapeandstore('ICNF');
});
exports.scheduledScrapePrayerTimesHIC = onSchedule('15 0 * * *', async (event) => {
    await scrapeandstore('HIC');
});
exports.scheduledScrapePrayerTimesGIC = onSchedule('15 0 * * *', async (event) => {
    await scrapeandstore('GIC');
});

app.get('/prayertimes/:mosque', async (req, res) => {
    const mosqueKey = req.params.mosque;
    try {
        const doc = await db.collection('prayerTimes').doc(mosqueKey).get();
        if (!doc.exists) {
            return res.status(404).send(`No prayer times found for ${mosqueKey}`);
        }
        const prayerTimes = doc.data();
        res.status(200).json(prayerTimes);
    } catch (e) {
        console.error(`Error fetching prayer times for ${mosqueKey}:`, e);
        res.sendStatus(500);
    }
});

exports.api = onRequest(app)

