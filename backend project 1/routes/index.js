import express from "express";
import { isLoggedIn } from "../middleware/isLoggedIn.js";
import product from "../models/product-model.js"

const router = express.Router();



router.get("/", (req, res) => {
  let error = req.flash("error");
  res.render("index", {error});
});


router.get("/shop", isLoggedIn,async (req, res) => {
    let products = await product.find();
    res.render("shop", {products});
});

export default router;
