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
console.log("i'm in the cheatCode")
    this.draw(x, -0.3, 0, 4, 'red')
    this.draw(x, -0.2, 0, 4, 'orange')
    this.draw(x, -0.1, 0, 4, 'yellow')
    this.draw(x, 0, 0, 4, 'green')
    this.draw(x, 0.1, 0, 4, 'blue')
    this.draw(x, 0.2, 0, 4, 'indigo')
    this.draw(x, 0.3, 0, 4, 'purple')

  } else {
    this.draw(x, 0, 0, this.lineWidth, this.lineColor)
  }
}

Path.prototype.draw = function(x, startY, endY, lineWidth, lineColor){
  this.context.beginPath()
  this.context.moveTo(0, startY)
  this.context.lineTo(this.width*x, endY)
  this.context.lineWidth = lineWidth
  this.context.strokeStyle = lineColor
  this.context.closePath()
  this.context.stroke()
  this.translate(x)
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