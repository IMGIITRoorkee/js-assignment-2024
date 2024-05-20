function mouseHandler(){
     this.mousePosition = new Vector2D(0,0);
}

mouseHandler.prototype.updateMousePosition = function(event){
    this.mousePosition = new Vector2D(event.clientX, event.clientY);
}