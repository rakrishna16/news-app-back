import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true
},
  phone: {
    type: Number,
    required: true
  },
  categories: {
    type: [String],
    default:["all"]
  },
  frequency: {
    type: [String],
    default:["all"]
  },
  notificationchannels: {
    type: [String],
    default:["all"]
  },
  token: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
