const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const fs = require("fs");
const Driver = require('./models/driver');
const Package = require('./models/package');
const driverRouter = require('./routes/driver-routes');
const packageRouter = require('./routes/package-routes');
const statRouter = require('./routes/stat-routes');
const authRouter = require('./routes/auth-routes')
const { Server } = require('socket.io');




// For Translate
const Translate = require('@google-cloud/translate').v2; 
const translateClient = new Translate.Translate();

// For Text to Speech
const textToSpeech = require("@google-cloud/text-to-speech");
const client = new textToSpeech.TextToSpeechClient();

//For AI
const { GoogleGenerativeAI } = require("@google/generative-ai");
const gemini_api_key = "AIzaSyBDzi-ascpGbAy85YcKNxTD2FYSaekS5oo";

// Create an instance of GoogleGenerativeAI
const googleAI = new GoogleGenerativeAI(gemini_api_key);
  const geminiConfig = {
    temperature: 0.9,
    topP: 1,
    topK: 1,
    maxOutputTokens: 4096,
  };
  const geminiModel = googleAI.getGenerativeModel({
    model: "gemini-pro",
    geminiConfig,
  });

  async function getDistance(destination) {
    const geminiModel = googleAI.getGenerativeModel({
      model: "gemini-pro",
      config: geminiConfig,
    });
  
    try {
      const response = await geminiModel.generateContent("What is the approximate distance from "+ destination +" to Melbourne in kilometer?");
  
      // Accessing the generated text from the response
      if (response.response && response.response.candidates && response.response.candidates.length > 0) {
        const generatedText = response.response.candidates[0].content.parts[0].text; // Correctly accessing the text
        console.log(generatedText,"ahpeind")
        return generatedText
      } else {
        console.log("No generated candidates found.");
      }
    } catch (error) {
      console.error("Error generating content:", error);
    }
  }
  

// Create the Express app
const app = express();

app.use('../public/output.mp3', (req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.set('Pragma', 'no-cache');
  res.set('Expires', '0');
  res.set('Surrogate-Control', 'no-store');
  next();
});

// Serve static files

// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());

app.use(express.static('./dist/a3-gan-ruiqi-33521204/browser'));

// Connect to the database
async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/asgn3');
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
}

connect();

// Start the server and set up Socket.io
const server = app.listen(8080, () => {
    console.log('Server is running on port 8080');
});

const io = new Server(server);

io.on("connection", function(socket) {
  console.log("New connection made");

  socket.on('translateEvent', async (data) => {
      console.log("Received event:", data);

      // Extract description and target language from the event data
      const { description, targetLanguage } = data;

      try {
          // Perform translation using Google Cloud Translate
          const [translation] = await translateClient.translate(description, targetLanguage);

          // Emit the translation result back to the client
          io.emit('translateServerEvent', { original: description, targetLanguage, translation });
      } catch (error) {
          console.error("Translation error:", error);
          
          // Send error information back to the client
          io.emit('translateServerEvent', { error: 'Translation failed', details: error.message });
      }
  });
});

io.on("connection", function(socket) {
  console.log("New connection made 2");

  socket.on('t2sEvent', async (data) => {
      console.log("Received event:", data.text);

      // Extract description and target language from the event data
      const request = {
        input: { text: data.text },  // The text you want to convert to speech
        voice: { languageCode: 'en-US', ssmlGender: 'NEUTRAL' },  // Specify language and gender
        audioConfig: { audioEncoding: 'MP3' },  // Format of the audio output
      };

      try {
        // Perform the Text-to-Speech request
        const [response] = await client.synthesizeSpeech(request);

        // Write the audio content to a file

        // const outputFile = 'output.mp3';
        const outputFile = path.join(__dirname, '../public', 'output.mp3'); // Adjust path based on your directory structure
        fs.writeFile(outputFile, response.audioContent, 'binary', (err) => {
            if (err) {
                console.error('ERROR:', err);
                io.emit('t2sServerEvent', { error: 'Error writing audio file', details: err.message });
                    return;  // Exit the function if there's an error
            }
            // console.log('Audio content written to file:', outputFile);
            const outputFile1 = '/output.mp3' + `?t=${new Date().getTime()}`;

            io.emit('t2sServerEvent', { text: data.text,  file: outputFile1});
        });
    } catch (error) {
          console.error("text to speech error:", error);
          
          // Send error information back to the client
          io.emit('t2sServerEvent', { error: 'text to speech failed', details: error.message });
      }
  });
});

io.on("connection", function(socket) {
    console.log("New connection made3");

    socket.on('aiEvent', async (destination) => {
        // Extract description and target language from the event data
        const aDistance = await getDistance("sydney");
        io.emit('aiServerEvent', { distance: aDistance });
    });
  });


// Set up your API routes
app.use("/33521204/ruiqi/api/v1/drivers", driverRouter);
app.use("/33521204/ruiqi/api/v1/packages", packageRouter);
app.use("/33521204/ruiqi/api/v1/stats", statRouter);
app.use('/33521204/ruiqi/api/v1/', authRouter);
