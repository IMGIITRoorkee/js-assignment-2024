
let arrowUpPressed = 0;
let arrowUpPressed2 = 0;
let f = 0;
let g = 1;
let gx,gy;
let gkx;
score=0;
life=5;

document.onkeydown = function(e) {
    console.log("keycode", e.key);

    
    // if(e.key === 'ArrowRight'){
    //     goku = document.querySelector('.goku');
    //     gkx=parseInt(window.getComputedStyle(goku,null).getPropertyValue('left'));
    //     goku.style.left=gkx + 50 + "px";
    //     console.log(parseInt(gkx));
    //     fire=document.querySelector('.fire');
    //     fire.style.left=goku.style.left;
    //     console.log(parseInt(fire.style.left));
    //     var animatingObject = document.querySelector('.fire');
    //     var currentLeft = parseFloat(getComputedStyle(animatingObject).left);
    //     animatingObject.style.left = (currentLeft+50) + 'px'; 

    // }
    // else if(e.key === 'ArrowLeft'){
    //     goku = document.querySelector('.goku');
    //     gkx=parseInt(window.getComputedStyle(goku,null).getPropertyValue('left'));
    //     goku.style.left=(gkx - 50) + "px";
    //     console.log(parseInt(gkx));

    // }
    if(life>0){
     if (e.key === 'c'&&f===0 )
    {
        fire = document.querySelector('.fire');
            fire.classList.add('animatefire');
            f = 1;
            setTimeout(() => {
                fire.classList.remove('animatefire');
                f = 0;
            }, 800);
    }
    else if(e.key === 'd'&&f===0){
        fire = document.querySelector('.fire');
            fire.classList.add('animatefire2');
            f = 1;
            setTimeout(() => {
                fire.classList.remove('animatefire2');
                f = 0;
            }, 900);
    }   
    else if(e.key === 'w'&&f===0){
        fire = document.querySelector('.fire');
            fire.classList.add('animatefire3');
            f = 1;
            setTimeout(() => {
                fire.classList.remove('animatefire3');
                f = 0;
            }, 500);
    }
    else if(e.key === 'q'&&f===0){
        fire = document.querySelector('.fire');
            fire.classList.add('animatefire4');
            f = 1;
            setTimeout(() => {
                fire.classList.remove('animatefire4');
                f = 0;
            }, 600);
    } 
}
};

setInterval(()=>{
    gameover=document.querySelector('.gameover')
    goku=document.querySelector('.goku')
    obstacle= document.querySelector('.obstacle')
    fire=document.querySelector('.fire')
    obstacle2= document.querySelector('.obstacle2')
    obstacle1= document.querySelector('.obstacle1')
    gx=parseInt(window.getComputedStyle(fire,null).getPropertyValue('left'));
    gy=parseInt(window.getComputedStyle(fire,null).getPropertyValue('bottom'));
    ox=parseInt(window.getComputedStyle(obstacle,null).getPropertyValue('left'));
    oy=parseInt(window.getComputedStyle(obstacle,null).getPropertyValue('bottom'));
    ox1=parseInt(window.getComputedStyle(obstacle2,null).getPropertyValue('left'));
    oy1=parseInt(window.getComputedStyle(obstacle2,null).getPropertyValue('bottom'));
    ox2=parseInt(window.getComputedStyle(obstacle1,null).getPropertyValue('left'));
    oy2=parseInt(window.getComputedStyle(obstacle1,null).getPropertyValue('bottom'));
    offsetX=Math.abs(gx-ox);
    offsetY=Math.abs(gy-oy);
    offsetX1=Math.abs(gx-ox1);
    offsetY1=Math.abs(gy-oy1);
    offsetX2=Math.abs(gx-ox2);
    offsetY2=Math.abs(gy-oy2);
    if(offsetX<50 && offsetY<50){
        
        obstacle.classList.remove('obstacleAni');
        void obstacle.offsetWidth;
        obstacle.classList.add('obstacleAni');
        
        fire.classList.remove('animatefire');
        f=0;
        score+=1;
        updateScore(score);
        
    }
    if(offsetX1<50 && offsetY1<50){
        
        obstacle2.classList.remove('obstacleAni2');
        void obstacle2.offsetWidth;
        obstacle2.classList.add('obstacleAni2');
        fire.classList.remove('animatefire');
        f=0;
        score+=1;
        updateScore(score);
        
    }
    if(offsetX2<50 && offsetY2<50){
        
        obstacle1.classList.remove('obstacleAni1');
        void obstacle1.offsetWidth;
        obstacle1.classList.add('obstacleAni1');
        
        fire.classList.remove('animatefire');
        f=0;
        score+=1;
        updateScore(score);
        
    }
    
    if((ox<0 || ox1<0 || ox2<0) && g===1){
        console.log(ox,ox1);
        life-=1;
        updateLife(life);
        g=0;
        setTimeout(() => {
            g=1;
        }, 500);

    if(life<=0){
        gameover.style.visibility='visible';
        obstacle.classList.remove('obstacleAni');
        obstacle2.classList.remove('obstacleAni2');
        obstacle1.classList.remove('obstacleAni1');
    }
    }

},10);

function updateScore(score){
    scorecnt.innerHTML = "Your Score : "+score;
}
function updateLife(life){
    lifey.innerHTML = "Your Life : "+life;
}
