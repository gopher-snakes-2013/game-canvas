var Sprite = function(avatar){
  this.currentX=0
  this.currentY=0
  this.img = new Image()
  this.img.src = avatar
  this.context = this.prepareContext()
  this.dimension = 20
  this.offset = this.dimension/2
}

Sprite.prototype.prepareContext = function() {
  var SpriteCanvas = document.getElementById('sprite-canvas')
  return SpriteCanvas.getContext("2d")
}

Sprite.prototype.draw = function(){
  this.context.drawImage(this.img,-this.offset,-this.offset,this.dimension,this.dimension)
}

Sprite.prototype.clearScreen = function(){
  this.context.clearRect(-100,-100,1000,1000)
}

Sprite.prototype.move = function(x, y){
  this.clearScreen()
  this.context.translate(x,0)
  this.draw()
}

Sprite.prototype.rotate = function(degrees){
  this.clearScreen()
  this.context.rotate(degrees*Math.PI/180.0)
  this.draw()
}
