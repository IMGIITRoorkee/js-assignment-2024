document.addEventListener('DOMContentLoaded', function() {
  const electron = document.getElementById('electron');
  const lanes = document.querySelectorAll('.lane');
  const gameContainer = document.getElementById('game-container');

  function startGame() {
    startButton.style.display = 'none'; 
    gameContainer.style.display = 'block';

  const holeSpeed = 5;
  let laneIndex = 1;
  const electronWidth = electron.offsetWidth;
  const gameWidth = gameContainer.offsetWidth;
 

  document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowLeft' && laneIndex > 0) {
      laneIndex--;
      moveElectron();
    } else if (event.key === 'ArrowRight' && laneIndex < 2) {
      laneIndex++;
      moveElectron();
    }
  });

  const gameContainerSpeed = 20;

  function moveHoles() {
    const holes = document.querySelectorAll('.hole');
    holes.forEach(function(hole) {
      let holePosition = parseFloat(hole.style.bottom) || 0;
      holePosition += holeSpeed;
      hole.style.bottom = holePosition + 'px';

      
      if (holePosition > gameContainer.clientHeight) {
        hole.remove();
      }
    });
    generateHoles(); // Generate new holes
    
    requestAnimationFrame(moveHoles);
    checkCollisions();
  }
  function checkCollisions() {
    const electronRect = electron.getBoundingClientRect();
    lanes.forEach(function(lane) {
      const holes = lane.querySelectorAll('.hole');
      holes.forEach(function(hole) {
        const holeRect = hole.getBoundingClientRect();
        if (
          electronRect.top < holeRect.bottom &&
          electronRect.right > holeRect.left &&
          electronRect.left < holeRect.right &&
          electronRect.bottom > holeRect.top
        ) {
          gameOver();
        }
      });
    });
  }
  
  function gameOver() {
    // Stop the game
    cancelAnimationFrame(moveHoles);
    cancelAnimationFrame(movegameContainer);

    // Display a dialog box
    alert("Game Over! You collided with a hole.");

    // Reload the page to restart the game
    location.reload();
  }

  function moveElectron() {
    const lane = lanes[laneIndex];
    const laneWidth = lane.offsetWidth; 
    const maxRight = gameWidth - electronWidth;
    const maxLeft = Math.max(0, lane.offsetLeft);
    const targetLeft = Math.min(Math.max(maxLeft, lane.offsetLeft + laneWidth / 2 - electronWidth / 2), maxRight);

  
    electron.style.left = targetLeft + 'px';
  }

  function generateHoles() {
    lanes.forEach(function(lane) {
      if (Math.random() < 0.004){ 
        const hole = document.createElement('div');
        hole.className = 'hole';
        const randomLeft = Math.floor(Math.random() * (lane.offsetWidth - 20));
        hole.style.bottom = '0'; 
        hole.style.left = randomLeft + 'px';
        lane.appendChild(hole);
      }
    });
  }

  function movegameContainer(){
    gameContainerPosition += gameContainerSpeed;
    gameContainer.style.bottom = (0.01 * gameContainerPosition) + '%';
    requestAnimationFrame(movegameContainer);
  }

  moveHoles();
  movegameContainer();
}
startButton.addEventListener('click', startGame);
}
);
