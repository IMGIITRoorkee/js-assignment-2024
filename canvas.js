function Canvas2D(){
    this._canvas = document.getElementById("canvas");
    this._canvascontext = this._canvas.getContext('2d');
}

Canvas2D.prototype.clear = function(){
    this._canvascontext.clearRect(0,0,this._canvas.width,this._canvas.height);
}

Canvas2D.prototype.changeCanvas = function( id ){
    this._canvas = document.getElementById(id);
    this._canvascontext = this._canvas.getContext('2d');
}

Canvas2D.prototype.drawImage = function( image, position){
    this._canvascontext.drawImage(image , position.x , position.y);
}

Canvas2D.prototype.drawImageStick = function( image, position, rotation , curpowerLevel ){
    
    this._canvascontext.save();
    this._canvascontext.translate(position.x  , position.y);
    this._canvascontext.rotate(rotation);
    this._canvascontext.drawImage(image, 18 + curpowerLevel , -11 );
    this._canvascontext.restore();

}

Canvas2D.prototype.drawPoint = function( position ){
    this._canvascontext.fillStyle = "white";
    this._canvascontext.fillRect( position.x , position.y ,3 , 3);
}

Canvas2D.prototype.clear = function(){
    this._canvascontext.clearRect(0,0,this._canvas.width,this._canvas.height);
}

Canvas2D.prototype.drawRect = function(x,y,width,height){
    this._canvascontext.fillStyle = "white";
    this._canvascontext.fillRect( x , y , width , height );
}

Canvas2D.prototype.drawCircle = function( position , radius){
  
    this._canvascontext.beginPath();
    this._canvascontext.arc(position.x, position.y, radius, 0, 2 * Math.PI, false);
    this._canvascontext.strokeStyle = 'white';
    this._canvascontext.stroke();
     
}

var Canvas = new Canvas2D();


