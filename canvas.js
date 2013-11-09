AMOUNTOFPIXELFORWARD = 10
CLEARSCREENDIMENSION = 1000

var NyanCat = function(){
  this.currentX=0
  this.currentY=0
  this.img = new Image()
  this.img.src = "nyancat.png"
}

NyanCat.prototype.updateCoordinates = function(endX, endY) {
    this.currentX = endX
    this.currentY = endY
}

$(document).ready(function(){
  var pathCanvas = document.getElementById('path-canvas')
  var pathContext = pathCanvas.getContext("2d")

  var nyanCatCanvas = document.getElementById('nyan-cat-canvas')
  var nyanCatContext = nyanCatCanvas.getContext("2d")

  var nyanCat = new NyanCat()
  initializeBoard()

  function initializeBoard(){
    nyanCatContext.drawImage(nyanCat.img,0,0,20,20)
    // nyanCatContext.translate(10,10)
    pathContext.translate(10,10)
    $('form').on('submit', parseGivenCode)
  }

  function drawLine(x,y){
    pathContext.moveTo(nyanCat.currentX, nyanCat.currentY) // tells us where starting the line
    pathContext.lineTo(x, y) // where line is gonna end up
    pathContext.translate(x,y)
    pathContext.strokeStyle= "#FF0000"
    pathContext.stroke()
  }

  function moveNyanCat(x,y){
    nyanCatContext.clearRect(0,0,CLEARSCREENDIMENSION,CLEARSCREENDIMENSION) // remove old nyan cat
    nyanCatContext.drawImage(nyanCat.img,x,y,20,20) // move 5 forward
    nyanCatContext.translate(x,y) // move axis to nyan cat
    drawLine(x,y) // draw the line
    // nyanCat.updateCoordinates(x,y)
  }

  function rotateNyanCat(degrees){
    nyanCatContext.translate(20,0)
    nyanCatContext.rotate(degrees*Math.PI/180.0)
    pathContext.rotate(degrees*Math.PI/180.0)
    nyanCatContext.clearRect(0,0,CLEARSCREENDIMENSION,CLEARSCREENDIMENSION)
    nyanCatContext.drawImage(nyanCat.img,nyanCat.currentX,nyanCat.currentY,20,20)
  }

  function parseGivenCode(event) {
    event.preventDefault()
    userCommand = $('#textbox').val() // consider DOWNCASE...
    updateCommandLog(userCommand)  
    var actionMagnitudePair = extractActionAndMagnitude(userCommand) 
    actionMagnitudePair.forEach(function(objectLiteral){
      var action = objectLiteral.action
      var magnitude = Number(objectLiteral.magnitudeOfAction)
      caseStatement(action,magnitude)
    })
  }

  function caseStatement(action, magnitude) {
    if (action === "forward") {
      for (var i=0; i<magnitude; i++) { // CHANGE MAGNITUDE INTO AN INTEGER
        moveNyanCat(nyanCat.currentX+AMOUNTOFPIXELFORWARD,nyanCat.currentY) 
      } 
    } else if (action === "rotate") {
      rotateNyanCat(magnitude)
    } else {
      alert("Try Again")
    }
  }

  function extractActionAndMagnitude(userCommand) {
    console.log(userCommand)  // "forward 5, rotate 90"
    var individualCommands = userCommand.split(', ') // ["forward 5", "rotate 90"]
    var actionMagnitude = []
    individualCommands.forEach(function(command) {
      actionMagnitude.push({action: command.split(' ')[0], // { action: "forward", magnitudeOfAction: "5" }
      magnitudeOfAction: command.split(' ')[1]})
    }) 
    return actionMagnitude
  }

  function updateCommandLog(lastCommand){
    $('.command-log ul').append('<li>' + lastCommand + '</li>')
    $('#textbox').val('')
  }
})
