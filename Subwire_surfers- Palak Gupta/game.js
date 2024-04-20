document.addEventListener('DOMContentLoaded', function() {
  const electron = document.getElementById('electron');
  const lanes = document.querySelectorAll('.lane');
  const holes = document.querySelectorAll('.hole');
  const gameContainer = document.getElementById('game-container');

  const holeSpeed = -3; 
  const laneHeight = gameContainer.clientHeight / lanes.length;
  let holePosition = 0;
  let laneIndex = 1;
  const gameContainerSpeed = 200;
  let gameContainerPosition = -50;

 
  function movegameContainer() {
    gameContainerPosition += gameContainerSpeed;
    gameContainer.style.left = (0.01*gameContainerPosition) + '%';
    requestAnimationFrame(movegameContainer);
  }

  
  function moveHoles() {
    holes.forEach(function(hole) {
      holePosition += holeSpeed;
      hole.style.left = holePosition + 'px';
    });
    checkCollisions();
    requestAnimationFrame(moveHoles);
  }

 
  function checkCollisions() {
    const currentLane = lanes[laneIndex - 1];

    for (let i = 0; i < holes.length; i++) {
      const hole = holes[i];
      if (isColliding(electron, hole)) {
        gameOver();
        return;
      }
    }
  }

 
 

 
  function isColliding(elem1, elem2) {
    const rect1 = elem1.getBoundingClientRect();
    const rect2 = elem2.getBoundingClientRect();
    return !(rect1.right < rect2.left || 
             rect1.left > rect2.right || 
             rect1.bottom < rect2.top || 
             rect1.top > rect2.bottom);
  }

 
  document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowUp') {
      moveElectronUp();
    } else if (event.key === 'ArrowDown') {
      moveElectronDown();
    }
  });

  // Function to move electron up
  function moveElectronUp() {
    if (laneIndex > 1) {
      laneIndex--;
      electron.style.top = ((laneIndex - 1) * laneHeight) + 'px';
    }
  }

  // Function to move electron down
  function moveElectronDown() {
    if (laneIndex < lanes.length) {
      laneIndex++;
      electron.style.top = ((laneIndex - 1) * laneHeight) + 'px';
    }
  };
 
  moveHoles();
  movegameContainer();

 
  setInterval(function() {
    const randomLaneIndex = Math.floor(Math.random() * 3);
    const randomLane = lanes[randomLaneIndex];
    const hole = holes[randomLaneIndex];
    hole.style.display = 'block';
    hole.style.top = Math.floor(Math.random() * (laneHeight - 20)) + 'px';
    hole.style.left = (gameContainer.clientWidth - 20) + 'px';
    setTimeout(() => {
      hole.style.display = 'none';
    }, 2000);
  }, 3000);
});
