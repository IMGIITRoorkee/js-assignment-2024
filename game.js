var balls = {};
var boardBorderVertical1 = 55;
var boardBorderVertical2 = 1440;
var boardBorderHorizontal1 = 55;
var boardBorderHorizontal2 = 765;
var elasticity = 0.95;
var stick = new Stick();
var mouse = new mouseHandler();
var keyboard = new keyboardHandler();
var pocketRadius = 46;
var pockets = {};
var redBallsIn = 0;
var yellowBallsIn = 0;
var scoreUpdated = false;

var BallsStopped = true;




function init() {

    Canvas.clear();

    balls.whiteball = new ball( {x:413,y:413} , "white");
   
    let ballPositionsAndColors = [
        [new Vector2D(1022,413), "yellow"],
        [new Vector2D(1056,393), "yellow"],
        [new Vector2D(1056,433), "red"],
        [new Vector2D(1090,374), "red"],
        [new Vector2D(1090,413), "black"],
        [new Vector2D(1090,452), "yellow"],
        [new Vector2D(1126,354), "yellow"],
        [new Vector2D(1126,393), "red"],
        [new Vector2D(1126,433), "yellow"],
        [new Vector2D(1126,472), "red"],
        [new Vector2D(1162,335), "red"],
        [new Vector2D(1162,374), "red"],
        [new Vector2D(1162,413), "yellow"],
        [new Vector2D(1162,452), "red"],
        [new Vector2D(1162,491), "yellow"],
    ];

    for (let i = 0; i < ballPositionsAndColors.length; i++) {
        let position = ballPositionsAndColors[i][0];
        let color = ballPositionsAndColors[i][1];
        balls[`ball${i}`] = new ball(position, color);
    }
    
    pockets = {
        pocket1: new Vector2D(750, 32),
        pocket2: new Vector2D(750,794),
        pocket3: new Vector2D(62,62),
        pocket4: new Vector2D(1435,62),
        pocket5: new Vector2D(62,762),
        pocket6: new Vector2D(1435,762)
    }

    cur_event = {
     
        no_event : 0,
        red_ball_in : 1,
        yellow_ball_in : 2,
        black_ball_in : 3,
        white_ball_in : 4,  
        both_ball_in : 5
      
      }
    
    currentEvent = cur_event.no_event;
    updateScore();
      
    
}

function update() {

    
    BallsStopped = true;
    updateAllBalls();
    stick.updateStick();
    if( BallsStopped && !scoreUpdated){
            updateScore();
            scoreUpdated = true;
    }   

}

function render() {

    Canvas.clear();

    Canvas.drawImage(sprites.background , {x:0 , y:0});
    renderAllBalls();
    stick.renderStick();

    // for( let cur_pocket in pockets){
    //     Canvas.drawPoint(pockets[cur_pocket]);
    //     Canvas.drawCircle(pockets[cur_pocket], pocketRadius);
    // }
    
}

function gameLoop() {
    
    update();
    render();

    //testing code

    // Canvas.drawRect( boardBorderVertical1 , 0 , 1 , 825);
    // Canvas.drawRect( boardBorderVertical2 , 0 , 1 , 825);
    // Canvas.drawRect( 0, boardBorderHorizontal1 , 1500 , 1);
    // Canvas.drawRect( 0, boardBorderHorizontal2 , 1500 , 1);

    requestAnimationFrame(gameLoop);
}

function startGame() {
    init();
    gameLoop();
}

function renderAllBalls(){
    for( let cur_ball in balls){
   
      if( balls[cur_ball].inPocket === false )  balls[cur_ball].renderball();
      else delete[balls[cur_ball]];

    }
}

function updateAllBalls(){
     
    handleCollisionWithBalls();

    for( let cur_ball in balls){
   
        if( balls[cur_ball].inPocket === false){ 
        
            balls[cur_ball].updateball(balls);
            if( balls[cur_ball].velocity.magnitude() !== 0)
            {
                BallsStopped=false;
            }
        }    
         
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

window.addEventListener('keydown', function(e) {
    if(e.keyCode == 32 && e.target == document.body) {
        e.preventDefault();
    }
});
