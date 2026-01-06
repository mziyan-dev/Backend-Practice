const socket = io();
const chess = new Chess();
const chessboard = document.querySelector(".chessboard");


let draggedPiece = null;
let sourceSquare = null;
let playerRole = null;

const renderBoard = () => {
    const board = chess.board();
    chessboard.innerHTML = "";
    board.forEach((row, rowIndex) => {
        row.forEach((square, squareIndex) => {
            const squareDiv = document.createElement("div");
            squareDiv.classList.add("square",
                (rowIndex + squareIndex) % 2 === 0 ? "bg-white" : "bg-gray-700"
            );
            squareDiv.dataset.row = rowIndex;
            squareDiv.dataset.col = squareIndex;

            if (square) {
                const pieceDiv = document.createElement("div");
                pieceDiv.classList.add("piece",square.color === 'w' ? 'text-white' : 'text-black');
                pieceDiv.innerText = "";
                pieceDiv.draggable = true;
            }
        })
    });
};


const handleMove = () => { };


const getPieceUnicode = () => { };


renderBoard();