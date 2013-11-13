$(document).ready(function(){
  var applicationController = new ApplicationController()

  var PathCanvas = document.getElementById('path-canvas')
  var SpriteCanvas = document.getElementById('sprite-canvas')
  container = $('.canvas-container')

  PathCanvas.height = container.height()
  PathCanvas.width = container.width()
  SpriteCanvas.height = container.height()
  SpriteCanvas.width = container.width()

  applicationController.initializeGame()
})



