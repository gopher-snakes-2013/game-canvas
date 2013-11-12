var DottedLine = function (){
  this.canvas = document.getElementById('dotted-line-canvas')
  this.lineColor = "blue"
  this.context = this.prepareContext()
}

DottedLine.prototype.prepareContext = function(){
  return this.canvas.getContext('2d')
}

DottedLine.prototype.drawLine = function(x,y){
  this.context.moveTo(0,0)
  this.context.lineTo(x,y)
  this.context.strokeStyle = this.lineColor
  this.context.setLineDash([5])
  this.context.stroke()
}

DottedLine.prototype.translateAxis = function(x,y){
  this.context.translate(x,y)
}

DottedLine.prototype.rotateAxis = function(degrees){
  this.context.translate(degrees*Math.PI/180.0)
}