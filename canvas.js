function initializeConstants(){
  AMOUNTOFPIXELFORWARD = 10
  SPRITEDIMENSION = 20
  COMPENSATE = SPRITEDIMENSION/2
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

  function initializeBoard(){
    initializeConstants()
    placeCanvasAxesOnImage()
    drawNyanCat()
    $('form').on('submit', applicationController)
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
  }

  function parseGivenCode(userCommand) {
    var actionMagnitudePair = extractActionAndMagnitude(userCommand) 
    actionMagnitudePair.forEach(function(objectLiteral){
      var action = objectLiteral.action
      var magnitude = Number(objectLiteral.magnitudeOfAction)
      caseStatement(action,magnitude)
    })
  }

  function retrieveUserInput(){
    return $('#textbox').val()
  }

  function caseStatement(action, magnitude) {
    if (action === "forward") {
      for (var i=0; i<magnitude; i++) { 
        moveNyanCat(nyanCat.currentX+AMOUNTOFPIXELFORWARD, nyanCat.currentY) 
      } 
    } else if (action === "rotate") {
      rotateNyanCat(magnitude)
    } else {
      alert("Try Again")
    }
  }

  function extractActionAndMagnitude(userCommand) {
    console.log(userCommand)
    var individualCommands = userCommand.split(', ') 
    var actionMagnitude = []
    individualCommands.forEach(function(command) {
      actionMagnitude.push({action: command.split(' ')[0],
      magnitudeOfAction: command.split(' ')[1]})
    }) 
    return actionMagnitude
  }

  function updateCommandLog(lastCommand){
    $('.command-log ul').append('<li>' + lastCommand + '</li>')
    $('#textbox').val('')
  }
})
