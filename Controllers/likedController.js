import Liked from "../Models/liked.js";
import User from "../Models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

export const userLiked = async (req, res) => {
    try {
      const {articleid} = req.body;
      console.log(articleid)
      console.log(req.user._id)
      const likedPost = new Liked({ articleid, user: req.user._id});
      
      await likedPost.save();
      res
        .status(200)
        .json({ message: "Liked post added Successfully", data: likedPost });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  export const getLiked = async (req, res) => {
    try {
      const user = req.user._id;
        const liked = await Liked.find({user})
        res.status(200).json({ message: "Liked fetched successfully", data: liked });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const removeLiked = async (req, res) => {
    try {
      const articleid = req.params.id;
      const result = await liked.findByIdAndDelete({ _id: articleid });
      if (!result) {
        return res.status(404).json({ message: "Liked Not Found" });
      }
      const liked = await liked.find();
      res.status(200).json({ message: "Liked removed", data: liked });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };