let boxsizex = 32;
let boxsizey=32;

let dimensions = boxsizex*16;

let shipVelocityX = 32;
let shipPositionX = 232;




window.onload = function(){
    let ship = document.getElementById('ship');
 
    console.log(dimensions);
    ship.style.left=shipPositionX + "px";
    document.addEventListener("keydown", moveShip);
    
}





function moveShip(e){
    console.log("keypress");
    if(e.code==="ArrowLeft" && shipPositionX >=32){
console.log("leftArrow press");
shipPositionX -= shipVelocityX;
        ship.style.left = shipPositionX + "px"; 
    }else if(e.code==="ArrowRight" && shipPositionX<= (dimensions-96)){
        shipPositionX += shipVelocityX;
        ship.style.left = shipPositionX + "px"; 
    } 
 
        if(e.code==='Space'){
            let bulletPositionY = 2*boxsizey;
            let bulletPositionX = shipPositionX + 16;
            let board = document.getElementById('board');
            let bullet = document.createElement('div');
            bullet.className = 'bullet';
            
            // Set bullet style
            bullet.style.height = '16px'; // Add units
            bullet.style.width = '16px'; // Add units
            bullet.style.backgroundColor = 'white';
            bullet.style.position = 'absolute'; // Set position style for better placement
            bullet.style.left = bulletPositionX +"px"; 
            bullet.style.bottom = bulletPositionY + "px";
            
            board.appendChild(bullet);
            function moveBullet(){
                bulletPositionY +=boxsizex;
                bullet.style.bottom = bulletPositionY + "px";
               

                if(bulletPositionY>=(dimensions-boxsizey)){
                    bullet.remove();
                    clearInterval(bulletInterval);
                }
            }
            let bulletInterval=setInterval(moveBullet,300);



        }
}

