'use strict';
(() => {
  const hairImageElement = document.querySelector('.hair');
  const filterElement = document.querySelector('#filter > feColorMatrix[type=\'hueRotate\']')
  const hueRotateContoller = document.querySelector('#hueRotateContoller');
  const setHueRotate = () => {
    filterElement.setAttribute('values', hueRotateContoller.value)
  }
  if ((filterElement && hueRotateContoller)) {
    hueRotateContoller.addEventListener('input', setHueRotate);
    setHueRotate()
  }
  const brightnessController = document.querySelector('#brightnessController')
  const setBrightness = () => {
    hairImageElement.style.filter = `url(#filter) brightness(${brightnessController.value})`
  }
  if (brightnessController) {
    brightnessController.addEventListener('input', setBrightness);
    setBrightness();
  }
  const tweetButton = document.querySelector('#tweetButton');
  if (tweetButton && hueRotateContoller && brightnessController) {
    tweetButton.addEventListener('click', (event) => {
      event.preventDefault();
      const message = '私のオススメpastakヘアカラーはこちら！皆さんもオススメのヘアカラーをシェアしませんか？';
      const thisUrl = `https://haircolor.pastak.net/?hue=${hueRotateContoller.value}&brightness=${brightnessController.value}`;
      const intentUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}&url=${encodeURIComponent(thisUrl)}&hashtags=pastak_haircolor`
      open(intentUrl);
    })
  }
  let searchQueries = {};
  location.search.substr(1).split('&').forEach(t => {
    const [k, v] = t.split('=');
    searchQueries[k] = v;
  })
  if (Object.keys(searchQueries)) {
    history.replaceState({}, document.title, '/');
    if (hueRotateContoller && searchQueries['hue'] !== undefined) {
      hueRotateContoller.value = searchQueries['hue'];
      setHueRotate();
    }
    if (brightnessController && searchQueries['brightness'] !== undefined) {
      brightnessController.value = searchQueries['brightness'];
      setBrightness();
    }
  }
})();
