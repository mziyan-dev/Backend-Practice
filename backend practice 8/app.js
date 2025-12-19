import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
import ejs from "ejs";
import user from "./models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();


app.set('view engine','ejs')
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());




app.get('/',(req,res)=>{
    res.render('index')
}) 

app.post('/create', (req,res)=>{
   let {username,email,password,age} = req.body;


   bcrypt.genSalt(10,async function(err,salt){
    bcrypt.hash(password,salt,async function(err,hash){
           let createdUser = await user.create({
        username,
        email,
        password: hash,
        age
    })

   let token =  jwt.sign({email}, "Shhhhhhhhhhhhhhhh");
    res.cookie("token", token);
    res.send(createdUser)
   })
})
   

}) 

app.get('/login', async (req,res)=>{
 res.render('login')

})

app.post ('/login', async (req,res)=>{
let loggeduser = await user.findOne({email: req.body.email})
  if(!loggeduser){
    return res.send("User not found")
  }
  
})

app.get('/logout',(req,res)=>{
    res.cookie("token",'');
    res.redirect("/");  
})



app.listen(3000, () => {
    console.log("Server is running on port 3000");
});