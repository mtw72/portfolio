'use strict';

// Carousel for small & medium menu

// ******** VARIABLES ******** //

// Set the time interval for autoplay
const time = 3.5; //3.5 seconds
const timeInterval = time * 1000 / 100;

// Get the elements in carousel
const carouselTrack = document.getElementById("carousel__track");
const slides = document.getElementsByClassName("carousel__slide");
const prevButton = document.querySelector(".carousel__prev-button");
const nextButton = document.querySelector(".carousel__next-button");
const playButton = document.querySelector(".carousel__play-button");
const pauseButton = document.querySelector(".carousel__pause-button");
const transitionButtons = document.querySelectorAll('.carousel__transition-button');
const progressList = document.querySelector(".carousel__progress-list");
const progressContainers = document.getElementsByClassName("carousel__progress-container");
const progressBars = document.getElementsByClassName("carousel__progress-bar");
const bar1 = document.getElementById("bar1");
const bar2 = document.getElementById("bar2");
const bar3 = document.getElementById("bar3");

// Create variables for progress bar
let currentProgressContainer = document.querySelector(".carousel__progress-container.current-container");
let currentProgressBar = document.querySelector(".carousel__progress-bar.current-bar");
let width = 0, memo, dynamicFrame;
let isPlay = true;


// ******** INITIALIZATION ******** //

// Initialize the slide number to the first slide
let slideNumber = 1;
let currentSlideNumber = 1; // Variable to keep track of the current slide
let isTransitioning = false; // Flag to indicate if a transition is in progress
showSlides(slideNumber);
progressStart();


// ******** EVENT LISTENERS ******** //

// Add event listeners to previous and next buttons
prevButton.addEventListener("click", () => {
  plusSlides(-1);
});

nextButton.addEventListener("click", () => {
  plusSlides(1);
});

// Add event listeners to play and pause buttons
pauseButton.addEventListener("click", () => {
  progressPause();
  togglePlayPauseButtons();
});

playButton.addEventListener("click", () => {
  progressResume();
  togglePlayPauseButtons();
});

// Add event listeners to progress list
progressList.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowLeft':
      plusSlides(-1);
      focusProgress();
      break;
    case 'ArrowRight':
      plusSlides(1);
      focusProgress();
      break;
    case 'Home':
      event.preventDefault();
      currentSlide(1);
      focusProgress();
      break;
    case 'End':
      event.preventDefault();
      currentSlide(3);
      focusProgress();
      break;
  }
});

// Add event listeners to each progress container
for (let i = 0; i < progressContainers.length; i++) {
  progressContainers[i].addEventListener("click", () => {
    currentSlide(1 + i);
  });
}


// ******** FUNCTIONS ******** //

// Function to display the slide corresponding to the given index 'n'
function showSlides(n) {
  // For function plusSlides()
  // If 'n' is greater than the number of slides or the current slide index is greater than the number of slides, reset to the first slide
  if (n > slides.length) { slideNumber = 1 }
  // If 'n' is less than 1, set the slide index to the last slide
  if (n < 1) { slideNumber = slides.length }

  // Reset everything to default
  for (let i = 0; i < slides.length; i++) {
    slides[i].classList.remove("current-slide", "previous-slide", "next-slide");
    slides[i].style.zIndex = '0';
    progressContainers[i].classList.remove("current-container");
    progressBars[i].classList.remove("current-bar");
    progressBars[i].setAttribute("aria-selected", "false");
    progressBars[i].setAttribute("tabindex", "-1");
  }

  // Show the current 2 slides - old current slide & new current slide
  slides[currentSlideNumber - 1].style.zIndex = '7';
  slides[slideNumber - 1].style.zIndex = '7';

  let slideIndex = slideNumber - 1;
  if (slideIndex !== 0 && slideIndex !== slides.length - 1) {
    for (let i = 0; i < slides.length; i++) {
      if (i < slideIndex) {
        slides[i].classList.add("previous-slide");
      } else if (i === slideIndex) {
        slides[i].classList.add("current-slide");
      } else {
        slides[i].classList.add("next-slide");
      }
    }
  } else if (slideIndex === 0) {
    for (let i = 0; i < slides.length; i++) {
      if (i === slideIndex) {
        slides[i].classList.add("current-slide");
      } else if (i === (slides.length - 1)) {
        slides[i].classList.add("previous-slide");
      } else {
        slides[i].classList.add("next-slide");
      }
    }
  } else if (slideIndex === slides.length - 1) {
    for (let i = 0; i < slides.length; i++) {
      if (i === 0) {
        slides[i].classList.add("next-slide");
      } else if (i === slideIndex) {
        slides[i].classList.add("current-slide");
      } else {
        slides[i].classList.add("previous-slide");
      }
    }
  }

  // Show the current slide by adding the 'current-slide' class, and setting 'aria-current' attribute to true
  progressContainers[slideNumber - 1].classList.add("current-container");
  progressBars[slideNumber - 1].classList.add("current-bar");
  progressBars[slideNumber - 1].setAttribute("aria-selected", "true");
  progressBars[slideNumber - 1].removeAttribute("tabindex", "-1");

  currentSlideNumber = slideNumber; // Update current slide index
}

// Function to start the progress initially
function progressStart() {
  frame();
  dynamicFrame = setInterval(frame, timeInterval);
}

// Function for the progress bar to advance
function frame() {
  currentProgressBar = document.querySelector(".carousel__progress-bar.current-bar");
  if (width < 100) {
    width++;
    currentProgressBar.style.width = width + "%";
    memo = width;
  } else {
    clearInterval(dynamicFrame); // Clear the coming round
    currentProgressBar.blur();
    currentProgressBar.style.width = "0.75rem";
    slideNumber++; // Advance to the next slide
    showSlides(slideNumber);
    checkDotColor(slideNumber);
    resetProgressBar();
    progressStart();
    carouselTrack.setAttribute("aria-live", "off");
  }
}

// Function to change the dot color according to the slide position
function checkDotColor(slideNumber) {
  [...progressBars].forEach(bar => bar.classList.remove("finished-bar"));
  if (slideNumber === 2) {
    bar1.classList.add("finished-bar");
  }
  if (slideNumber === 3) {
    bar1.classList.add("finished-bar");
    bar2.classList.add("finished-bar");
  }
}

// Helper function to reset the progress bar
function resetProgressBar() {
  currentProgressBar = document.querySelector(".carousel__progress-bar.current-bar");
  width = 0; // Reset width
  currentProgressBar.style.width = width + "%";
  memo = width;
}

// Function to pause the progress bar running
function progressPause() {
  carouselTrack.setAttribute("aria-live", "polite");
  isPlay = false;
  clearInterval(dynamicFrame);
}

// Function to resume the progress bar running
function progressResume() {
  carouselTrack.setAttribute("aria-live", "off");
  isPlay = true;
  currentProgressBar = document.querySelector(".carousel__progress-bar.current-bar");
  width = memo; // Restore the width from memo
  if (width < 100) {
    currentProgressBar.style.width = width + "%";
    progressStart();
  } else {
    currentProgressBar.style.width = "0.75rem";
    slideNumber++; // Advance to the next slide
    showSlides(slideNumber);
    resetProgressBar();
    progressStart();
  }
}

// Helper function to pre-update the carousel initiated by user
function preUpdateByUser() {
  clearInterval(dynamicFrame);
  carouselTrack.setAttribute("aria-live", "polite");
  currentProgressBar = document.querySelector(".carousel__progress-bar.current-bar");
  currentProgressBar.style.width = "0.75rem";
}

// Function to advance the slide by a given number 'n' (positive or negative)
function plusSlides(n) {
  preUpdateByUser();
  slideNumber += n;
  showSlides(slideNumber);
  postUpdateByUser();
  slideTransition();
}

// Function to display the slide corresponding to a given dot
function currentSlide(n) {
  preUpdateByUser();
  slideNumber = n;
  showSlides(n);
  postUpdateByUser();
  slideTransition();
}

// Helper function to post-update the carousel initiated by user
function postUpdateByUser() {
  checkDotColor(slideNumber);
  resetProgressBar();
  if (isPlay) {
    progressStart();
  }
}

// Function to toggle play/pause button visibility and aria-hidden attribute
function togglePlayPauseButtons() {
  playButton.classList.toggle("hidden");
  pauseButton.classList.toggle("hidden");
  playButton.setAttribute('aria-hidden', playButton.classList.contains("hidden"));
  pauseButton.setAttribute('aria-hidden', pauseButton.classList.contains("hidden"));
}

// Function to focus the progress container
function focusProgress() {
  currentProgressBar = document.querySelector(".carousel__progress-bar.current-bar");
  currentProgressBar.focus();
}

function slideTransition() {
  // Check if a transition is already in progress
  if (isTransitioning) return;

  // Set the flag to true to indicate a transition is starting
  isTransitioning = true;

  // Disable the buttons by adding a 'disabled' class
  transitionButtons.forEach(button => button.classList.add('disabled'));

  // Slide change logic here
  // For example, update the current slide index
  // updateSlide(currentIndex + direction);

  // Use a timeout to wait for the transition to complete
  setTimeout(() => {
    // Reset the flag to false after the transition time
    isTransitioning = false;

    // Re-enable the buttons by removing the 'disabled' class
    transitionButtons.forEach(button => button.classList.remove('disabled'));
  }, 1000); // 1000ms = 1 second
}