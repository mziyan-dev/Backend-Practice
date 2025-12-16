import express from "express";
import User from "./usermodel.js"
import ejs from "ejs"
import path from "path"


const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(Path.join(__dirname,"public")))
app.set("view engine",'ejs')

app.get("/", (req, res) => {
    res.render("index")
})

app.listen(3000,()=>{
    console.log("its runing");
    
})

























// app.get("/create", async (req, res) => {
//     let createdUser = await User.create({
//         name: "hello",
//         userName: "hello",
//         email: "hello@gmail.com"
//     });
//     res.send(createdUser)
// })

// app.get("/update", async (req, res) => {
//     let updatedUser = await User.findOneAndUpdate({ userName: "ziyan" }, { name: "ziyanaziz" }, { new: true })
//     res.send(updatedUser)
// })


// app.get("/read", async (req, res) => {
//     let finduser = await User.find({ name: "hello" });
//     res.send(finduser)
// })

// app.get("/delete", async (req, res) => {
//     let deleteUser = await User.findOneAndDelete({ name: "ziyanaziz" });
//     res.send(deleteUser)
// })
