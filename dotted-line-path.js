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
  this.context.translate(x,y)
  this.context.strokeStyle = this.lineColor
  this.context.stroke()
}