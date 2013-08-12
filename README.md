AudioParam
============

With the current [Web Audio API](https://dvcs.w3.org/hg/audio/raw-file/tip/webaudio/specification.html#AudioParam) version, you cannot instantiate `AudioParam`.

This library implements a simple hack that allows you to instantiate a real `AudioParam`
which you can then use to build custom audio nodes with `ScriptProcessorNode`.

Usage
=======

**note :** a full example is available [here](http://sebpiq.github.io/AudioParam/test/example.html).

Download the latest stable release from [dist/](https://github.com/sebpiq/AudioParam/tree/master/dist), and put the file in your webpage. Then create an `AudioParam` like so :

```javascript

var myAudioParam = new AudioParam(audioContext, defaultValue)
```

The created `AudioParam` provides a method `AudioParam.connect(node, input)`, which allows you to connect it to a node. For example :

```
var param = new AudioParam(audioContext, 0.5)
  , customProcess = audioContext.createScriptProcessor(256, 3, 1)
  , channelMerger = audioContext.createChannelMerger(2)
  , paramData, audioSourceData

someAudioSource.connect(channelMerger, 0, 0)
param.connect(channelMerger, 1)

customProcess.onaudioprocess = function(event) {
  audioSourceData = event.inputBuffer.getChannelData(0)
  paramData = event.inputBuffer.getChannelData(1)
  // YOUR CUSTOM PROCESS HERE
}

customProcess.param = param
```
