
function keyboardHandler(){
    this.keys = {w:false,s:false,space:false};
} 

keyboardHandler.prototype.updatePressed = function(keypresssed){
       if( keypresssed === 'w')this.keys.w = true;
       if( keypresssed === 's')this.keys.s = true;
       if( keypresssed === 'space')this.keys.space = true;
}

keyboardHandler.prototype.updateReleased = function(keyreleased){
         if( keyreleased === 'w')this.keys.w = false;
         if( keyreleased === 's')this.keys.s = false;
}

