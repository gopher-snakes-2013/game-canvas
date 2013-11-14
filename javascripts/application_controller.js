var ApplicationController = function() {
  var img = $('.sprite-img')[0]
  img.crossOrigin = "Anonymous"
  this.constants = this.initializeConstants()
  this.sprite = new Sprite(img, IMAGEDIMENSION, SPRITECANVAS, WIDTHASPECTRATIO, HEIGHTASPECTRATIO)
  this.path = new Path(PATHCOLOR, PATHCANVAS, PATHWIDTH, WIDTHASPECTRATIO, HEIGHTASPECTRATIO)
  this.grid = new Grid(GRIDCOLOR, GRIDCANVAS, WIDTHASPECTRATIO, HEIGHTASPECTRATIO)
  this.commandLog = new CommandLog()
  this.terminal = new Terminal()
  this.parser = new Parser()
  this.resizeController = new ResizeController(CANVASHTMLIDS)
  this.imageUploader = new ImageUploader(CANVASTOUPLOAD, IMAGELINKCONTAINERHTMLID)
  this.canvasContexts = []
  this.containerWidth = CONTAINEROFCANVASES.width()
  this.containerHeight = CONTAINEROFCANVASES.height()
  this.commandArray = [""]
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
  IMAGEDIMENSION = 40
  CONTAINEROFCANVASES = $('.canvas-container')
  SPRITECANVAS = 'sprite-canvas'
  PATHCANVAS = 'path-canvas'
  GRIDCANVAS = 'grid-canvas'
  CANVASTOUPLOAD = 'path-canvas'
  CANVASHTMLIDS = [PATHCANVAS, SPRITECANVAS, GRIDCANVAS]
  IMAGELINKCONTAINERHTMLID = 'image-link-container'
  WIDTHASPECTRATIO = 54
  HEIGHTASPECTRATIO = 30
  PATHWIDTH = 5
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
  var self = this
  var userCommand = this.retrieveUserInput()
  this.commandLog.update(userCommand)
  this.terminal.addCommandToCompilation(userCommand)
  this.resetCommandListIndexValue()
  if (userCommand === "undo" || userCommand === "u"){
    self.updateDimensionsOnResizeAndPrepareCanvas()
    this.commandArray.pop()
    for(var i=0; i < this.commandArray.length; i++){
      self.startParse(this.commandArray[i])
    }
  } else {
    this.commandArray.push(userCommand)
    this.startParse(userCommand)
  }
}

ApplicationController.prototype.startParse = function(userCommand){
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

ApplicationController.prototype.updateCurrentColorInDash = function(color){
  $('#current-color').text('Current Color: ' + color.capitalize())
}

ApplicationController.prototype.updateCurrentLineWidthInDash = function(lineWidth){
  $('#line-width').text('Current Line Width: ' + lineWidth)
}


ApplicationController.prototype.updateCurrentLineWidthInDash = function(lineWidth){
  $('#line-width').text('Current Line Width: ' + lineWidth)
}

ApplicationController.prototype.caseStatement = function(action, magnitude) {

  if (action === 'reset') {
    this.updateDimensionsOnResizeAndPrepareCanvas()

  } else if (action === "left" || action === "lt") {
    this.sprite.rotate(-90)
    this.path.rotate(-90)

  } else if (action === "right" || action === "rt") {
    this.sprite.rotate(90)
    this.path.rotate(90)

  } else if (action === "rotate" || action === "r") {
    this.sprite.rotate(magnitude)
    this.path.rotate(magnitude)

  } else if (action === "spin") {
    var randomAngle = Math.floor((Math.random()*360)+1)
    this.sprite.rotate(randomAngle)
    this.path.rotate(randomAngle)

  } else if (action === 'reset') {
    this.updateDimensionsOnResizeAndPrepareCanvas()
    this.path.lineColor = PATHCOLOR
    this.path.lineWidth = PATHWIDTH

  } else if (action === 'clearlogs') {
    this.commandLog.retrieveCurrentLogs().remove()

  } else if (action === "backward" || action === "bk") {
    this.path.drawLine(-magnitude)
    this.sprite.move(-magnitude)

  } else if (action === "forward" || action === "fd") {
    this.path.drawLine(magnitude)
    this.sprite.move(magnitude)

  } else if (action === "jump" || action === "jp") {
    this.sprite.move(magnitude)
    this.path.translate(magnitude)

  } else if (action === "move" || action === "mv") {
    this.sprite.move(magnitude)
    this.path.translate(magnitude)

  } else if (action === "green") {
    this.path.lineColor = "#0AFF58"
    this.updateCurrentColorInDash(action)

  } else if (action === "orange") {
    this.path.lineColor = "#FF820F"
    this.updateCurrentColorInDash(action)

  } else if (action === "pink") {
    this.path.lineColor = "#FF5DF9"
    this.updateCurrentColorInDash(action)

  } else if (action === "purple") {
    this.path.lineColor = "#6050E8"
    this.updateCurrentColorInDash(action)

  } else if (action === "red") {
    this.path.lineColor = "#FF211C"
    this.updateCurrentColorInDash(action)

  } else if (action === "yellow") {
    this.path.lineColor = "#FFE119"
    this.updateCurrentColorInDash(action)

  } else if (action === "blue") {
    this.path.lineColor = "#2980b9"

  } else if (action === "randomcolor" || action === "rc") {
    this.path.lineColor = getRandomColor()
    this.updateCurrentColorInDash('random')

  } else if (action === "linewidth" || action === "lw") {
    if (magnitude > 1 && magnitude <= 1000) {
      this.path.lineWidth = magnitude
      this.updateCurrentLineWidthInDash(magnitude)
    }

  } else if (action === "default") {
    this.path.lineColor = PATHCOLOR
    this.path.lineWidth = PATHWIDTH

  } else if (action === "save") {
    this.imageUploader.uploadToImgurAndAppendLinksToScreen()

  } else {
    alert("Try Again")

  }
}
