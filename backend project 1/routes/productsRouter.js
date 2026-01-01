import express from "express";
const router = express.Router();
import upload from "../config/multer-config.js";
import product from "../models/product-model.js";



router.get("/",(req,res)=>{
    res.send("hey product is working");
})

router.post ("/create",upload.single("image"),async function(req,res){
   try{
     let {name, price, discount, bgcolor, textcolor, panelcolor} = req.body;
let userProduct = await product.create({
    image : req.file.buffer,
    name,
    price,
    discount,
    bgcolor,
    textcolor, 
    panelcolor
})

 req.flash("success","Product created successfully");  
 res.redirect("/owners/admin")
   }catch(err){
    res.send(err.message);
   }
 

});

export default router;