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


io.on("connection", (uniquesocket) => {
    console.log('connected');

    if (!players.white) {
        players.white = uniquesocket.id;
        uniquesocket.emit("playerRole", "w");

    } else if (!players.black) {
        players.black = uniquesocket.id;
        uniquesocket.emit("playerRole", "b");

    } else {
        uniquesocket.emit("spectatorRole");
    }
    uniquesocket.on("disconnect", function () {
        if (uniquesocket.id === players.white) {
            delete players.white;
        } else if (uniquesocket.id === players.black) {
            delete players.black;
        }
    })
    uniquesocket.on("move", function (move) {
        try {
            if (chess.turn === "w" && uniquesocket.id !== players.white) return;
            if (chess.turn === "b" && uniquesocket.id !== players.black) return;
            const result = chess.move(move);
            if (result) {
                currentplayer = chess.turn();
                io.emit("move", move);
                io.emit("boardState", chess.fen());

            } else {
                console.log("invalid move : ", move);
                uniquesocket.emit("invalid move : ", move);
            }
        } catch (err) { 
            console.log(err);
            uniquesocket.emit("invalid move : ", move);
        }
    })
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});