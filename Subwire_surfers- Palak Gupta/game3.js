document.addEventListener('DOMContentLoaded', function() {
  const electron = document.getElementById('electron');
  const lanes = document.querySelectorAll('.lane');
  const gameContainer = document.getElementById('game-container');

  function startGame() {
    startButton.style.display = 'none'; // Hide the start button
    gameContainer.style.display = 'block'; // Show the game container

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

      // Remove holes when they go beyond the game container
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
    const lane = lanes[laneIndex]; // Get the current lane where the electron should move
    const laneWidth = lane.offsetWidth; // Get the width of the current lane
    const maxRight = gameWidth - electronWidth; // Calculate the maximum right position
    const maxLeft = Math.max(0, lane.offsetLeft); // Calculate the maximum left position, ensuring it stays to the right of the leftmost boundary
    const targetLeft = Math.min(Math.max(maxLeft, lane.offsetLeft + laneWidth / 2 - electronWidth / 2), maxRight); // Calculate the target left position, ensuring it stays within the bounds

    // Set the left position of the electron to the calculated target left position
    electron.style.left = targetLeft + 'px';
  }

  function generateHoles() {
    lanes.forEach(function(lane) {
      if (Math.random() < 0.004){ // Adjust the probability to control the frequency of holes
        const hole = document.createElement('div');
        hole.className = 'hole';
        const randomLeft = Math.floor(Math.random() * (lane.offsetWidth - 20));
        hole.style.bottom = '0'; // Set bottom to 0 to ensure holes appear at the top
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
