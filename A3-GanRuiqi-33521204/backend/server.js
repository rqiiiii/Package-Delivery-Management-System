const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fs =require("fs");
const Driver = require('./models/driver');
const Package = require('./models/package');
const driverRouter = require('./routes/driver-routes');
const packageRouter = require('./routes/package-routes');
const statRouter = require('./routes/stat-routes');

// Import the translation client
const Translate = require('@google-cloud/translate').v2; 

// Created client
const translateClient = new Translate.Translate();

//Text to translate
const text = "Hello"

// Connect to the database
async function connect() {
    await mongoose.connect('mongodb://localhost:27017/asgn3');
}

// Create the Express app
const app = express();

// Serve static files
app.use(express.static('./dist/a3-gan-ruiqi-33521204/browser'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());




// Connect to MongoDB and start the server
connect();
app.listen(8080);

// Route for translating text
app.post('/33521204/ruiqi/api/v1/translate', async (req, res) => {
    console.log(req.body,"usb9dofn")
    const { description, targetLanguage } = req.body;  // Get the text and target language from the request body
    try {
        const [translation] = await translateClient.translate(description, targetLanguage);
        res.json({ original: description,targetLanguage, translation });
    } catch (error) {
        res.status(500).json({ error: 'Translation failed', details: error });
    }
});

// Set up your API routes
app.use("/33521204/ruiqi/api/v1/drivers", driverRouter);
app.use("/33521204/ruiqi/api/v1/packages", packageRouter);
app.use("/33521204/ruiqi/api/v1/stats", statRouter);
