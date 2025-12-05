//-------- Dynamic routing ---///
// Setting up prsers for form //
// Setting up EJS for EJS page //
// Setting up public static files//


import express from 'express'
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set("view engine",'ejs')

app.get("/", (req, res) => {
    res.render("index")
})

app.listen(3000,()=>{
    console.log("its runing");
    
})





