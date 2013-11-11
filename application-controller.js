var ApplicationController = function() {
  this.constants = this.initializeConstants()
  this.sprite = new Sprite(SPRITEIMAGE)
  this.path = new Path(PATHCOLOR)
  this.commandLog = new CommandLog()
  this.terminal = new Terminal()
  this.parser = new Parser()
}

ApplicationController.prototype.initializeGame = function(){
  this.initializeConstants()
  this.initializeListeners()

  canvasArray = [this.sprite, this.path]
  contextArray = this.createCanvases(canvasArray)
  this.sprite.draw()
  this.placeCanvasAxesOnImage(contextArray)
}

ApplicationController.prototype.initializeConstants = function() {
  AMOUNTOFPIXELSFORWARD = 10
  MAXLOGLINES = 20
  PATHCOLOR = "#FF0000"
  SPRITEIMAGE = "nyancat.png"
}

ApplicationController.prototype.initializeListeners = function() {
  var self = this
  $('form').on('submit', this.respondToSubmit(event, self))
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

ApplicationController.prototype.respondToSubmit = function(event, self) {
  event.preventDefault()
  self.resetCommandListIndexValue()
  var userCommand = self.retrieveUserInput()
  self.commandLog.update(userCommand)  
  self.parser.parseGivenCode(userCommand)
  self.terminal.addCommandToCompilation(userCommand)
}

ApplicationController.prototype.resetCommandListIndexValue = function() {
  this.terminal.commandListIndex = 1
}

ApplicationController.prototype.performLoopCommandsGiven = function() {
  for (var i=0; i<this.currentLoopMultiplier; i++){
    performCommandsGiven(userCommand)
  }
}

ApplicationController.prototype.performSimpleCommandsGiven = function(userCommand){
  var actionMagnitudePairs = extractActionAndMagnitude(userCommand)
  actionMagnitudePairs.forEach(function(actionMagnitudePair){
  var action = actionMagnitudePair.action
  var magnitude = actionMagnitudePair.magnitudeOfAction
  caseStatement(action,magnitude)
  })
}

ApplicationController.prototype.retrieveUserInput = function(){
  return $('#textbox').val()
}

ApplicationController.prototype.caseStatement = function(action, magnitude) {
  if (action === "forward") {
    for (var i=0; i<magnitude; i++) { 
      moveSprite(this.sprite.currentX+AMOUNTOFPIXELSFORWARD, this.sprite.currentY)
    } 
  } else if (action === "rotate") {
    rotateSprite(magnitude)
  } else {
    alert("Try Again")
  }
}
