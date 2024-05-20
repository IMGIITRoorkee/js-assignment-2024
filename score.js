var player1 = { name: "player1",color : "red" , score : 0};
var player2 = { name: "player2",color : "yellow" , score : 0};

var currentPlayer = player1;
var otherplayer = player2;
var GameWinner = null;

var cur_event = {};
var currentEvent = 0;


function switchTurn(){
 
        if( currentPlayer == player1){
          
          currentPlayer = player2;
          otherplayer = player1;

        }
        else{
            
            currentPlayer = player1;
            otherplayer = player2;
          
        }
}


function handleEvent(eventType){

  if(currentPlayer == player1){
        otherplayer = player2;
  }
  else{
    otherplayer = player1;
  }

     // score update

    player1.score = redBallsIn;
    player2.score = yellowBallsIn;
      
     //turn update

     switch (eventType){

        case cur_event.no_event:
         switchTurn();  
         break;
       
        case cur_event.red_ball_in:
          if( currentPlayer.color !== "red"){
            switchTurn();
          }
          break;

        case cur_event.yellow_ball_in:  
          if( currentPlayer.color !== "yellow"){
            switchTurn();
          }
          break;

        case cur_event.black_ball_in:
          if( currentPlayer.score === 7){
            GameWinner = currentPlayer;
          }
          else{
            GameWinner = otherplayer;
          }
          break;

         case cur_event.white_ball_in:
          switchTurn();
          break;    

         case cur_event.both_ball_in:
          switchTurn();
          break;

     } 

}


function updateScore(){

      handleEvent(currentEvent);
  
      const scorecard = document.getElementById('scorecard');
      const body = document.querySelector('body');
      
      if( GameWinner !== null){

        scorecard.innerHTML = "GAME OVER<br>";
        scorecard.innerHTML += GameWinner.name + " wins!";

      }

      else if( currentPlayer == player1){
        scorecard.innerHTML = "PLAYER 1<br>";
        scorecard.innerHTML += player1.color + " : " + player1.score + "\n"; 
        body.style.backgroundColor = "#9b1b1c";
      }
      else{
        scorecard.innerHTML = "PLAYER 2<br>"; 
        scorecard.innerHTML += player2.color + " : " + player2.score + "\n";
        body.style.backgroundColor = "#f2c208";
      }

}