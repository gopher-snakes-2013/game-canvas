var ApplicationController = function() {
  this.constants = this.initializeConstants()
  this.sprite = new Sprite(SPRITEIMAGE)
  this.path = new Path(PATHCOLOR)
  this.commandLog = new CommandLog()
  this.terminal = new Terminal()
  this.parser = new Parser()
  this.canvases = []
}

var halfOfCanvasHeight = 540
var halfOfCanvasWidth = 304

ApplicationController.prototype.initializeGame = function(){
  // self = this
  this.dynamicizeCanvases()
  this.initializeConstants()
  this.initializeListeners()
  this.terminal.initializeListeners()
  canvasArray = [this.sprite, this.path]
  this.canvases = canvasArray
  contextArray = this.createCanvases(canvasArray)
  this.placeCanvasAxesInTheMiddle(contextArray)
  this.sprite.draw()
}

ApplicationController.prototype.dynamicizeCanvases = function(){
  self = this
  $(window).on('resize', function(){
    var PathCanvas = document.getElementById('path-canvas')
    var SpriteCanvas = document.getElementById('sprite-canvas')
    container = $('.canvas-container')
    var canvasHeight = container.height()
    halfOfCanvasHeight = canvasHeight/2
    var canvasWidth = container.width()
    halfOfCanvasWidth = canvasWidth/2
    PathCanvas.height = canvasHeight
    PathCanvas.width = canvasWidth
    SpriteCanvas.height = canvasHeight
    SpriteCanvas.width = canvasWidth

    canvasArray = [self.sprite, self.path]
    self.canvases = canvasArray
    self.createCanvases(canvasArray)
    self.placeCanvasAxesInTheMiddle(self.canvases) /// NEEDS TO PASSED CONTEXT ARRAY
    self.sprite.draw()
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

ApplicationController.prototype.placeCanvasAxesInTheMiddle = function(contextArray) {
  var self = this
  contextArray.forEach(function(context) {
    context.translate(self.sprite.offset + halfOfCanvasWidth, self.sprite.offset + halfOfCanvasHeight)
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
