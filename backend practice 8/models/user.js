import mongoose from "mongoose";
mongoose.connect(`mongodb://127.0.0.1:27017/ziyanDB`);

const userSchema= mongoose.Schema({
    username:String,
    email:String,
    password:String,
    age:Number
})







const user = mongoose.model("user", userSchema);

export default user;