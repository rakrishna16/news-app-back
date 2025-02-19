import admin from "firebase-admin";
import serviceAccount from "./serviceAccountKey.js";
// Load Firebase Service Account Key
//const serviceAccount = require("./google-config.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const messaging = admin.messaging();
//module.exports = { messaging };
export default messaging;