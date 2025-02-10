import mongoose from "mongoose";

const notificatonSchema = new mongoose.Schema({

    articleid: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
        required: true
    },
})

const Notification = mongoose.model("Notification", notificatonSchema);

export default Notification;