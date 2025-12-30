import jwt from "jsonwebtoken";
import userModel from "../models/user-model.js";

export async function isLoggedIn(req, res, next) {
    try{
    if(!req.cookies.token){
        return res.status(401).send("Please login to access this resource").redirect("/");
    }
        let decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET_KEY);
        let user = await userModel.findOne({email  : decoded.email}).select("-password");
        req.user = user;

        next(); 
    }catch(err){
   req.flash("error", "SomeThing went wrong!");
   return res.redirect("/");
    }

}



