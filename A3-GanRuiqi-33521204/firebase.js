// firebase.js
const admin = require("firebase-admin");

//Get a reference to the private key
const serviceAccount = require("./service-account.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
const db = admin.firestore()

module.exports = db;