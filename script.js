// Constants
const tile = 32;  // Changed from tileSize to tile for simplicity
const num_rows = 16;
const num_cols = 16;

// Game board setup
let gameBoard;
let boardWidth = tile * num_cols;
let boardHeight = tile * num_rows;
let gameContext;

// Player's spaceship configuration
const playerShipWidth = tile * 2;
const playerShipHeight = tile;
let playerX = tile * (num_cols / 2) - tile;
let playerY = tile * num_rows - tile * 2;

let playerShip = {
    x : playerX,
    y : playerY,
    width : playerShipWidth,
    height : playerShipHeight
}

let playerImage;
let shipSpeed = tile;  // Movement speed of the ship

// Enemy configuration
let enemies = [];
const enemyWidth = tile * 2;
const enemyHeight = tile;
let enemyStartX = tile;
let enemyStartY = tile;
let enemyImage;

let enemyRows = 2;
let enemyCols = 3;
let remainingEnemies = 0;  // Keeps track of the remaining enemies
let enemySpeed = 1;  // Speed of enemy movement

// Projectile setup
let projectiles = [];
const projectileSpeedY = -10;  // Speed of the bullet

let currentScore = 0;
let isGameOver = false;

window.onload = function() {
    gameBoard = document.getElementById("board");
    gameBoard.width = boardWidth;
    gameBoard.height = boardHeight;
    gameContext = gameBoard.getContext("2d");

    playerImage = new Image();
    playerImage.src = "./ship.png";
    playerImage.onload = function() {
        gameContext.drawImage(playerImage, playerShip.x, playerShip.y, playerShip.width, playerShip.height);
    }

    enemyImage = new Image();
    enemyImage.src = "./alien.png";
    spawnEnemies();

    requestAnimationFrame(gameLoop);
    document.addEventListener("keydown", controlShip);
    document.addEventListener("keyup", fireProjectile);
}

function gameLoop() {
    requestAnimationFrame(gameLoop);

    if (isGameOver) {
        return;
    }

    gameContext.clearRect(0, 0, gameBoard.width, gameBoard.height);
    gameContext.drawImage(playerImage, playerShip.x, playerShip.y, playerShip.width, playerShip.height);

    enemies.forEach(enemy => {
        if (enemy.alive) {
            enemy.x += enemySpeed;
            if (enemy.x + enemy.width >= boardWidth || enemy.x <= 0) {
                enemySpeed *= -1;
                enemy.x += enemySpeed * 2;
                enemies.forEach(e => e.y += enemyHeight);
            }
            gameContext.drawImage(enemyImage, enemy.x, enemy.y, enemy.width, enemy.height);
            if (enemy.y >= playerShip.y) {
                isGameOver = true;
            }
        }
    });

    projectiles.forEach(projectile => {
        projectile.y += projectileSpeedY;
        gameContext.fillStyle = "white";
        gameContext.fillRect(projectile.x, projectile.y, projectile.width, projectile.height);

        enemies.forEach(enemy => {
            if (!projectile.used && enemy.alive && checkCollision(projectile, enemy)) {
                projectile.used = true;
                enemy.alive = false;
                remainingEnemies--;
                currentScore += 100;
            }
        });
    });

    projectiles = projectiles.filter(projectile => !projectile.used && projectile.y >= 0);

    if (remainingEnemies == 0) {
        incrementLevel();
    }

    displayScore();
}

function controlShip(event) {
    if (isGameOver) return;
    if (event.code === "ArrowLeft" && playerShip.x - shipSpeed >= 0) {
        playerShip.x -= shipSpeed;
    } else if (event.code === "ArrowRight" && playerShip.x + shipSpeed + playerShip.width <= boardWidth) {
        playerShip.x += shipSpeed;
    }
}

function spawnEnemies() {
    for (let col = 0; col < enemyCols; col++) {
        for (let row = 0; row < enemyRows; row++) {
            let enemy = {
                img : enemyImage,
                x : enemyStartX + col * enemyWidth,
                y : enemyStartY + row * enemyHeight,
                width : enemyWidth,
                height : enemyHeight,
                alive : true
            }
            enemies.push(enemy);
        }
    }
    remainingEnemies = enemies.length;
}

function fireProjectile(event) {
    if (isGameOver) return;
    if (event.code === "Space") {
        let projectile = {
            x : playerShip.x + playerShipWidth * 15 / 32,
            y : playerShip.y,
            width : tile / 8,
            height : tile / 2,
            used : false
        }
        projectiles.push(projectile);
    }
}

function checkCollision(a, b) {
    return a.x < b.x + b.width && a.x + a.width > b.x && a.y < b.y + b.height && a.y + a.height > b.y;
}

function incrementLevel() {
    currentScore += enemyCols * enemyRows * 100;
    enemyCols = Math.min(enemyCols + 1, num_cols / 2 - 2);
    enemyRows = Math.min(enemyRows + 1, num_rows - 4);
    enemySpeed += (enemySpeed > 0) ? 0.2 : -0.2;
    enemies = [];
    projectiles = [];
    spawnEnemies();
}

function displayScore() {
    gameContext.fillStyle = "white";
    gameContext.font = "16px Courier";
    gameContext.fillText(currentScore, 5, 20);
}