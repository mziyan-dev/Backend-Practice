import express from "express";
import { isLoggedIn } from "../middleware/isLoggedIn";


const router = express.Router();



router.get("/", (req, res) => {
  let error = req.flash("error");
  res.render("index", {error});
});


router.get("/shop", isLoggedIn, (req, res) => {
    res.render("shop");
});

export default router;
