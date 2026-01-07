const socket = io();
const chess = new Chess();
const boardElement = document.querySelector(".chessboard");


let draggedPiece = null;
let sourceSquare = null;
let playerRole = null;

const renderBoard = () => {
    const board = chess.board();
    boardElement.innerHTML = "";
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
                pieceDiv.classList.add("piece", square.color === 'w' ? 'white' : 'black');
                pieceDiv.innerText = getPieceUnicode(square)
                pieceDiv.draggable = playerRole === square.color;

                pieceDiv.addEventListener("dragstart", (e) => {
                    if (pieceDiv.draggable) {
                        draggedPiece = pieceDiv;
                        sourceSquare = { row: rowIndex, col: squareIndex }
                        e.dataTransfer.setData("text/plain", "");
                    }
                })
                pieceDiv.addEventListener("dragend", (e) => {
                    draggedPiece = null;
                    sourceSquare = null;
                });
                squareDiv.appendChild(pieceDiv);
            }
            squareDiv.addEventListener("dragover", (e) => {
                e.preventDefault();
            });
            squareDiv.addEventListener("drop", (e) => {
                e.preventDefault();
                if (draggedPiece) {
                    const targetSquare = {
                        row: parseInt(squareDiv.dataset.row),
                        col: parseInt(squareDiv.dataset.col)
                    };
                    handleMove(sourceSquare, targetSquare);
                }
            });
            boardElement.appendChild(squareDiv);
        });
    });

    if (playerRole === "b") {
        boardElement.classList.add("flipped")
    }
    else {
        boardElement.classList.remove("flipped")
    }


};

const handleMove = (source, target) => {
    const move = {
        from: `${String.fromCharCode(97 + source.col)}${8 - source.row}`,
        to: `${String.fromCharCode(97 + target.col)}${8 - target.row}`,
        promotion: "q"
    };
    socket.emit("move", move)
};


const getPieceUnicode = (piece) => {
    const unicodePieces = {
        w: {
            k: "♔",
            q: "♕",
            r: "♖",
            b: "♗",
            n: "♘",
            p: "♙",
        },
        b: {
            k: "♚",
            q: "♛",
            r: "♜",
            b: "♝",
            n: "♞",
            p: "♟",
        }
    };

    return unicodePieces[piece.color][piece.type];
};

socket.on("playerRole", function (role) {
    playerRole = role;
    renderBoard();

})
socket.on("spectatorRole", function () {
    playerRole = null;
    renderBoard()
})

socket.on("boardState", function (fen) {
    chess.load(fen)
    renderBoard()
});


socket.on("move", function (move) {
    chess.move(move)
    renderBoard()
})

renderBoard();