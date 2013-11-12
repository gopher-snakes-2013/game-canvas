var ResizeController = function(arrayCanvasDomIds){
  this.HTMLCanvases = this.grabCanvasFromDom(arrayCanvasDomIds)
}

ResizeController.prototype.grabCanvasFromDom = function(arrayCanvasDomIds){
  arrayOfHTMLCanvases = []
  arrayCanvasDomIds.forEach(function(canvasId){
    arrayOfHTMLCanvases.push(document.getElementById(canvasId))
  })
  return arrayOfHTMLCanvases
}

ResizeController.prototype.updateDimensions = function(canvasContainer){
  self = this
  this.HTMLCanvases.forEach(function(HTMLCanvas){
    HTMLCanvas.width = canvasContainer.width()
    HTMLCanvas.height = canvasContainer.height()
  })
}