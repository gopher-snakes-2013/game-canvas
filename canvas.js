function initializeConstants(){
  AMOUNTOFPIXELSFORWARD = 10
  SPRITEDIMENSION = 20
  COMPENSATE = SPRITEDIMENSION/2
  MAXLOGLINES = 20
}

$(document).ready(function(){
  initializeGame()
  $('form').on('submit', applicationController)
  $('#clear-button').on('click', clearLogs)
  $('#textbox').on('keydown', enableLookThroughPastCommands)
})

function initializeGame(){
  initializeConstants()
  initializeBoard()
  initializeFocusOnTextBox()
}

function initializeBoard(){
  var pathCanvas = document.getElementById('path-canvas')
  var pathContext = pathCanvas.getContext("2d")

  var nyanCat = new NyanCat("nyancat.png")

  contextArray = [pathContext, nyanCat.context]

  placeCanvasAxesOnImage(contextArray)
  nyanCat.draw()
  
  var commandLogCounter = 0
  var nthLastCommand = 1
  var pastUserCommands = ['']
}

function initializeFocusOnTextBox() {
  $('#textbox').focus()
}

function assessTextBoxSize() {
  if ($('#textbox').val().length === 15) {
    $('#textbox').css('width', '300')
  } else if ($('#textbox').val().length === 30) {
    $('#textbox').css('width', '500')
  } else {

  }
}

function enableLookThroughPastCommands(event) {
  assessTextBoxSize()
  if (event.keyCode == 38) {
    $('#textbox').val('' + pastUserCommands[pastUserCommands.length-nthLastCommand])
    if (nthLastCommand < pastUserCommands.length) {
      nthLastCommand++
    }
  } else if (event.keyCode == 40) {
    if (nthLastCommand > 1 ) {
      nthLastCommand--
    }
    $('#textbox').val('' + pastUserCommands[pastUserCommands.length-nthLastCommand])   
  } else {

  }
}

function clearLogs(){
  $('ul li').remove()
}

function placeCanvasAxesOnImage(contextArray) {
  contextArray.forEach(function(context) {context.translate(COMPENSATE,COMPENSATE)
  })
}

function drawLine(x,y){
  pathContext.moveTo(nyanCat.currentX, nyanCat.currentY)
  pathContext.lineTo(x, y)
  pathContext.translate(x,y)
  pathContext.strokeStyle= "#FF0000"
  pathContext.stroke()
}

function applicationController(event) {
  event.preventDefault()
  var userCommand = retrieveUserInput()
  updateCommandLog(userCommand)  
  parseGivenCode(userCommand)
  addCommandToCompilation(userCommand)
}

function parseGivenCode(userCommand) {
  var currentLoopMultiplier = 1
  if (checkIfLoopCommandExists(userCommand) === true){
    var commandChainMultiplierPair = separateCommandFromMultiplier(userCommand)
    var userCommand = commandChainMultiplierPair.commandChain
    currentLoopMultiplier = commandChainMultiplierPair.loopMultiplier
  } 
  for (var i=0; i<currentLoopMultiplier; i++){
    performCommandsGiven(userCommand)
  }
}

function performCommandsGiven(userCommand){
  var actionMagnitudePairs = extractActionAndMagnitude(userCommand)
  actionMagnitudePairs.forEach(function(actionMagnitudePair){
  var action = actionMagnitudePair.action
  var magnitude = actionMagnitudePair.magnitudeOfAction
  caseStatement(action,magnitude)
  })
}

function checkIfLoopCommandExists(command){
  if (command.indexOf("repeat") >= 0){
    return true
  } else {
    return false
  }
}

function addCommandToCompilation(userCommand) {
  pastUserCommands.push(userCommand)
}

function separateCommandFromMultiplier(loopCommand){
  intermediaryData = loopCommand.split(' repeat ')
  return  {
    commandChain: intermediaryData[0].slice(1,-1),
    loopMultiplier: Number(intermediaryData[1])
  }
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

function updateCommandLog(lastCommand){
  if (++commandLogCounter > MAXLOGLINES){
    $('ul li').eq(0).remove()
  }
  $('.command-log ul').append('<li>' + lastCommand + '</li>')
  $('#textbox').val('')  
}
