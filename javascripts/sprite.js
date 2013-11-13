var Sprite = function(avatar, imgDimension, canvas, widthAspectRatio, heightAspectRatio){
  this.canvas = document.getElementById(canvas)
  this.widthAspectRatio = widthAspectRatio
  this.heightAspectRatio = heightAspectRatio
  this.img = new Image()
  this.img.src = avatar
  this.img.crossOrigin = "Anonymous"
  this.context = this.prepareContext()
  this.dimension = imgDimension
  this.offset = this.dimension/2
  this.width = this.gridWidth()
  this.height = this.gridHeight()
  this.savedCanvasData = []
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

Sprite.prototype.move = function(x){
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
  return this.canvas.width / this.widthAspectRatio;
}

Sprite.prototype.gridHeight = function() {
  return this.canvas.height / this.heightAspectRatio;
}
