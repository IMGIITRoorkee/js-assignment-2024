function ball( position , color){
     
    this.position = new Vector2D(position.x,position.y);
    this.color = color;
    this.velocity = new Vector2D(0,0);
    this.acceleration = 600 ;
    this.radius = 18;
    this.center = new Vector2D(this.position.x + this.radius + 6 , this.position.y + this.radius + 6);
    this.isMoving = false;
    this.inPocket = false;

}

ball.prototype.renderball = function(){

    if (this.color == "red") {
        Canvas.drawImage(sprites.redball, this.position);
    } 
    else if (this.color == "yellow") {
        Canvas.drawImage(sprites.yellowball, this.position);
    } 
    else if (this.color == "black") {
        Canvas.drawImage(sprites.blackball, this.position);
    }
    else if (this.color == "white") {
        Canvas.drawImage(sprites.whiteball, this.position);
    }

   // Canvas.drawCircle(this.center, this.radius);
    
}


ball.prototype.handleCollisionWithBoard = function() {
    let overlap;
    let correctionVector;

    if ((overlap = this.center.distanceHorizontalLine(boardBorderHorizontal1) - this.radius) < 0) {
        correctionVector = new Vector2D(0, -overlap);
        this.center = this.center.add(correctionVector);
        this.velocity.y = -this.velocity.y ;
    }
    if ((overlap = this.center.distanceHorizontalLine(boardBorderHorizontal2) - this.radius) < 0) {
      
        correctionVector = new Vector2D(0, overlap);
        this.center = this.center.add(correctionVector);
        this.velocity.y = -this.velocity.y ;
    }
    if ((overlap = this.center.distanceVerticalLine(boardBorderVertical1) - this.radius) < 0) {
       
        correctionVector = new Vector2D(-overlap, 0);
        this.center = this.center.add(correctionVector);
        this.velocity.x = -this.velocity.x ;
    }
    if ((overlap = this.center.distanceVerticalLine(boardBorderVertical2) - this.radius) < 0) {
       
        correctionVector = new Vector2D(overlap, 0);
        this.center = this.center.add(correctionVector);
        this.velocity.x = -this.velocity.x ;
    }
}

ball.prototype.MoveBall = function(){


     this.velocity = this.velocity.slow(this.acceleration);
     this.center = this.center.add(this.velocity);

     if( this.velocity.magnitude() !== 0)this.isMoving = true;
     else this.isMoving = false;
     
     this.position = new Vector2D(this.center.x - this.radius - 6    , this.center.y - this.radius - 6 );
}

ball.prototype.handleBallInPocket = function(){
   
    for( let cur_pocket in pockets){

        
        if( this.center.distance(pockets[cur_pocket]) < (this.radius + pocketRadius - 20)){
          
            if( this.color !== "white")this.inPocket = true;
            else 
            {
                this.center = new Vector2D( 413 , 413);
                this.velocity = new Vector2D(0,0);
                currentEvent = cur_event.white_ball_in;
            }



            if( redBallsIn === 0 && yellowBallsIn === 0){

            if( this.color == "red"){
                 redBallsIn++;
                 if( currentEvent === cur_event.yellow_ball_in){
                    currentEvent = cur_event.both_ball_in;
                 }
                 else{
                    currentEvent = cur_event.red_ball_in;
                 }
            }
            else if( this.color == "yellow"){
                 yellowBallsIn++;
                    if( currentEvent === cur_event.red_ball_in){
                        currentEvent = cur_event.both_ball_in;
                    }
                    else{
                        currentEvent = cur_event.yellow_ball_in;
                    }
            }
            else if( this.color == "black"){
                    currentEvent = cur_event.black_ball_in;
            }
         
        }
      }
    }
}
ball.prototype.updateball = function(){
             
     //handleCollisionWithBalls();
     this.handleBallInPocket();
     this.handleCollisionWithBoard();
     this.MoveBall();

}

function handleCollisionWithBalls(){
    let ballsArray = Object.values(balls);

    for(let i = 0; i < ballsArray.length; i++){
        for(let j = i + 1; j < ballsArray.length; j++){
            let ball1 = ballsArray[i];
            let ball2 = ballsArray[j];

            if(ball1.center.distance(ball2.center) < ball1.radius + ball2.radius){
                handleCollisionWithBall(ball1,ball2);
            }
        }
    }
}

function handleCollisionWithBall(ball1,ball2){
 
     var distance = ball1.center.distance(ball2.center);
     var overlap = (ball1.radius + ball2.radius - distance);

     var unitNormal = (ball1.center.subtract(ball2.center)).normalize();
     var unitTangent = new Vector2D(-(unitNormal.y), unitNormal.x);

     var minimumTranslation = unitNormal.multiply(overlap);

     ball1.center = ball1.center.add(minimumTranslation.multiply(1));
     ball2.center = ball2.center.subtract(minimumTranslation.multiply(1));
     
     // for ball1
     var v1n = ball1.velocity.dot(unitNormal);
     var v1t = ball1.velocity.dot(unitTangent)*100;
     
     // for ball2
     var v2n = ball2.velocity.dot(unitNormal);
     var v2t = ball2.velocity.dot(unitTangent)*100;
    

     var v1n_vector = unitNormal.multiply(v2n);
     var v1t_vector = unitTangent.multiply(v1t);

     var v2n_vector = unitNormal.multiply(v1n);
     var v2t_vector = unitTangent.multiply(v2t);

     ball1.velocity = v1n_vector.add(v1t_vector);
     ball2.velocity = v2n_vector.add(v2t_vector);
     
    
}

