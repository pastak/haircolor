'use strict';
(() => {
  const hairImageElement = document.querySelector('.hair');
  const filterElement = document.querySelector('#filter > feColorMatrix[type=\'hueRotate\']')
  const hueRotateContoller = document.querySelector('#hueRotateContoller');
  if (!(filterElement && hueRotateContoller)) return
  hueRotateContoller.addEventListener('input', () => {
    filterElement.setAttribute('values', hueRotateContoller.value)
  });
  const brightnessController = document.querySelector('#brightnessController')
  if (!brightnessController) return;
  brightnessController.addEventListener('input', () => {
    hairImageElement.style.filter = `url(#filter) brightness(${brightnessController.value})`
  })
})();
