var Delta = 1/100;

function Vector2D(x, y) {
    this.x = x;
    this.y = y;
}

Vector2D.prototype.magnitude = function() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
};

Vector2D.prototype.slow = function( acceleration ){
    
    let newVel = new Vector2D(0,0);
    
    if (this.x < 1 && this.x > -1) {
        newVel.x = 0;
    } 
    else if( this.x > 0){
        newVel.x = this.x - acceleration*Delta;
    }
    else {
        newVel.x = this.x + acceleration * Delta;
    }

    if (this.y < 1 && this.y > -1) {
        newVel.y = 0;
    }
    else if (this.y > 0) {
        newVel.y = this.y - acceleration * Delta;
    } 
    else {
        newVel.y = this.y + acceleration * Delta;
    }

    return newVel;

};

Vector2D.prototype.add = function(vector) {
    return new Vector2D(this.x + vector.x*Delta, this.y + vector.y*Delta);
};

Vector2D.prototype.subtract = function(vector) {
    return new Vector2D(this.x - vector.x, this.y - vector.y);
};

Vector2D.prototype.multiply = function(scalar) {
    return new Vector2D(this.x * scalar, this.y * scalar);
};

Vector2D.prototype.divide = function(scalar) {
    return new Vector2D(this.x / scalar, this.y / scalar);
};

Vector2D.prototype.distance = function(vector) {
    return Math.sqrt(Math.pow(this.x - vector.x, 2) + Math.pow(this.y - vector.y, 2));
};

Vector2D.prototype.distanceHorizontalLine = function(vertical) {
    return Math.abs(this.y - vertical);
}

Vector2D.prototype.distanceVerticalLine = function(horizontal){
    return Math.abs(this.x - horizontal);
}

Vector2D.prototype.normalize = function() {
    return this.divide(this.magnitude());
}

Vector2D.prototype.dot = function(vector){
    return this.x * vector.x + this.y * vector.y;
} 

Vector2D.prototype.cross = function(vector){
 
      return this.x * vector.y - this.y * vector.x;
 
}