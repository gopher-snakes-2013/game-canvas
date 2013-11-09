var NyanCat = function(){
  var COMPASS = ['N','E','S','W']
  this.currentX=0
  this.currentY=0
  this.orientation = COMPASS[1]
}

NyanCat.prototype.updateCoordinates = function(endX, endY) {
    this.currentX = endX
    this.currentY = endY
}

$(document).ready(function(){
  var canvas = document.getElementById('c')
  var c_canvas = canvas.getContext("2d")
  var nyanCat = new NyanCat()
  initializeBoard()

  function initializeBoard(){
    var img = new Image()
    img.src = "nyancat.png"
    c_canvas.drawImage(img,0,0,20,20)
    c_canvas.translate(10,10)
    $('form').on('submit', parseGivenCode)
  }

  function drawLine(x,y){
    c_canvas.moveTo(nyanCat.currentX, nyanCat.currentY)
    c_canvas.lineTo(x, y)
    c_canvas.strokeStyle= "#FF0000"
    c_canvas.stroke()
    nyanCat.updateCoordinates(x,y)
  }

  // function moveNyanCat(x,y){

  //   drawLine(x,y)
  // }

  function parseGivenCode(event) {
    event.preventDefault()
    userCommand = $('#textbox').val()
    $('#textbox').val('')

    if (userCommand === "forward 5") {
      drawLine(nyanCat.currentX+50,nyanCat.currentY+0)

    } else if (userCommand === "right 5") {
      drawLine(nyanCat.currentX+0,nyanCat.currentY+50)
    } else {
      console.log("Need more")
    }
  }
})