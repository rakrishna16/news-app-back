import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dbConfig from "./Database/dbConfig.js";
import authRoute from "./Routes/authRoute.js";
import admin from "firebase-admin";
//import serviceAccount from "./google-config.json";

dotenv.config();

const app=express();

app.use(express.json());
app.use(cors());

dbConfig();

app.get("/",(req,res)=>{
res.send("Welcome To NewsApp Backend :)");
})

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: 'https://news-app-4e53c.firebaseio.com'
// });

app.use("/api/auth", authRoute);

//app.initializeApp(firebaseConfig);

const port = process.env.PORT || 5000;

// const mailTask = () => {cron.schedule('*/2 * * * * *', () => { 
//     console.log('Sending email notification...'); 
//     mailNotification(); 
//     //console.log('Email notification service started.');
//   });
// }

app.listen(port, ()=>{
    console.log(`Server running successfully on port ${port}`);
})