import express from "express";
import ownerModel from "../models/owners-model.js";

const router = express.Router();

router.get("/",(req,res)=>{
    res.send("hey owners is working");
})

if(process.env.NODE_ENV === "development"){
  router.post("/create",async function(req,res){
let owners = await ownerModel.find();
if(owners.length > 0){
    res.send(500).send("you don't have permission to create owner");
}
let{fullname,email,password} = req.body;
 let createdOwner = await ownerModel.create({
  fullname,
    email,
    password,
 })
  res.status(201).send(createdOwner);
  })  
}
router.get("/admin",async function(req,res){
 let sucsess = req.flash("success");
  res.render("createProduct", {sucsess});
});

export default router;