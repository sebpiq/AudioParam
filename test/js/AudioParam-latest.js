;(function(e,t,n){function i(n,s){if(!t[n]){if(!e[n]){var o=typeof require=="function"&&require;if(!s&&o)return o(n,!0);if(r)return r(n,!0);throw new Error("Cannot find module '"+n+"'")}var u=t[n]={exports:{}};e[n][0].call(u.exports,function(t){var r=e[n][1][t];return i(r?r:t)},u,u.exports)}return t[n].exports}var r=typeof require=="function"&&require;for(var s=0;s<n.length;s++)i(n[s]);return i})({1:[function(require,module,exports){
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

},{}]},{},[1])
;