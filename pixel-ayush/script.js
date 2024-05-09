const boardSize = 20;
let gameBoard = document.getElementById("game-board");



// Initializing the board
for (let i = 0; i < boardSize; i++) {
    for (let j = 0; j < boardSize; j++) {
        let cell = document.createElement("div");
        cell.classList.add("cell");
        gameBoard.appendChild(cell);
    }
}
