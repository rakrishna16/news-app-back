import mongoose from "mongoose";

const likedSchema = new mongoose.Schema({

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

const Liked = mongoose.model("Liked", likedSchema);

export default Liked;