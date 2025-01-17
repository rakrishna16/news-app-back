import User from "../Models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import admin from "firebase-admin";
import cron from "node-cron";

dotenv.config();

export const registerUser = async (req, res) => {
    try {
      const { name, email, password, phone, categories, frequency, notificationchannels} = req.body;
      const hashPassword = await bcrypt.hash(password, 10);
      const user = await User.findOne({ email });
    if (user) {
      return res.status(404).json({ message: "User Already Registerd" });
    }
      console.log(hashPassword);
      const newUser = new User({ name, email, phone, categories, frequency, notificationchannels, password: hashPassword });
      await newUser.save();
      res
        .status(200)
        .json({ message: "User Registered Successfully", data: newUser });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  //login user || signin
  export const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User Not Found" });
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(400).json({ message: "Invalid Password" });
      }
  
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      user.token = token;
      await user.save();
      res
        .status(200)
        .json({ message: "User Logged In Successfully", token: token });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  // forgot password
  export const forgotPassword = async (req, res) => {
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User Not Found" });
      }
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      const transporter = nodemailer.createTransport({
        //Gmail or yahoo or outlook
        service: "Gmail",
        auth: {
          user: process.env.PASS_MAIL,
          pass: process.env.PASS_KEY,
        },
      });
      const mailOptions = {
        from: process.env.PASS_MAIL,
        to: user.email,
        subject: "Password Reset Link",
        text: `You are receiving this because you have requested the reset of the password for your account 
        Please click the following link or paste it into your browser to complete the process
        http://localhost:5173/reset-password/${user._id}/${token}`,
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
          res
            .status(500)
            .json({ message: "Internal server error in sending the mail" });
        } else {
          res.status(200).json({ message: "Email Sent Successfully" });
        }
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  
  export const resetPassword = async (req, res) => {
   try {
    const { id, token } = req.params;
    const {password} = req.body;
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Invalid or expired token" });
      }
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: "User Not Found" });
      }
      const hashPassword = await bcrypt.hash(password, 10);
      user.password = hashPassword;
      await user.save();
      res.status(200).json({ message: "Password Reset Successfully" });
    })
    
   } catch (error) {
    res.status(500).json({ message: error.message });
   }
  };

  // export const updateUser = async (req, res) => {
  //   try {
  //     //const { name, email, phone} = req.body;
  //     const { id, token } = req.params;
  //    const { name, categories, frequency, notificationchannels } = req.body;
  //    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
  //      if (err) {
  //        return res.status(401).json({ message: "Invalid or expired token" });
  //      }
  //      const user = await User.findById(id);
  //      if (!user) {
  //        return res.status(404).json({ message: "User Not Found" });
  //      }
  //      //const hashPassword = await bcrypt.hash(password, 10);
  //      const name = await name;
  //      user.password = hashPassword;
  //      await user.save();
  //      res.status(200).json({ message: "Password Reset Successfully" });
  //    })
     
  //   } catch (error) {
  //    res.status(500).json({ message: error.message });
  //   }
  //  };

  export const mailNotification = async (req, res) =>{
    try {
      const { email } = req.body;
      const user = await User.findOne({ email });
      setInterval(() => {
      
      if (!user) {
        return res.status(404).json({ message: "User Not Found" });
      }
      // const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      //   expiresIn: "1h",
      // });
      const transporter = nodemailer.createTransport({
        //Gmail or yahoo or outlook
        service: "Gmail",
        auth: {
          user: process.env.PASS_MAIL,
          pass: process.env.PASS_KEY,
        },
      });
      const mailOptions = {
        from: process.env.PASS_MAIL,
        to: user.email,
        subject: "Auto news Link",
        text: `You are receiving this because you have ${user._id}`,
      };
 
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
          res
            .status(500)
            .json({ message: "Internal server error in sending the mail" });
        } else {
          res.status(200).json({ message: "Email Sent Successfully" });
        }      
      });
    }, 5 * 60 * 1000);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  
  }

export const setpushNotifcation = async (req, res)=>{
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }

    const message = { notification: { 
      title: 'Hello!', 
      body: 'This is your notification sent every 10 minutes.', }, 
      token: "110463575861734872094", // Replace with your device token 
      }; 
      
      admin.messaging().send(message) 
      .then(response => { console.log('Successfully sent message:', response); }) 
      .catch(error => { console.error('Error sending message:', error); });
    

  //   const payload = {
  //     notification: {
  //       title: message.title,
  //       body: message.body,
  //     },
  //     token: user.fcmToken,
  //   };

  //   const response = await admin.messaging().send(payload);
  //   console.log('Successfully sent message:', response);
  } catch (error) {
    console.error('Error sending message:', error);
  }
};
     
   