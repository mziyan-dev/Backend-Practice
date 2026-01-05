import express from 'express';
import { Server } from "socket.io";
import http from 'http';
import { Chess } from 'chess.js';
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const server = http.createServer(app);

const io = new Server(server);
const chess = new Chess();
let players = {};
let currentplayer = 'w';


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", 'ejs')


app.get('/', (req, res) => {
    res.render('index', { title: "Online Chess Game" });
});


io.on("connection",(uniquesocket)=>{
    console.log('connected');
})

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});