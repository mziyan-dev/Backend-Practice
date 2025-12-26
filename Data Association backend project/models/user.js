import mongoose from "mongoose";


mongoose.connect("mongodb://127.0.0.1:27017/miniproject")


const userSchema = mongoose.Schema({
    username: String,
    name: String,
    age: Number,
    email: String,
    password: String,
    Profilepic: {
        type: String,
        default: "default.jfif"
    },
    posts : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "post",
    }]
})




const user = mongoose.model("user", userSchema);

export default user;