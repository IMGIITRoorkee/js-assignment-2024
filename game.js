var balls = {};
var boardBorderVertical1 = 75;
var boardBorderVertical2 = 1460;
var boardBorderHorizontal1 = 45;
var boardBorderHorizontal2 = 755;
var elasticity = 0.95;
var stick = new Stick();
var mouse = new mouseHandler();
var keyboard = new keyboardHandler();

var BallsStopped = true;



function init() {

    Canvas.clear();

    balls.whiteball = new ball( {x:450,y:400} , "white");
    balls.ball1 = new ball( {x:750,y:400} , "red");
    balls.ball2 = new ball( {x:100 , y:200 } , "red");
    balls.ball3 = new ball( {x:600 , y:400 } , "yellow");
    
}

function update() {
    
    BallsStopped = true;
    updateAllBalls();
    if(BallsStopped)
        {
            stick.updateStick();
            stick.isVisible = true;
        }

}

function render() {

    Canvas.clear();

    Canvas.drawImage(sprites.background , {x:0 , y:0});
    renderAllBalls();
    stick.renderStick();
    
}

function gameLoop() {
    
    update();
    render();

    //testing code
    
    // Canvas.drawRect( 1460 , 0 , 1 , 825);
    // Canvas.drawRect( 75 , 0 , 2 , 825);
    // Canvas.drawRect( 0, 45 , 1500 , 3);
    // Canvas.drawRect( 0, 755 , 1500 , 5);

    requestAnimationFrame(gameLoop);
}

function startGame() {
    init();
    gameLoop();
}

function renderAllBalls(){
    for( let cur_ball in balls){
   
        balls[cur_ball].renderball();

    }
}

function updateAllBalls(){
    for( let cur_ball in balls){
   
         balls[cur_ball].updateball(balls);
         if( balls[cur_ball].velocity.magnitude() !== 0)BallsStopped=false;
         
    }
}


document.addEventListener('mousemove', function(event) {
    mouse.updateMousePosition(event);
});
document.addEventListener('keydown', function(event) {
    if (event.key === 'w') {
        keyboard.updatePressed('w');
    } 
    if (event.key === 's') {
        keyboard.updatePressed('s');
    }
    if (event.key === ' ') {
        keyboard.updatePressed('space');
    }
});

document.addEventListener('keyup', function(event) {
        if (event.key === 'w'){
            keyboard.updateReleased('w');
        }
        if (event.key === 's'){
            keyboard.updateReleased('s');
        }
});
