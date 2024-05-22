 score = 0;
 cross = true;

document.onkeydown = function(e){
    console.log("On key down", e.keyCode)
    if(e.keyCode==38){
        niichin = document.querySelector('.niichin');
        niichin.classList.add('animateniichin');
        setTimeout(() => {
            niichin.classList.remove('animateniichin');
            
        }, 700);
    }

    if(e.keyCode==39){
        niichin = document.querySelector('.niichin');
        niichinX =  Nx = parseInt(window.getComputedStyle(niichin,null).getPropertyValue('left'));
        niichin.style.left = niichinX + 60 + "px";
    }
    if(e.keyCode==37){
        niichin = document.querySelector('.niichin');
        niichinX =  Nx = parseInt(window.getComputedStyle(niichin,null).getPropertyValue('left'));
        niichin.style.left = (niichinX - 60) + "px";
    }
}
setInterval(() => {
    niichin = document.querySelector('.niichin');
   gameover = document.querySelector('.gameover');
   obstacle = document.querySelector('.obstacle');

   Nx = parseInt(window.getComputedStyle(niichin,null).getPropertyValue('left'));
   Ny = parseInt(window.getComputedStyle(niichin,null).getPropertyValue('top'));


   ox = parseInt(window.getComputedStyle(obstacle,null).getPropertyValue('left'));
   oy = parseInt(window.getComputedStyle(obstacle,null).getPropertyValue('top'));

   offsetX = Math.abs(Nx-ox);
   offsetY  = Math.abs(Ny-oy);
   console.log(offsetX,offsetY)
   if(offsetX<92 && offsetY <250){
    gameover.style.visibility = 'visible';
    obstacle.classList.remove('obstaclena');
   }
   else if (offsetX<145 && cross) {
    score += 1
    update(score);
    cross = false;
    setTimeout(() => {
        cross = true ;
    }, 1000);
   }

    
   

}, 10);
  
function update(score){
    scorecont.innerHTML = "Your score:" + score
}