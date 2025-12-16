import mongoose from "mongoose";

mongoose.connect(`mongodb://127.0.0.1:27017/mongopractice`);
const userSchema = mongoose.Schema({
    name: String,
    userName: String,
    email: String
})
const User = mongoose.model("User", userSchema);

export default User;