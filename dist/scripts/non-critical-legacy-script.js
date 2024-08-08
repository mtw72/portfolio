'use strict';

// Carousel for small & medium menu

// ******** VARIABLES ******** //

// Set the time interval for autoplay
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
var time = 5; //5 seconds
var timeInterval = time * 1000 / 100;

// Get the elements in carousel
var carouselTrack = document.querySelector(".carousel__track");
var slides = document.getElementsByClassName("carousel__slide");
var prevButton = document.querySelector(".carousel__prev-button");
var nextButton = document.querySelector(".carousel__next-button");
var playButton = document.querySelector(".carousel__play-button");
var pauseButton = document.querySelector(".carousel__pause-button");
var transitionButtons = document.querySelectorAll('.carousel__transition-button');
var progressList = document.querySelector(".carousel__progress-list");
var progressContainers = document.getElementsByClassName("carousel__progress-container");
var progressBars = document.getElementsByClassName("carousel__progress-bar");
var bar1 = document.getElementById("bar1");
var bar2 = document.getElementById("bar2");
var bar3 = document.getElementById("bar3");
// const bar4 = document.getElementById("bar4");
// const bar5 = document.getElementById("bar5");
var video = document.querySelector(".carousel__video");

// Create variables for progress bar
var currentProgressContainer = document.querySelector(".carousel__progress-container.current-container");
var currentProgressBar = document.querySelector(".carousel__progress-bar.current-bar");
var width = 0,
  memo,
  dynamicFrame,
  i;
var isPlay = true;

// ******** INITIALIZATION ******** //

// Set attributes of the carousel track and the progress bar
setAttributes();

// Initialize the slide number to the first slide
var slideNumber = 1;
var currentSlideNumber = 1; // Variable to keep track of the current slide
var isTransitioning = false; // Flag to indicate if a transition is in progress
showSlides(slideNumber);
progressStart();

// ******** EVENT LISTENERS ******** //

// Add event listeners to previous and next buttons
prevButton.addEventListener("click", function () {
  plusSlides(-1);
});
nextButton.addEventListener("click", function () {
  plusSlides(1);
});

// Add event listeners to play and pause buttons
pauseButton.addEventListener("click", function () {
  progressPause();
  togglePlayPauseButtons();
});
playButton.addEventListener("click", function () {
  progressResume();
  togglePlayPauseButtons();
});

// Add event listeners to progress list
progressList.addEventListener('keydown', function (event) {
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
var _loop = function _loop(_i) {
  progressContainers[_i].addEventListener("click", function () {
    currentSlide(1 + _i);
  });
};
for (var _i = 0; _i < progressContainers.length; _i++) {
  _loop(_i);
}

// ******** FUNCTIONS ******** //

// Function to display the slide corresponding to the given index 'n'
function showSlides(n) {
  // For function plusSlides()
  // If 'n' is greater than the number of slides or the current slide index is greater than the number of slides, reset to the first slide
  if (n > slides.length) {
    slideNumber = 1;
  }
  // If 'n' is less than 1, set the slide index to the last slide
  if (n < 1) {
    slideNumber = slides.length;
  }

  // Reset everything to default
  for (var _i2 = 0; _i2 < slides.length; _i2++) {
    slides[_i2].classList.remove("current-slide", "previous-slide", "next-slide");
    slides[_i2].style.zIndex = '0';
    progressContainers[_i2].classList.remove("current-container");
    progressBars[_i2].classList.remove("current-bar");
    progressBars[_i2].setAttribute("aria-selected", "false");
    progressBars[_i2].setAttribute("tabindex", "-1");
  }

  // Show the current 2 slides - old current slide & new current slide
  slides[currentSlideNumber - 1].style.zIndex = '7';
  slides[slideNumber - 1].style.zIndex = '7';
  var slideIndex = slideNumber - 1;
  if (slideIndex !== 0 && slideIndex !== slides.length - 1) {
    for (var _i3 = 0; _i3 < slides.length; _i3++) {
      if (_i3 < slideIndex) {
        slides[_i3].classList.add("previous-slide");
      } else if (_i3 === slideIndex) {
        slides[_i3].classList.add("current-slide");
      } else {
        slides[_i3].classList.add("next-slide");
      }
    }
  } else if (slideIndex === 0) {
    for (var _i4 = 0; _i4 < slides.length; _i4++) {
      if (_i4 === slideIndex) {
        slides[_i4].classList.add("current-slide");
      } else if (_i4 === slides.length - 1) {
        slides[_i4].classList.add("previous-slide");
      } else {
        slides[_i4].classList.add("next-slide");
      }
    }
  } else if (slideIndex === slides.length - 1) {
    for (var _i5 = 0; _i5 < slides.length; _i5++) {
      if (_i5 === 0) {
        slides[_i5].classList.add("next-slide");
      } else if (_i5 === slideIndex) {
        slides[_i5].classList.add("current-slide");
      } else {
        slides[_i5].classList.add("previous-slide");
      }
    }
  }

  // For slide 3 video to autoplay
  if (slideIndex === 2) {
    video.play();
  } else {
    video.pause();
    video.currentTime = 0; // Reset video
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
  _toConsumableArray(progressBars).forEach(function (bar) {
    return bar.classList.remove("finished-bar");
  });
  if (slideNumber === 2) {
    bar1.classList.add("finished-bar");
  } else if (slideNumber === 3) {
    bar1.classList.add("finished-bar");
    bar2.classList.add("finished-bar");
  } else if (slideNumber === 4) {
    bar1.classList.add("finished-bar");
    bar2.classList.add("finished-bar");
    bar3.classList.add("finished-bar");
  } else if (slideNumber === 5) {
    bar1.classList.add("finished-bar");
    bar2.classList.add("finished-bar");
    bar3.classList.add("finished-bar");
    bar4.classList.add("finished-bar");
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

// Function to stop further transition when the next button, previous button or current slide button is activated
function slideTransition() {
  // Check if a transition is already in progress
  if (isTransitioning) return;
  isTransitioning = true;
  transitionButtons.forEach(function (button) {
    return button.classList.add('disabled');
  });

  // Use a timeout to wait for the transition to complete
  setTimeout(function () {
    isTransitioning = false;
    transitionButtons.forEach(function (button) {
      return button.classList.remove('disabled');
    });
  }, 1000);
}

// Function to set attributes of the carousel track and the progress bar
function setAttributes() {
  for (i = 0; i < slides.length; i++) {
    slides[i].setAttribute('id', "carousel-slide".concat(i + 1));
    slides[i].setAttribute('aria-label', "Slide ".concat(i + 1, " of ").concat(slides.length));
    progressBars[i].setAttribute('aria-label', "Slide ".concat(i + 1));
    progressBars[i].setAttribute('aria-controls', "carousel-slide".concat(i + 1));
  }
}
//# sourceMappingURL=non-critical-legacy-script.js.map
