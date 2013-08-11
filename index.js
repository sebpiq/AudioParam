var BUFFSIZE = 16384

var AudioParam = window.AudioParam = function(context, defaultValue) {
  var scriptNode = context.createScriptProcessor(0, 1, BUFFSIZE)
    , gainNode = context.createGain()
    , outputBuffer = new Float32Array(BUFFSIZE)
    , i

  for (i = 0; i < BUFFSIZE; i++) outputBuffer[i] = 1

  scriptNode.onaudioprocess = function(event) {
    event.outputBuffer.getChannelData(0).set(outputBuffer)
  }

  scriptNode.connect(gainNode)
  gainNode.gain.value = defaultValue

  return gainNode.gain
}
