document.onkeydown = function(e){
    console.log("On key down", e.keyCode)
    if(e.keyCode==38){
        niichin = document.querySelector('.niichin');
        niichin.classList.add('animateniichin');
        setTimeout(() => {
            niichin.classList.remove('animateniichin');
            
        }, 700);
    }
}