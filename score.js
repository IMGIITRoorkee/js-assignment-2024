var player1 = { color : "" , score : 0};
var player2 = { color : "" , score : 0};

const cur_event = {
     
  no_event : 0,
  red_ball_in : 1,
  yellow_ball_in : 2,
  black_ball_in : 3,
  white_ball_in : 4,  

}

function changeTurn(){
    currentPlayer = (currentPlayer === player1) ? player2 : player1;
}

function updateScore(){
   
      if( player1.color = "yellow"){
        player1.score = yellowBallsIn;
        player2.score = redBallsIn;
      }
      else{
        player1.score = redBallsIn;
        player2.score = yellowBallsIn;
      }

      const scorecard = document.getElementById('scorecard');
      if( currentPlayer == player1){
        scorecard.innerHTML = "PLAYER 1<br>";
        scorecard.innerHTML += player1.color + " : " + player1.score + "\n"; 
      }
      else{
        scorecard.innerHTML = "PLAYER 2<br>"; 
        scorecard.innerHTML += player2.color + " : " + player2.score + "\n";
      }

}