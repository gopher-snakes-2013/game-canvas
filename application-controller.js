var ApplicationController = function() {
  this.constants = this.initializeConstants()
  this.game = this.initializeCanvases()
}

ApplicationController.prototype.initializeConstants = function() {
  AMOUNTOFPIXELSFORWARD = 10
  SPRITEDIMENSION = 20
  COMPENSATE = SPRITEDIMENSION/2
  MAXLOGLINES = 20
}

ApplicationController.prototype.initializeConstants = function() {
  $('form').on('submit', retrieveCommand)
}

ApplicationController.prototype.initializeGame = function(){
  initializeCanvases()
}

ApplicationController.prototype.initializeCanvases = function(){
  var nyanCat = new NyanCat("nyancat.png")
  var path = new Path("#FF0000")
  var commandLog = new CommandLog()
  var terminal = new Terminal()
  contextArray = [path.context, nyanCat.context]
  placeCanvasAxesOnImage(contextArray)
  nyanCat.draw()
}

function placeCanvasAxesOnImage(contextArray) {
  contextArray.forEach(function(context) {context.translate(COMPENSATE,COMPENSATE)
  })
}

function retrieveCommand(event) {
  event.preventDefault()
  resetCommandListIndexValue()
  var userCommand = retrieveUserInput()
  commandLog.update(userCommand)  
  parseGivenCode(userCommand)
  terminal.addCommandToCompilation(userCommand)
}

// parse.ParseGivenCode <- will return a object literal with command and loopmultiplier

function resetCommandListIndexValue() {
  terminal.commandListIndex = 1
}

function performLoopCommandsGiven() {
  for (var i=0; i<this.currentLoopMultiplier; i++){
    performCommandsGiven(userCommand)
  }
}

function performSimpleCommandsGiven(userCommand){
  var actionMagnitudePairs = extractActionAndMagnitude(userCommand)
  actionMagnitudePairs.forEach(function(actionMagnitudePair){
  var action = actionMagnitudePair.action
  var magnitude = actionMagnitudePair.magnitudeOfAction
  caseStatement(action,magnitude)
  })
}

function retrieveUserInput(){
  return $('#textbox').val()
}

function caseStatement(action, magnitude) {
  if (action === "forward") {
    for (var i=0; i<magnitude; i++) { 
      moveNyanCat(nyanCat.currentX+AMOUNTOFPIXELSFORWARD, nyanCat.currentY)
    } 
  } else if (action === "rotate") {
    rotateNyanCat(magnitude)
  } else {
    alert("Try Again")
  }
}
