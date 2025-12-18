//  ES module type code ///

import User from "./models/user.js"
import ejs from "ejs"
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine",'ejs')


app.get("/", (req, res) => {
    res.render("index")
})

app.get("/read",async (req, res) => {
  let allUsers =  await User.find()
    res.render("read", {User: allUsers})
})

app.get("/edit/:userid",async (req, res) => {
  let user = await User.findOne({_id: req.params.userid})
  res.render("edit",{user})
})

app.post("/update/:userid",async (req, res) => {
  let{name, email, image} = req.body;
  let user = await User.findOneAndUpdate({_id: req.params.userid},{name, email, image},{new: true})
  res.redirect("/read")
})

app.get("/delete/:id",async (req, res) => {
  let allUsers =  await User.findOneAndDelete({_id: req .params.id})
    res.redirect("/read")
})

app.post("/create", async (req, res) => {
  let {name , email , image} = req.body 
let createdUser =  await User.create({
    name,
    email,
    image
  })
  res.redirect("/read")
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
