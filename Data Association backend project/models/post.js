import mongoose from "mongoose";


mongoose.connect("mongodb://127.0.0.1:27017/miniproject")


const postSchema = mongoose.Schema({
   user :{ 
    type: mongoose.Schema.Types.ObjectId, ref: "user"
 },
 date: {
    type: Date,
    default: Date.now,
 },
 content: String,
 likes: [
    {type: mongoose.Schema.Types.ObjectId, ref: "user"}
 ]

});




const post = mongoose.model("post", postSchema);

export default post;