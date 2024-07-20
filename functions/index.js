const functions = require('firebase-functions');
const express = require('express');
const app = express();

app.listen("3000", () => console.log("App listening on port 3000"))

app.get('/users/:uid', (req,res) => {
    const id = req.params.uid;
    
})