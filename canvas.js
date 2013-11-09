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
    nyanCatContext.clearRect(nyanCat.currentX-5,nyanCat.currentY-5,30,30) // remove old nyan cat
    nyanCatContext.drawImage(nyanCat.img,x,y,20,20) // move 5 forward
    nyanCatContext.translate(x,y) // move axis to nyan cat
    drawLine(x,y) // draw the line
    // nyanCat.updateCoordinates(x,y)
  }

  function rotate90NyanCat(){
    nyanCatContext.translate(20,0)
    nyanCatContext.rotate(1.57)
    pathContext.rotate(1.57)
    nyanCatContext.drawImage(nyanCat.img,nyanCat.currentX,nyanCat.currentY,20,20)
  }

  function parseGivenCode(event) {
    event.preventDefault()
    userCommand = $('#textbox').val()
    $('#textbox').val('')

    if (userCommand === "forward 5") {
      moveNyanCat(nyanCat.currentX+50,nyanCat.currentY+0)
    } else if (userCommand === "rotate 90") {
      rotate90NyanCat()
    } else {
      console.log("Need more")
    }
  }
  debugger
})