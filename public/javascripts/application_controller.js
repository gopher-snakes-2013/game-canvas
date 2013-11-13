var ApplicationController = function() {
  this.constants = this.initializeConstants()
  this.sprite = new Sprite(SPRITEIMAGE)
  this.path = new Path(PATHCOLOR)
  this.grid = new Grid(GRIDCOLOR)
  this.commandLog = new CommandLog()
  this.terminal = new Terminal()
  this.parser = new Parser()
  this.resizeController = new ResizeController(CANVASHTMLIDS)
  this.canvases = []
  this.containerWidth = CONTAINEROFCANVASES.width()
  this.containerHeight = CONTAINEROFCANVASES.height()
}


ApplicationController.prototype.initializeGame = function(){
  this.initializeConstants()
  this.initializeListeners()
  this.terminal.initializeListeners()
  canvasArray = [this.sprite, this.path]
  contextArray = this.createCanvases(canvasArray)
  this.canvases = contextArray
  this.placeCanvasAxesInTheMiddle(contextArray)
  this.sprite.draw()
  this.grid.makeGridLines()

}

ApplicationController.prototype.updateDimensionsOnResizeAndPrepareCanvas = function(){
  this.resizeController.updateDimensions(CONTAINEROFCANVASES)
  updateStoredCanvasContainerDimensions()
  this.placeCanvasAxesInTheMiddle(this.canvases)
  this.sprite.draw()
}

updateStoredCanvasContainerDimensions = function() {
  this.containerWidth = CONTAINEROFCANVASES.width()
  this.containerHeight = CONTAINEROFCANVASES.height()
}

ApplicationController.prototype.initializeConstants = function() {
  GRIDCOLOR = "#ddd"
  PATHCOLOR = "#2980b9"
  SPRITEIMAGE = "lib/nyancat.png"
  CONTAINEROFCANVASES = $('.canvas-container')
  CANVASHTMLIDS = ['path-canvas', 'sprite-canvas', 'grid-canvas']
}

ApplicationController.prototype.initializeListeners = function() {
  var self = this
  $('form').on('submit', function(event){
    self.respondToSubmit(event)
  })

  $(window).on('resize', function() {
    self.updateDimensionsOnResizeAndPrepareCanvas()
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
    context.translate(self.sprite.offset + self.containerWidth / 2, self.sprite.offset + self.containerHeight / 2)
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
  var self = this
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
  if (action === "right" || action === "rt") {
    this.sprite.rotate(90)
    this.path.rotate(90)

  } else if (action === "left" || action === "lt") {
    this.sprite.rotate(-90)
    this.path.rotate(-90)

  } else if (action === "spin") {
    var randomAngle = Math.floor((Math.random()*360)+1)
    this.sprite.rotate(randomAngle)
    this.path.rotate(randomAngle)

  } else if (action === "rotate") {
    this.sprite.rotate(magnitude)
    this.path.rotate(magnitude)

  } else {

    if (action === "forward" || action === "fd") {
      this.path.drawLine(magnitude)
      this.sprite.move(magnitude, 0)

    } else if (action === "backward" || action === "bk") {
      this.path.drawLine(-magnitude)
      this.sprite.move(-magnitude, 0)

    } else if (action === "move" || action === "mv") {
      this.path.context.translate(magnitude,0)
      this.sprite.move(magnitude, 0)

    } else {
      alert("Try Again")
    }
  }
}

