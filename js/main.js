var carousel = document.querySelector(".carousel")
var slides = document.querySelectorAll(".slide");
var indicators = document.querySelectorAll(".indicator");
var btnPlayPause = document.querySelector("#pause");
var btnNext = document.querySelector("#next");
var btnPrev = document.querySelector("#prev");
var indicatorContainer = document.querySelector(".indicators");
var left = "ArrowLeft";
var right = "ArrowRight";
var space = " ";
var slideInterval = setInterval(roll, 2000);
var currentSlide = 0;
var isplaying = true;
var swipeStartX = null;
var swipeEndX = null;





function roll (n){
    if(n === undefined){
        n = currentSlide + 1;
    }
    slides[currentSlide].classList.toggle('active');
    indicators[currentSlide].classList.toggle('active');
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.toggle('active');
    indicators[currentSlide].classList.toggle('active');
}



function next(){
    roll(currentSlide + 1);
}
function prev(){
    roll(currentSlide - 1);
}



function playPause(){
    if(isplaying){
        pause();
    }else{
        play();
    }
}

function pause(){
    btnPlayPause.innerHTML = "Play";
    clearInterval(slideInterval);
    isplaying = false;
    
}

function play (){
    btnPlayPause.innerHTML = "Pause";
    slideInterval = setInterval(roll, 2000);
    isplaying = true;
}

function clickNext(){
    pause();
    next();
}
function clickPrev(){
    pause();
    prev();
}

function indicatorTo(e) {
    var target = e.target;
    
    if(target.classList.contains("indicator")){
        pause();
        roll(+target.getAttribute("data-slide-to"));
    }

}

function pressKey(e){

    if(e.key === right) clickNext();
    if(e.key === left) clickPrev();
    if(e.key === space) playPause();
}

function swipeStart(e){
  
    swipeStartX = e.changedTouches[0].pageX;
}

function swipeEnd(e){
   
    swipeEndX = e.changedTouches[0].pageX;
    if (swipeStartX - swipeEndX < -30) clickPrev();
    if (swipeStartX - swipeEndX > 30) clickNext();
}


btnPlayPause.addEventListener("click", playPause);
btnNext.addEventListener("click", clickNext);
btnPrev.addEventListener("click", clickPrev);
indicatorContainer.addEventListener("click", indicatorTo);
document.addEventListener("keydown", pressKey);
carousel.addEventListener("touchstart", swipeStart);
carousel.addEventListener("touchend", swipeEnd);
