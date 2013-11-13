var ApplicationController = function() {
  this.constants = this.initializeConstants()
  this.sprite = new Sprite(SPRITEIMAGE, IMAGEDIMENSION, SPRITECANVAS, WIDTHASPECTRATIO, HEIGHTASPECTRATIO)
  this.path = new Path(PATHCOLOR, PATHCANVAS, WIDTHASPECTRATIO, HEIGHTASPECTRATIO)
  this.grid = new Grid(GRIDCOLOR, GRIDCANVAS, WIDTHASPECTRATIO, HEIGHTASPECTRATIO)
  this.commandLog = new CommandLog()
  this.terminal = new Terminal()
  this.parser = new Parser()
  this.resizeController = new ResizeController(CANVASHTMLIDS)
  this.canvasContexts = []
  this.containerWidth = CONTAINEROFCANVASES.width()
  this.containerHeight = CONTAINEROFCANVASES.height()
}

ApplicationController.prototype.initializeGame = function(){
  this.initializeConstants()
  this.initializeListeners()
  this.terminal.initializeListeners()
  canvasArray = [this.sprite, this.path, this.grid]
  contextArray = this.createCanvases(canvasArray)
  this.canvasContexts = contextArray
  this.grid.makeGridLines()
  this.placeCanvasAxesInTheMiddle(contextArray)
  this.sprite.draw()
}

ApplicationController.prototype.updateDimensionsOnResizeAndPrepareCanvas = function(){
  this.resizeController.updateDimensions(CONTAINEROFCANVASES)
  this.updateStoredCanvasContainerDimensions()
  this.grid.makeGridLines()
  this.placeCanvasAxesInTheMiddle(this.canvasContexts)
  this.sprite.draw()
}

ApplicationController.prototype.updateStoredCanvasContainerDimensions = function() {
  this.containerWidth = CONTAINEROFCANVASES.width()
  this.containerHeight = CONTAINEROFCANVASES.height()
}

ApplicationController.prototype.initializeConstants = function() {
  GRIDCOLOR = "#ddd"
  PATHCOLOR = "#2980b9"
  SPRITEIMAGE = "lib/nyancat.png"
  IMAGEDIMENSION = 40
  CONTAINEROFCANVASES = $('.canvas-container')
  SPRITECANVAS = 'sprite-canvas'
  PATHCANVAS = 'path-canvas'
  GRIDCANVAS = 'grid-canvas'
  CANVASHTMLIDS = [PATHCANVAS, SPRITECANVAS, GRIDCANVAS]
  WIDTHASPECTRATIO = 54
  HEIGHTASPECTRATIO = 30
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
  this.commandLog.update(userCommand)
  this.terminal.addCommandToCompilation(userCommand)
  this.resetCommandListIndexValue()
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

  if (action === "undo"){
      this.path.context.putImageData(this.path.savedCanvasData.pop(), -100, -100)
      this.grid.context.putImageData(this.grid.savedCanvasData.pop(), -100, -100)
      // this.sprite.context.putImageData(this.sprite.savedCanvasData.pop(), -100, -100)

  } else if (action === "left" || action === "lt") {
    this.saveCanvasImageData()
    this.sprite.rotate(-90)
    this.path.rotate(-90)

  } else if (action === "right" || action === "rt") {
    this.saveCanvasImageData()
    this.sprite.rotate(90)
    this.path.rotate(90)

  } else if (action === "rotate") {
    this.saveCanvasImageData()
    this.sprite.rotate(magnitude)
    this.path.rotate(magnitude)

  } else if (action === "spin") {
    var randomAngle = Math.floor((Math.random()*360)+1)
    this.saveCanvasImageData()
    this.sprite.rotate(randomAngle)
    this.path.rotate(randomAngle)

  } else if (action === "backward" || action === "bk") {
    this.saveCanvasImageData()
    this.path.drawLine(-magnitude)
    this.sprite.move(-magnitude)

  } else if (action === "forward" || action === "fd") {
      this.saveCanvasImageData()
      this.path.drawLine(magnitude)
      this.sprite.move(magnitude)

  } else if (action === "jump" || action === "jp") {
    this.saveCanvasImageData()
    this.sprite.move(magnitude)
    this.path.translate(magnitude)

  } else if (action === "move" || action === "mv") {
    this.saveCanvasImageData()
    this.sprite.move(magnitude)
    this.path.translate(magnitude)

  } else {
    alert("Try Again")
  }
}

ApplicationController.prototype.saveCanvasImageData = function(){
    this.path.savedCanvasData.push(this.path.context.getImageData(-100, -100, 1000, 1000))
    this.grid.savedCanvasData.push(this.grid.context.getImageData(-100, -100, 1000, 1000))
    // this.sprite.savedCanvasData.push(this.sprite.context.getImageData(-100, -100, 1000, 1000))
}

