'use strict';

window.addEventListener('load', function () {
  // hide the loader
  document.querySelector('.loader__container').style.display = 'none';
  // show the content
  document.querySelector('.website-content').classList.remove('website-content--hidden');
});