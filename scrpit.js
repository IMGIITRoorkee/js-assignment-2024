document.onkeydown = function(e){
    console.log("On key down", e.keydown)
    if(e.keydown==38){
        niichin = document.querySelector('.niichin');
        niichin.classList.add('animate.niichin');
        setTimeout(() => {
            niichin.classList.remove('animate.niichin');
            
        }, 700);
    }
}