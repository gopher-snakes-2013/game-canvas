var Grid = function(color){
  this.canvas = document.getElementById('grid-canvas')
  this.lineColor = color
  this.context = this.prepareContext()
}

Grid.prototype.prepareContext = function(){
  return this.canvas.getContext("2d")
}

Grid.prototype.drawLine = function(x,y){
  this.context.beginPath()
  this.context.moveTo(0, 0)
  this.context.lineTo(x, y)
  this.context.translate(x,y)
  this.context.strokeStyle = this.lineColor
  this.context.closePath()
  this.context.stroke()
}

Grid.prototype.rotate = function(degrees) {
  this.context.rotate(degrees*Math.PI/180.0)
}

Grid.prototype.makeGridLines = function(){

}
