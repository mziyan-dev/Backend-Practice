import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/ecommerce");


const userSchema = mongoose.Schema({
    fullname: {
        type : String,
        minlenght : 3,
        trim: true,
    },
    email: String,
    password: String,
    cart:{
        type: Array,
        default: []
    },
    isadmin: Boolean,
    orders : {
        type: Array,
        default: []
    },
    contect: Number,
    picture : String
});

const User = mongoose.model("user", userSchema);
export default User;