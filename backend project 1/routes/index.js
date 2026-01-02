import express from "express";
import { isLoggedIn } from "../middleware/isLoggedIn.js";
import product from "../models/product-model.js"

const router = express.Router();



router.get("/", (req, res) => {
  let error = req.flash("error");
  res.render("index", {error, isLoggedIn : false});
});


router.get("/shop", isLoggedIn,async (req, res) => {
  let products = await product.find();
  let success = req.flash("success");
  res.render("shop", {products , success});
});

router.get("/card",async (req, res) => {
  let user = await userModel.findOne({email: req.user.email}).populate("cart");
  res.render("card", {user});
});

router.get("/addtocart/:id", isLoggedIn ,async (req, res) => {
 let user = await userModel.findOne({email : req.user.email})
   user.cart.push(req.params.id);
   await user.save();
   req.flash("success", "Product added to cart");
   res.redirect("/shop");
});



router.get("/logout", isLoggedIn ,async (req, res) => {
    res.render("shop");
});

export default router;
