const boardSize = 20;
const cellSize = 20;
let interval = 200;
let snake = [{ x: 10, y: 10 }];
let dx = 0; // snake will move 1 unit in one game loop
let dy = 0;
let food = { x: 15, y: 15 };


// Drawing the board
window.onload = function () {
    let gameBoard = document.getElementById("game-board");

    for (let i = 0; i < boardSize; i++) { // ith row
        for (let j = 0; j < boardSize; j++) { // jth column
            let cell = document.createElement("div");
            cell.classList.add("cell");
            cell.setAttribute("data-x", j); // coordinates of celll
            cell.setAttribute("data-y", i); // (j, i)
            gameBoard.appendChild(cell);
        }
    }

    document.addEventListener("keydown", (event) => {
        const keyPressed = event.key;
        switch (keyPressed) {
            case "ArrowUp":
                if (dy !== 1) { dx = 0; dy = -1; }
                break;
            case "ArrowDown":
                if (dy !== -1) { dx = 0; dy = 1; }
                break;
            case "ArrowLeft":
                if (dx !== 1) { dx = -1; dy = 0; }
                break;
            case "ArrowRight":
                if (dx !== -1) { dx = 1; dy = 0; }
                break;
        }
    });
}

function drawSnake() {
    snake.forEach(segment => {
        let cell = document.querySelector(`[data-x="${segment.x}"][data-y="${segment.y}"]`);
        cell.classList.add("snake");
    });
}

function moveSnake() {
    console.log(dx, dy)
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
        let foodCell = document.querySelector(`[data-x="${food.x}"][data-y="${food.y}"]`);
        foodCell.classList.remove("food");
        generateFood();
    } else {
        segment = snake.pop();
        let snakeCell = document.querySelector(`[data-x="${segment.x}"][data-y="${segment.y}"]`);
        snakeCell.classList.remove("snake");
    }
}

function drawFood() {
    let foodCell = document.querySelector(`[data-x="${food.x}"][data-y="${food.y}"]`);
    foodCell.classList.add("food");
}

function generateFood() {
    food.x = Math.floor(Math.random() * boardSize);
    food.y = Math.floor(Math.random() * boardSize);
}

function checkCollisions() {
    const head = snake[0];
    if (head.x < 0 || head.x >= boardSize || head.y < 0 || head.y >= boardSize) {
        gameOver();
    }
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            gameOver();
        }
    }
}

function gameOver() {
    clearInterval(gameLoop);
    alert("Game Over!");
    location.reload();
}

const gameLoop = setInterval(function () {
    moveSnake();
    checkCollisions();
    drawSnake();
    drawFood();
    if (interval > 20) {
        interval--;
    }
}, interval);