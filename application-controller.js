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
  var userCommand = retrieveUserInput()
  commandLog.update(userCommand)  
  parseGivenCode(userCommand)
  terminal.addCommandToCompilation(userCommand)
}

function performCommandsGiven(userCommand){
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

function extractActionAndMagnitude(userCommand) {
  var individualCommands = userCommand.split(', ') 
  var actionMagnitude = []
  individualCommands.forEach(function(command) {
    actionMagnitude.push({action: command.split(' ')[0],
    magnitudeOfAction: Number(command.split(' ')[1])})
  }) 
  return actionMagnitude
}

function terminal.addCommandToCompilation(userCommand) {
  pastUserCommands.push(userCommand)
}
