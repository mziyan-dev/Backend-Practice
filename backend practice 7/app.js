import cookieParser from "cookie-parser";
import express from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const app = express();


app.use(cookieParser())



app.get('/',(req,res)=>{
    let token = jwt.sign({email: "ziyan@gmail.com"},"secret");
    res.cookie("token",token);
    console.log(token); 
    res.send("Done")   
    
})

app.get('/read',(req,res)=>{

let data = jwt.verify(req.cookies.token,"secret")    
console.log(data);
 

})



//   bcrypt.compare("Ziyan123","$2b$10$wNAeNunBh4ZEbBo1yjERTOA7WK1YEnDu88zX.9smrG.ouINUzHklS", function(err, result) {
//     console.log(result);
    
// });
//   res.cookie("name","ziyan");


//     bcrypt.genSalt(10, function(err, salt) {
//     bcrypt.hash("Ziyan123", salt, function(err, hash) {
//         console.log(hash);
        
//     });
// });
app.listen(3000)