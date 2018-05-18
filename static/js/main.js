'use strict';
(() => {
  if (location.protocol === 'http:' && location.hostname !== 'localhost') {
    return location.protocol = 'https:'
  }
  if (/AppleWebKit/.test(navigator.userAgent)) {
    if (confirm('このウェブサイトはお使いの環境では動作しません。Android Chromeまたはデスクトップ版のFirefoxやChromeなどでの閲覧をお願いします。ところで、この問題を解決するためのPRを作成してみませんか？')){
      location.href = 'https://github.com/pastak/haircolor'
    }
  }

  const hairImage = document.querySelector('#hairImage')
  const faceImage = document.querySelector('#faceImage')
  const canvas = document.querySelector('#resultCanvas')
  const ctx = canvas.getContext('2d')

  const updateCanvas = (filter) => {
    ctx.drawImage(faceImage, 0, 0)
    ctx.save()
    ctx.filter = filter
    ctx.globalCompositeOperation = 'overlay'
    ctx.drawImage(hairImage, 0, 0)
    ctx.restore()
  }

  const hueRotateContoller = document.querySelector('#hueRotateContoller')
  const brightnessController = document.querySelector('#brightnessController')
  const saturateController = document.querySelector('#saturateController')
  const updateFilter = () => {
    const filter = `
      hue-rotate(${hueRotateContoller.value}deg)
      brightness(${brightnessController.value})
      saturate(${saturateController.value})
    `
    updateCanvas(filter)
  }
  const eventNames = ['input', 'change']
  eventNames.forEach((eventName) => {
    hueRotateContoller && hueRotateContoller.addEventListener(eventName, updateFilter)
    brightnessController && brightnessController.addEventListener(eventName, updateFilter)
    saturateController && saturateController.addEventListener(eventName, updateFilter)
  })

  const saveImageButton = document.querySelector('#saveImageButton')

  const images = [hairImage, faceImage]
  const loading = images.filter(i => !i.complete)
  if (loading.length === 0) {
    updateFilter()
  } else {
    let loadedImage = 0
    loading.forEach(i => {
      i.addEventListener('load', () => {
        loadedImage++
        if (loadedImage === loading.length) updateFilter()
      })
    })
  }


  const tweetButton = document.querySelector('#tweetButton')
  if (tweetButton && hueRotateContoller && brightnessController && saturateController) {
    tweetButton.addEventListener('click', (event) => {
      event.preventDefault()
      const message = '私のオススメpastakヘアカラーはこちら！皆さんもオススメのヘアカラーをシェアしませんか？'
      const thisUrl = `https://haircolor.pastak.net/?hue=${hueRotateContoller.value}&brightness=${brightnessController.value}&saturate=${saturateController.value}`
      const intentUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(message)}&url=${encodeURIComponent(thisUrl)}&hashtags=pastak_haircolor`
      open(intentUrl)
    })
  }

  let searchQueries = {}
  location.search.substr(1).split('&').forEach(t => {
    const [k, v] = t.split('=')
    searchQueries[k] = v
  })
  if (Object.keys(searchQueries)) {
    history.replaceState({}, document.title, '/')
    if (hueRotateContoller && searchQueries['hue'] !== undefined) {
      hueRotateContoller.value = searchQueries['hue']
      updateFilter()
    }
    if (brightnessController && searchQueries['brightness'] !== undefined) {
      brightnessController.value = searchQueries['brightness']
      updateFilter()
    }
    if (saturateController && searchQueries['saturate'] !== undefined) {
      saturateController.value = searchQueries['saturate']
      updateFilter()
    }
  }
})()
