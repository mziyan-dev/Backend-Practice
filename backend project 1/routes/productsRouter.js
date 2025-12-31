import express from "express";
const router = express.Router();
import upload from "../config/multer-config.js";
import product from "../models/product-model.js";



router.get("/",(req,res)=>{
    res.send("hey product is working");
})

router.post ("/create",upload.single("image"),async function(req,res){
    product.create
 res.send("product created successfully");  

});

export default router;