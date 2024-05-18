function ball( position , color){
     
    this.position = new Vector2D(position.x,position.y);
    this.color = color;
    this.velocity = new Vector2D(0,0);
    this.acceleration = 250 ;
    this.radius = 18;
    this.center = new Vector2D(this.position.x + this.radius + 6 , this.position.y + this.radius + 6);
    this.isMoving = false;

}

ball.prototype.renderball = function(){

    if (this.color == "red") {
        Canvas.drawImage(sprites.redball, this.position);
    } 
    else if (this.color == "yellow") {
        Canvas.drawImage(sprites.redball, this.position);
    } 
    else if (this.color == "black") {
        Canvas.drawImage(sprites.redball, this.position);
    }
    else if (this.color == "white") {
        Canvas.drawImage(sprites.whiteball, this.position);

        //testing
         Canvas.drawPoint(this.center);
    }
    
}


ball.prototype.handleCollisionWithBall = function(ball) {

    if (this.center.distance(ball.center) < this.radius + ball.radius) {

        let distance = this.center.distance(ball.center);
        let overlap = this.radius + ball.radius - distance;

        let collisionNormal = (this.center.subtract(ball.center)).normalize();
        let relativeVelocity = this.velocity.subtract(ball.velocity);
        let velocityAlongNormal = collisionNormal.dot(relativeVelocity);

        if (velocityAlongNormal > 0) {
            return;
        }

        let thisVelocityAlongNormal = this.velocity.dot(collisionNormal);
        let ballVelocityAlongNormal = ball.velocity.dot(collisionNormal);

        let relativeVelocityAlongNormal = thisVelocityAlongNormal - ballVelocityAlongNormal;

        this.velocity = this.velocity.subtract(collisionNormal.multiply(relativeVelocityAlongNormal));
        ball.velocity = ball.velocity.add(collisionNormal.multiply(relativeVelocityAlongNormal));

        // let reflection = collisionNormal.multiply(2 * velocityAlongNormal);
        // this.velocity = this.velocity.subtract(reflection);
        // ball.velocity = ball.velocity.add(reflection);

        let correctionVector = collisionNormal.multiply(overlap / 2);
        this.center = this.center.add(correctionVector);
        ball.center = ball.center.subtract(correctionVector);

    }
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

ball.prototype.handleCollisionWithBalls = function(){
     
     for( let cur_ball in balls){
           
        if( balls[cur_ball] !== this)this.handleCollisionWithBall(balls[cur_ball]);

     }

}

ball.prototype.MoveBall = function(){


     this.velocity = this.velocity.slow(this.acceleration);
     this.center = this.center.add(this.velocity);

     if( this.velocity.magnitude() !== 0)this.isMoving = true;
     else this.isMoving = false;
     
     this.position = new Vector2D(this.center.x - this.radius - 6    , this.center.y - this.radius - 6 );
}

ball.prototype.updateball = function(){
             
     this.handleCollisionWithBalls();
     this.handleCollisionWithBoard();
     this.MoveBall();

}