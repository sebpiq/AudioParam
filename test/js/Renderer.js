var TIME = 20
  , CANW = 500
  , CANH = 500
  , BLOCK = 256
  , MAXY = 20
  , MINY = -20

// --------------- Canvas rendering --------------- //
var Renderer = function(testTitle, data, moreData, sampleRate) {
  var self = this
    , canvas = document.createElement('canvas')
    , canvasCtx = canvas.getContext('2d')
  document.getElementById('canvasContainer').insertBefore(canvas)
  canvas.setAttribute('height', CANH)
  canvas.setAttribute('width', CANW)
  canvasCtx.strokeStyle = 'white'
  canvasCtx.fillStyle = 'white'

  this.testTitle = testTitle
  this.canvasCtx = canvasCtx
  this.data = data
  this.moreData = moreData
  this.sampleRate = sampleRate
  setTimeout(function() { self.render() }, 200)
}

Renderer.prototype.coords = function(i, val) {
  if (isNaN(val)) val = 0
  return [i / (TIME * this.sampleRate / BLOCK) * CANW, CANH - ((val - MINY) * CANH / (MAXY - MINY))]
}

Renderer.prototype.render = function() {
  var self = this
  this.canvasCtx.clearRect(0, 0, CANW, CANH)
  this.canvasCtx.fillText(this.testTitle, 0, 20)
  this.canvasCtx.beginPath()
  this.canvasCtx.moveTo(this.coords(0, this.data[0]))
  this.data.slice(1).forEach(function(val, i) {
    self.canvasCtx.lineTo.apply(self.canvasCtx, self.coords(i + 1, val))
  })
  this.canvasCtx.stroke()
  if (this.moreData()) setTimeout(function() { self.render() }, 200)
}