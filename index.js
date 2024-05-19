let boxsizex = 32;
let boxsizey = 32;
let dimensions = boxsizex * 16;
let bulletPositionX ;
let shipVelocityX = 32;
let shipPositionX = 256;
let alienVelocityY = 32;
let bulletPositionY;
let score = 0;
let bullet;
let bulletInterval;
let bullets = [];
let aliens = [];
let scoreBoard;
let alienInterval;
let alien;
let alienPositionX;
let board;
let alienPositionY;
let GameOver;
let alienGenerationInterval=4000;
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
  GameOver.style.height = dimensions  + "px";
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

function startAlienGeneration(alienGenerationInterval){
  clearInterval(alienTimeOut);
  alienTimeOut= setInterval(createAlien, alienGenerationInterval);
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
    bulletPositionY = 2 * boxsizey;
    bulletPositionX = shipPositionX + 24;
    
    bullet = document.createElement("div");
    bullet.className = "bullet";

    // Set bullet style
    bullet.style.height = "16px"; // Add units
    bullet.style.width = "16px"; // Add units
    bullet.style.backgroundColor = "white";
    bullet.style.position = "absolute"; // Set position style for better placement
    bullet.style.left = bulletPositionX + "px";
    bullet.style.bottom = bulletPositionY + "px";

    board.appendChild(bullet);
    bullets.push(bullet);

    bulletInterval = setInterval(moveBullet, 300);
  }
}

async function moveBullet() {
  bullets.forEach((bullet, index) => {
    bulletPositionY += boxsizex;
    bullet.style.bottom = bulletPositionY + "px";

    if (bulletPositionY >= dimensions) {
      bullet.remove();
      bullets.splice(index, 1);
      clearInterval(bulletInterval);
    }
  });
}

async function createAlien() {
   alienPositionY = 0;

  let randomIndex = Math.floor(Math.random() * 15);
  alienPositionX = randomIndex*32;

  alien = document.createElement("div");
  alien.className = "alien";

  alien.style.height = "32px"; 
  alien.style.width = "64px"; 
  alien.style.background = "url(./img/alien1.png)";
  alien.style.backgroundSize = "cover";
  alien.style.position = "absolute";
  alien.style.left = alienPositionX + "px";
  alien.style.top = "0px";

  board.appendChild(alien);

  aliens.push(alien);

  alienInterval = setInterval(moveAlien, 300);
}
function moveAlien() {
  aliens.forEach((alien, index) => {
   
    if (alienPositionY >= 448) {
      gameOver();
     
   
    }
    alienPositionY += boxsizey;
    alien.style.top = alienPositionY + "px";

    if (bulletPositionY >= (512-alienPositionY) && bulletPositionX >= alienPositionX && bulletPositionX <= alienPositionX + 64) {
     
      score += 10;
      scoreBoard.textContent = score;
      alien.remove();
      bullet.remove();
      aliens.splice(index,1);

      clearInterval(alienInterval);
      clearInterval(bulletInterval);
     
     DecAlienGenerationInterval();
     
    }
  });
}
function DecAlienGenerationInterval(){
  if(score%50===0){
    alienGenerationInterval-=300;
    startAlienGeneration(alienGenerationInterval);
  }
}
function gameOver(){
  aliens.forEach((alien)=>alien.remove());
  bullets.forEach((bullet) => bullet.remove());
  aliens=[];
  bullets=[];
  GameOver.style.display='block';
  ship.remove();

  clearInterval(alienInterval);
      clearInterval(alienTimeOut);
}