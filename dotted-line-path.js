var DottedLine = function (){
  this.canvas = document.getElementById('dotted-line-canvas')
  this.lineColor = "#d3d3d3"
  this.context = this.prepareContext()
}

DottedLine.prototype.prepareContext = function(){
  return this.canvas.getContext('2d')
}

DottedLine.prototype.drawLine = function(){
  this.context.moveTo(0,0)
  this.context.lineTo(100,0)
  this.context.strokeStyle = this.lineColor
  this.context.setLineDash([5])
  this.context.stroke()
}

DottedLine.prototype.translateAxis = function(x,y){
  this.context.translate(x,y)
}

DottedLine.prototype.rotateAxis = function(degrees){
  this.context.rotate(degrees*Math.PI/180.0)
}

DottedLine.prototype.removeDottedLine = function(){
  this.context.clearRect(-100,-100,100,100)
}