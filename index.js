
let boxsizex = 32;
let boxsizey = 32;
let dimensions = boxsizex * 16;
let shipVelocityX = 32;
let shipPositionX = 256;
let alienVelocityY = 32;
let score = 0;
let bullets = [];
let aliens = [];
let scoreBoard;
let alienInterval;
let board;
let GameOver;
let alienGenerationInterval = 4000;
let alienTimeOut;
let PlayAgain;

window.onload = function () {
  let ship = document.getElementById("ship");
  board = document.getElementById("board");

  ship.style.left = shipPositionX + "px";
  document.addEventListener("keydown", moveShip);
  scoreBoard = document.getElementById("scoreBoard");
  startAlienGeneration(alienGenerationInterval);

  GameOver = document.createElement('div');
  GameOver.style.height = dimensions + "px";
  GameOver.style.width = dimensions + "px";
  GameOver.style.background = 'url(./img/GAMEOVER.png)';
  GameOver.style.backgroundSize = 'contain';
  GameOver.style.backgroundRepeat = 'no-repeat';
  GameOver.style.position = 'absolute';
  GameOver.style.top = (dimensions / 4) + "px";
  GameOver.style.left = "0px";
  GameOver.style.display = 'none';

  PlayAgain = document.createElement('button');
  PlayAgain.textContent = "Play Again";
  PlayAgain.style.position = 'absolute';
  PlayAgain.style.top = "60%";
  PlayAgain.style.left = "50%";
  PlayAgain.style.transform = "translate(-50%, -50%)";
  PlayAgain.style.padding = "10px 20px";
  PlayAgain.style.fontSize = "16px";
  PlayAgain.style.cursor = "pointer";

  PlayAgain.onclick = function () {
    window.location.reload();
  };

  GameOver.appendChild(PlayAgain);
  board.appendChild(GameOver);
};

function startAlienGeneration(alienGenerationInterval) {
  clearInterval(alienTimeOut);
  alienTimeOut = setInterval(createAlien, alienGenerationInterval);
}

function moveShip(e) {
  if (e.code === "ArrowLeft" && shipPositionX > 0) {
    shipPositionX -= shipVelocityX;
    ship.style.left = shipPositionX + "px";
  } else if (e.code === "ArrowRight" && shipPositionX < dimensions - 64) {
    shipPositionX += shipVelocityX;
    ship.style.left = shipPositionX + "px";
  }

  if (e.code === "Space") {
    let bulletPositionY = 2 * boxsizey;
    let bulletPositionX = shipPositionX + 24;

    let bullet = document.createElement("div");
    bullet.className = "bullet";

    bullet.style.height = "16px";
    bullet.style.width = "16px";
    bullet.style.backgroundColor = "white";
    bullet.style.position = "absolute";
    bullet.style.left = bulletPositionX + "px";
    bullet.style.bottom = bulletPositionY + "px";

    board.appendChild(bullet);
    bullets.push({ element: bullet, positionY: bulletPositionY });

    bullet.interval = setInterval(moveBullet, 300, bullet);
  }
}

function moveBullet(bullet) {
  bullets.forEach((bulletObj, index) => {
    if (bulletObj.element === bullet) {
      bulletObj.positionY += boxsizex;
      bulletObj.element.style.bottom = bulletObj.positionY + "px";

      if (bulletObj.positionY >= dimensions) {
        bulletObj.element.remove();
        bullets.splice(index, 1);
        clearInterval(bullet.interval);
      }
    }
  });
}

function createAlien() {
  alienPositionY = 0;

  let randomIndex = Math.floor(Math.random() * 15);
  alienPositionX = randomIndex * 32;

  let alien = document.createElement("div");
  alien.className = "alien";

  alien.style.height = "32px";
  alien.style.width = "64px";
  alien.style.background = "url(./img/alien1.png)";
  alien.style.backgroundSize = "cover";
  alien.style.position = "absolute";
  alien.style.left = alienPositionX + "px";
  alien.style.top = "0px";

  board.appendChild(alien);

  aliens.push({ element: alien, positionY: alienPositionY });

  alien.interval = setInterval(moveAlien, 300, alien);
}

function moveAlien(alien) {
  aliens.forEach((alienObj, index) => {
    if (alienObj.element === alien) {
      alienObj.positionY += boxsizey;
      alienObj.element.style.top = alienObj.positionY + "px";

      if (alienObj.positionY >= 448) {
        gameOver();
      }

      bullets.forEach((bulletObj, bulletIndex) => {
        let bulletX = parseInt(bulletObj.element.style.left);
        let bulletY = parseInt(bulletObj.element.style.bottom);

        if (bulletY >= (512 - alienObj.positionY) && bulletX >= parseInt(alienObj.element.style.left) && bulletX <= parseInt(alienObj.element.style.left) + 64) {
          score += 10;
          scoreBoard.textContent = score;
          alienObj.element.remove();
          bulletObj.element.remove();
          aliens.splice(index, 1);
          bullets.splice(bulletIndex, 1);

          clearInterval(alienObj.interval);
          clearInterval(bulletObj.interval);

          checkAndAdjustAlienGenerationInterval();
        }
      });
    }
  });
}

function gameOver() {
  aliens.forEach((alienObj) => {
    alienObj.element.remove();
    clearInterval(alienObj.interval);
  });
  bullets.forEach((bulletObj) => {
    bulletObj.element.remove();
    clearInterval(bulletObj.interval);
  });

  aliens = [];
  bullets = [];
  ship.remove();
  GameOver.style.display = 'block';
  clearInterval(alienTimeOut);
}

function checkAndAdjustAlienGenerationInterval() {
  if (score % 50 === 0 && alienGenerationInterval > 100) {
    alienGenerationInterval -= 200;
    startAlienGeneration(alienGenerationInterval);
  }
}
