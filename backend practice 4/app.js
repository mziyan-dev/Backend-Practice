//-------- Dynamic routing ---///
// Setting up prsers for form //
// Setting up EJS for EJS page //
// Setting up public static files//




import express from "express";
import Path from "path"

// const Path = require('path')
const app = express()



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























// app.get("/profile/:username", (req, res) => {
    // req.params.username
    // res.render("index")
// })


// app.get("/profile/:username/:age", (req, res) => {
    // req.params.username
    // res.render("index")
// })
