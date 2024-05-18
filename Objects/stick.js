function Stick(){

    this.position = new Vector2D(0,0);
    this.curpowerLevel = 12;
    this.shootpower = 0;
    this.rotation = 0;
    let temp_canvas = document.createElement('canvas');
    temp_canvas.id = 'stickcanvas';   
    document.body.appendChild(temp_canvas);  
    this.canvas = new Canvas2D();
    this.canvas.changeCanvas('stickcanvas');
    this.sprite = sprites.stick;
    this.isShooting = false;
    this.isVisible = true;
    this.shootingvelocity = 100;

}

Stick.prototype.reset = function(){
  
     this.powerLevel = 0;
     this.isShooting = false;

     
}

Stick.prototype.updateStick = function(){

    if( this.isShooting){
  
          if( this.curpowerLevel > 12)this.curpowerLevel-= 8 ;
          else {
                
                this.isShooting = false;
                this.curpowerLevel = 12;
                stick.isVisible = false;
                balls.whiteball.velocity = new Vector2D( -Math.cos(this.rotation) * this.shootpower*10 , -Math.sin(this.rotation) * this.shootpower*10 );
                this.shootpower = 0;

          }

    }
    
    
    else
    {   

        if( keyboard.keys.w && this.curpowerLevel < 300){
 
            this.curpowerLevel += 1;
    
        }
        if( keyboard.keys.s && this.curpowerLevel > 12){
            
            this.curpowerLevel -= 1;
        }

        if( keyboard.keys.space ){
            
            this.isShooting = true;
            this.shootpower = this.curpowerLevel;
            keyboard.keys.space = false;

        }   
        
     let x = mouse.mousePosition.x - balls.whiteball.position.x;
     let y = mouse.mousePosition.y - balls.whiteball.position.y;
     this.rotation = Math.atan2(y,x);
     this.position = balls.whiteball.center;
    }
     
   
}

Stick.prototype.renderStick = function(){
                                                 
    if( this.isVisible )Canvas.drawImageStick(sprites.stick, this.position , this.rotation , this.curpowerLevel);

}
