import userModel from "../models/user-model.js";
import bcrypt from "bcrypt";    
import jwt from "jsonwebtoken";
import generateToken from "../utils/genrateToken.js";



export async function registerUser(req, res) {
    try {
        let { fullname, email, password } = req.body;
    let user = await userModel.findOne({ email: email });
    if (user) return res.status(401).send("You already have Account Please Login.");

        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, async function (err, hash) {
                if (err) return res.send(err.message);
                else {
                    let user = await userModel.create({
                        fullname,
                        email,
                        password: hash
                    })
                    let token = generateToken(user);
                    res.cookie("token", token)
                    res.send("User registered successfully");   
                }

            })
        });
    } catch (err) {
        res.send({ message: err.message });

    }
}

export  async function loginUser(req, res) {
    try {
        let { email, password } = req.body;
        let user = await userModel.findOne({ email: email });
        if (!user) return res.status(401).send("You don't have an account Please Register.");

        bcrypt.compare(password, user.password, function (err, result) {
            if (err) return res.send(err.message);
            if (result) {
                let token = generateToken(user);
                res.cookie("token", token)
                res.send("Login successful");
            } else {
                res.send("Incorrect password");
            }
        });
    } catch (err) {
        res.send({ message: err.message });
    }
}


export function logoutUser(req, res) {
    res.Cookie("token","");
    res.send("Logged out successfully");
}