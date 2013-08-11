var BUFFSIZE = 16384

var AudioParam = module.exports = window.AudioParam = function(context, defaultValue) {
  var scriptNode = context.createScriptProcessor(BUFFSIZE, 0, 1)
    , gainNode = context.createGain()
    , outputBuffer = new Float32Array(BUFFSIZE)
    , i, audioParam
  for (i = 0; i < BUFFSIZE; i++) outputBuffer[i] = 1

  // Generate ones to feed the gain
  scriptNode.onaudioprocess = function(event) {
    event.outputBuffer.getChannelData(0).set(outputBuffer)
  }
  scriptNode.connect(gainNode)

  // The AudioParam
  audioParam = gainNode.gain
  audioParam.value = defaultValue
  audioParam.connect = (function(gainNode, scriptNode) {
    return function(destination, input) {
      gainNode.connect(destination, 0, input)
    }
  })(gainNode, scriptNode)
  return audioParam
}
