var Path = function(color) {
  this.canvas = document.getElementById('path-canvas')
  this.context = this.canvas.getContext("2d")
  this.lineColor = color
}


Path.prototype.drawLine = function(sprite,x,y){
  this.context.moveTo(sprite.currentX, sprite.currentY)
  this.context.lineTo(x, y)
  this.context.translate(x,y)
  this.context.strokeStyle = this.lineColor
  this.context.stroke()
}
