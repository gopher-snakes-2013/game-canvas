var Sprite = function(avatar){
  this.canvas = document.getElementById('sprite-canvas')
  this.img = new Image()
  this.img.src = avatar
  this.context = this.prepareContext()
  this.dimension = 40
  this.offset = this.dimension/2
  this.width = this.gridWidth()
  this.height = this.gridHeight()
}

Sprite.prototype.prepareContext = function() {
  return this.canvas.getContext("2d")
}

Sprite.prototype.draw = function(){
  this.context.drawImage(this.img,-this.offset,-this.offset,this.dimension,this.dimension)
}

Sprite.prototype.clearScreen = function(){
  this.context.clearRect(-100,-100,1000,1000)
}

Sprite.prototype.move = function(x, y){
  this.clearScreen()
  this.context.translate(this.width*x,0)
  this.draw()
}

Sprite.prototype.rotate = function(degrees){
  this.clearScreen()
  this.context.rotate(degrees*Math.PI/180.0)
  this.draw()
}

Sprite.prototype.gridWidth = function() {
  return this.canvas.width / 64;
  }

Sprite.prototype.gridHeight = function() {
  return this.canvas.height / 36;
}
