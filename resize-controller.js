var ResizeController = function(arrayCanvasDomIds){
  this.HTMLCanvases = this.grabCanvasFromDom(arrayCanvasDomIds)
  // this.canvasContainer = $('.canvas-container')
}

// ResizeController.prototype.enableDynamicCanvas = function(){
//   this.initializeWindowListener()
// }

ResizeController.prototype.grabCanvasFromDom = function(arrayCanvasDomIds){
  arrayOfHTMLCanvases = []
  arrayCanvasDomIds.forEach(function(canvasId){
    arrayOfHTMLCanvases.push(document.getElementById(canvasId))
  })
  return arrayOfHTMLCanvases
}

// ResizeController.prototype.initializeWindowListener = function(){
//   self = this
//   $(window).on('resize', function(){
//     self.updateDimensions(self.canvasContainer)
//   })
//   // $(window).on('resize', self.updateDimensions)
// }

ResizeController.prototype.updateDimensions = function(canvasContainer){
  self = this
  this.HTMLCanvases.forEach(function(HTMLCanvas){
    HTMLCanvas.width = canvasContainer.width()
    HTMLCanvas.height = canvasContainer.height()
  })
}