import express from "express";
import userModel from "../models/user-model.js";
import bcrypt from "bcrypt";    
import jwt from "jsonwebtoken";
import generateToken from "../utils/genrateToken.js";

const router = express.Router();

router.get("/", (req, res) => {
    res.send("hey users is working");
})


router.post("/register", (req, res) => {
    try {
        let { fullname, email, password } = req.body;

        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, async function (err, hash) {
                if (err) return res.send(err.message);
                else {
                    let user = await userModel.create({
                        fullname,
                        email,
                        password: hash
                    })
                    res.cookie("token", token)
                    res.send("User registered successfully");   
                }

            })
        });
    } catch (err) {
        res.send({ message: err.message });

    }
})


export default router;