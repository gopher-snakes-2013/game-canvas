var NyanCat = function(avatar){
  this.currentX=0
  this.currentY=0
  this.img = new Image()
  this.img.src = avatar
  this.context = this.prepareContext()
}

NyanCat.prototype.prepareContext = function() {
  var nyanCatCanvas = document.getElementById('nyan-cat-canvas')
  return nyanCatCanvas.getContext("2d")
}

NyanCat.prototype.draw = function(){
  this.context.drawImage(this.img,-COMPENSATE,-COMPENSATE,SPRITEDIMENSION,SPRITEDIMENSION)
}

NyanCat.prototype.clearScreen = function(){
  this.context.clearRect(-100,-100,1000,1000)
}

NyanCat.prototype.move = function(x, y){
  this.clearScreen() 
  this.context.translate(x,0)
  this.draw()
  drawLine(x,y) // Why is this function drawing a line...? A draw line controller should probably run this line..
}

NyanCat.prototype.rotate = function(degrees, pathContext){
  this.clearScreen()
  this.context.rotate(degrees*Math.PI/180.0)
  pathContext.rotate(degrees*Math.PI/180.0)
  this.draw()
}
