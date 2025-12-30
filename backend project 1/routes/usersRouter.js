import express from "express";
import { loginUser, registerUser , logoutUser } from "../controller/authController.js";

const router = express.Router();

router.get("/", (req, res) => {
    res.send("hey users is working");
})


router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);


export default router;