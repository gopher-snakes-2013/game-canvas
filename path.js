var Path = function(color) {
  this.canvas = document.getElementById('path-canvas')
  this.lineColor = color
  this.context = this.prepareContext()
}

Path.prototype.prepareContext = function(){
  return this.canvas.getContext("2d")
}

Path.prototype.drawLine = function(x,y){
  this.context.moveTo(0, 0)
  this.context.lineTo(x, y)
  this.context.translate(x,y)
  this.context.strokeStyle = this.lineColor
  this.context.lineWidth=5
  this.context.stroke()
}

Path.prototype.rotate = function(degrees) {
  this.context.rotate(degrees*Math.PI/180.0)
}
