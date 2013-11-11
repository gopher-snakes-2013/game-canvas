var ApplicationController = function() {
  this.constants = this.initializeConstants()
  this.sprite = new Sprite(SPRITEIMAGE)
  this.path = new Path(PATHCOLOR)
  this.commandLog = new CommandLog()
  this.terminal = new Terminal()
  this.parser = new Parser()
}

ApplicationController.prototype.initializeGame = function(){
  this.dynamicizeCanvases()
  this.initializeConstants()
  this.initializeListeners()
  this.terminal.initializeListeners()
  canvasArray = [this.sprite, this.path]
  contextArray = this.createCanvases(canvasArray)
  this.placeCanvasAxesOnImage(contextArray)
  this.sprite.draw()
}

ApplicationController.prototype.dynamicizeCanvases = function(){
    $(window).resize(function(){
    var PathCanvas = document.getElementById('path-canvas')
    var SpriteCanvas = document.getElementById('sprite-canvas')
    container = $('.canvas-container')

    PathCanvas.height = container.height()
    PathCanvas.width = container.width()
    SpriteCanvas.height = container.height()
    SpriteCanvas.width = container.width()
  })
}

ApplicationController.prototype.initializeConstants = function() {
  PATHCOLOR = "#2980b9"
  SPRITEIMAGE = "lib/nyancat.png"
}

ApplicationController.prototype.initializeListeners = function() {
  var self = this
  $('form').on('submit', function(event){
    self.respondToSubmit(event)
  })
}

ApplicationController.prototype.createCanvases = function(canvasArray){
  var contextArray = []
  canvasArray.forEach(function(canvas) {
    contextArray.push(canvas.prepareContext())
  })
  return contextArray
}

ApplicationController.prototype.placeCanvasAxesOnImage = function(contextArray) {
  var self = this
  contextArray.forEach(function(context) {context.translate(self.sprite.offset,self.sprite.offset)
  })
}

ApplicationController.prototype.respondToSubmit = function(event) {
  event.preventDefault()
  var userCommand = this.retrieveUserInput()
  this.commandLog.update(userCommand)   // Extract
  this.terminal.addCommandToCompilation(userCommand)  // Extract
  this.resetCommandListIndexValue()  // Extract
  if (this.parser.checkIfLoopCommandExists(userCommand)) {
    var commandMultiplierPair = this.parser.parseGivenCode(userCommand)
    this.performLoopCommandsGiven(commandMultiplierPair.command, commandMultiplierPair.multiplier)
  } else {
    this.performSimpleCommandsGiven(userCommand)
  }
}

ApplicationController.prototype.resetCommandListIndexValue = function() {
  this.terminal.commandListIndex = 1
}

ApplicationController.prototype.performLoopCommandsGiven = function(userCommand, currentLoopMultiplier) {
  for (var i=0; i<currentLoopMultiplier; i++){
    this.performSimpleCommandsGiven(userCommand)
  }
}

ApplicationController.prototype.performSimpleCommandsGiven = function(userCommand){
  var actionMagnitudePairs = this.parser.extractActionAndMagnitude(userCommand)
  self = this
  actionMagnitudePairs.forEach(function(actionMagnitudePair){
  var action = actionMagnitudePair.action
  var magnitude = actionMagnitudePair.magnitudeOfAction
  self.caseStatement(action,magnitude)
  })
}

ApplicationController.prototype.retrieveUserInput = function(){
  return $('#textbox').val()
}

ApplicationController.prototype.caseStatement = function(action, magnitude) {
  if (action === "forward") {
    for (var i=0; i<magnitude; i++) {
      this.sprite.move(magnitude, 0)
      this.path.drawLine(magnitude,0)
    }
  } else if (action === "rotate") {
    this.sprite.rotate(magnitude)
    this.path.rotate(magnitude)
  } else {
    alert("Try Again")
  }
}
