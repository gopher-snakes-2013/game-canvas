function initializeConstants(){
  AMOUNTOFPIXELSFORWARD = 10
  SPRITEDIMENSION = 20
  COMPENSATE = SPRITEDIMENSION/2
  MAXLOGLINES = 20
}

var NyanCat = function(){
  this.currentX=0
  this.currentY=0
  this.img = new Image()
  this.img.src = "nyancat.png"
}

$(document).ready(function(){
  var pathCanvas = document.getElementById('path-canvas')
  var pathContext = pathCanvas.getContext("2d")

  var nyanCatCanvas = document.getElementById('nyan-cat-canvas')
  var nyanCatContext = nyanCatCanvas.getContext("2d")

  var nyanCat = new NyanCat()
  initializeBoard()

  var commandLogCounter = 0
  var nthLastCommand = 1
  var pastUserCommands = []

  function initializeBoard(){
    initializeConstants()
    placeCanvasAxesOnImage()
    drawNyanCat()
    fillDefaultMultiplier()
    $('form').on('submit', applicationController)
    $('#clear-button').on('click', clearLogs)
    $('#textbox').on('keydown', enableLookThroughPastCommands)
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

  function fillDefaultMultiplier() {
    $('#multiplier').val('1')
  }

  function placeCanvasAxesOnImage() {
    nyanCatContext.translate(COMPENSATE,COMPENSATE)
    pathContext.translate(COMPENSATE,COMPENSATE)
  }

  function drawLine(x,y){
    pathContext.moveTo(nyanCat.currentX, nyanCat.currentY)
    pathContext.lineTo(x, y)
    pathContext.translate(x,y)
    pathContext.strokeStyle= "#FF0000"
    pathContext.stroke()
  }

  function drawNyanCat(){
    nyanCatContext.drawImage(nyanCat.img,-COMPENSATE,-COMPENSATE,SPRITEDIMENSION,SPRITEDIMENSION)
  }

  function clearNyanCatScreen(){
    nyanCatContext.clearRect(-100,-100,1000,1000)
  }

  function moveNyanCat(x, y){
    clearNyanCatScreen() 
    nyanCatContext.translate(x,0)
    drawNyanCat()
    drawLine(x,y)
  }

  function rotateNyanCat(degrees){
    clearNyanCatScreen()
    nyanCatContext.rotate(degrees*Math.PI/180.0)
    pathContext.rotate(degrees*Math.PI/180.0)
    drawNyanCat()
  }

  function applicationController(event) {
    event.preventDefault()
    var userCommand = retrieveUserInput()
    updateCommandLog(userCommand)  
    parseGivenCode(userCommand)
    addCommandToCompilation(userCommand) // moved from parseGivenCode to applicationController
  }

  function parseGivenCode(userCommand) {
    var currentLoopMultiplier = 1
    if (checkIfLoopCommandExists(userCommand) === true){  // checking to see if a repeat command was entered
      var commandChainMultiplierPair = separateCommandFromMultiplier(userCommand)
      var userCommand = commandChainMultiplierPair.commandChain
      currentLoopMultiplier = commandChainMultiplierPair.loopMultiplier
    } 
    for (var i=0; i<currentLoopMultiplier; i++){
      performCommandsGiven(userCommand)
    }
  }

  function performCommandsGiven(userCommand){
    var actionMagnitudePairs = extractActionAndMagnitude(userCommand) // this depends on userCommand and currentLoopMultiplier
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
      loopMultiplier: Number(intermediaryData[1].slice(0,1))
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
})
