import express from 'express';
import userModel from './models/user.js';
import postModel from './models/post.js';
import cookieParser from 'cookie-parser';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';



const app = express();
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());





app.get('/', (req, res) => {
    res.render('index');
});

app.get('/login', (req, res) => {
    res.render('login');
});


app.get('/profile', isLoggedIn, (req, res) => {
    console.log(req.user);
    res.render('login');
});


app.post('/register', async (req, res) => {
    let { username, name, email, password, age, } = req.body;
    let user = await userModel.findOne({ email: req.body.email });
    if (user) {
        return res.status(500).send('User already exists');
    }
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            let user = await userModel.create({
                username,
                name,
                email,
                password: hash,
                age,
            })
            let token = jwt.sign({ email: user.email, id: user._id }, 'secretkey');
            res.cookie('token', token);
            res.send('User registered successfully');

        })
    })
});


app.post('/login', async (req, res) => {
    let { email, password } = req.body;
    let user = await userModel.findOne({ email });
    if (!user) {
        return res.status(404).send('User not found');
    }
    bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
            let token = jwt.sign({ email: user.email, id: user._id }, 'secretkey');
            res.cookie('token', token);
            res.status(200).send('Login successful');
        } else {
               return res.redirect('/login');
        }


    })
});

app.get('/logout', (req, res) => {
    res.cookie('token', '');
    res.redirect('/login');
});

function isLoggedIn(req, res, next) {
    if (req.cookies.token === "") {
        res.send("you must be logged in")
    } else {
        let data = jwt.verify(req.cookies.token, 'secretkey');
        req.user = data;
    }
    next();
}





















app.listen(3000)