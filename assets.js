var sprites = {};
let assetsStillLoading = 0;

function loadingAssets( callback ){
 
      if( assetsStillLoading ){
         requestAnimationFrame( loadingAssets.bind( this , callback));
      }
      else{
        callback();
      }

}

function loadAssets(callback){
     
        function loadSprite(filename){

            assetsStillLoading++;

            let sprite = new Image();
            sprite.src = "Assets/" + filename;

            sprite.onload = function(){
                assetsStillLoading--;
            }

            return sprite;
            
        }

        sprites.background = loadSprite("spr_background4.png");
        sprites.redball = loadSprite("spr_redBall2.png");
        sprites.blackball = loadSprite("spr_blackBall2.png");
        sprites.yellowball = loadSprite("spr_yellowBall2.png")
        sprites.whiteball = loadSprite("spr_ball2.png");
        sprites.stick = loadSprite("spr_stick.png");
        
        loadingAssets(callback); 
     
}