var Path = function(color, canvasId, widthAspectRatio, heightAspectRatio) {
  this.canvas = document.getElementById(canvasId)
  this.widthAspectRatio = widthAspectRatio
  this.heightAspectRatio = heightAspectRatio
  this.lineColor = color
  this.lineWidth = 5
  this.context = this.prepareContext()
  this.width = this.gridWidth()
  this.height = this.gridHeight()
  this.cheatCode = false
}

Path.prototype.prepareContext = function(){
  return this.canvas.getContext("2d")
}

Path.prototype.drawLine = function(x){
  if (this.cheatCode){
    this.draw(x, -15, 6, 'rgb(248, 0, 0)' )
    this.draw(x, -9,  6, 'rgb(250, 129, 0)')
    this.draw(x, -3,  6,  'rgb(255, 255, 0)')
    this.draw(x, 3,  6, 'rgb(48, 255, 52)')
    this.draw(x, 9,  6, 'rgb(8, 40, 255)')
    this.draw(x, 15,  6, 'rgb(110, 0, 255)')
    this.translate(x)
  } else {
    this.draw(x, 0, this.lineWidth, this.lineColor)
    this.translate(x)
  }
}

Path.prototype.draw = function(x, Y, lineWidth, lineColor){
  this.context.beginPath()
  this.context.moveTo(0, Y)
  this.context.lineTo(this.width*x, Y)
  this.context.lineWidth = lineWidth
  this.context.strokeStyle = lineColor
  this.context.closePath()
  this.context.stroke()
}

Path.prototype.clearScreen = function(){
  this.context.clearRect(-100,-100,1000,1000)
}

Path.prototype.rotate = function(degrees) {
  this.context.rotate(degrees*Math.PI/180.0)
}

Path.prototype.translate = function(x){
  this.context.translate(this.width*x, 0)
}

Path.prototype.gridWidth = function() {
  return this.canvas.width / this.widthAspectRatio
  }

Path.prototype.gridHeight = function() {
  return this.canvas.height / this.heightAspectRatio
}

Path.prototype.nyanCat = function () {
  this.cheatCode = true
}