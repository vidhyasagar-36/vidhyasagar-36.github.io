const track = document.querySelector('.carousel_track');
// Getting the arrays of slides
const slides = Array.from(track.children);
const nextButton = document.querySelector('.carousel_button-right');
const prevButton = document.querySelector('.carousel_button-left');
const dotsNav = document.querySelector('.carousel_nav');
// Gettting the arrays of nav button
const dots = Array.from(dotsNav.children);
const slideWidth = slides[0].getBoundingClientRect().width;

//arrange the slides next to one another
slides.forEach((slide, index) => {
    slide.style.left = slideWidth*index + 'px';
})

//function to navigate through slides
const moveToSlide = (track, currentSlide, targetSlide) => {
    //get the width of the window and move the slide by that amount
    track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
    //change the current_slide tag to the present slide 
    currentSlide.classList.remove('current_slide');
    targetSlide.classList.add('current_slide');
}

// moving of nav buttons inidcator
const updateDots = (currentDot,tragetDot) => {
    currentDot.classList.remove('current_slide');
    tragetDot.classList.add('current_slide');
}

// to disable button when there is no space to slide 
const hideShowArrow = (slides, prevButton, nextButton, targetIndex) => {
    if(targetIndex === 0) {
        prevButton.classList.add('ishidden');
        nextButton.classList.remove('ishidden');
    }else if(targetIndex === slides.length -1){
        prevButton.classList.remove('ishidden');
        nextButton.classList.add('ishidden');
    }else {
        prevButton.classList.remove('ishidden');
        nextButton.classList.remove('ishidden');
    }

}

//move slide to right function
const slideRight = () => {
    const currentSlide = track.querySelector('.current_slide');
    const nextSlide = currentSlide.nextElementSibling;
    const currentDot = dotsNav.querySelector('.current_slide');
    const nextDot = currentDot.nextElementSibling;
    // Iterate through array slides and get the index of macthing slide
    const nextIndex = slides.findIndex(slide => slide === nextSlide);
    moveToSlide(track, currentSlide, nextSlide);
    updateDots(currentDot, nextDot);
    hideShowArrow(slides, prevButton, nextButton, nextIndex);
}

//move slide to right when clicked right
nextButton.addEventListener('click', slideRight);

//move slide to right when courser brought on it
track.addEventListener('scroll', slideRight);

//move slide to left when clicked left
prevButton.addEventListener('click', e=> {
    const currentSlide = track.querySelector('.current_slide');
    const prevSlide = currentSlide.previousElementSibling;
    const currentDot = dotsNav.querySelector('.current_slide');
    const prevDot = currentDot.previousElementSibling;
    // Iterate through array slides and get the index of macthing slide
    const prevIndex = slides.findIndex(slide => slide === prevSlide);
    moveToSlide(track, currentSlide, prevSlide);
    updateDots(currentDot, prevDot);
    hideShowArrow(slides, prevButton, nextButton, prevIndex);
    
})

//when i click nav indiccator move to the slide
dotsNav.addEventListener('click', e => {
    //which indicator was clicked on
    const tragetDot = e.target.closest('button');
    if(!tragetDot) return;
    const currentSlide = track.querySelector('.current_slide');
    const currentDot = dotsNav.querySelector('.current_slide');
    const targetIndex = dots.findIndex(dot => dot === tragetDot);
    const targetSlide = slides[targetIndex];
    moveToSlide(track, currentSlide, targetSlide);
    updateDots(currentDot, tragetDot);
    hideShowArrow(slides, prevButton, nextButton, targetIndex);
})