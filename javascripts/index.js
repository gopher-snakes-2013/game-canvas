$(document).ready(function(){
  var $img = $('.sprite-img')
  $img.on("load", function(e) {

    insertInitialCommand = function(DEFAULTINTEXTBOX) {
      $('#textbox').val(DEFAULTINTEXTBOX)
    }

    DEFAULTINTEXTBOX = "forward 5"
    insertInitialCommand(DEFAULTINTEXTBOX)

    var applicationController = new ApplicationController()

    var PathCanvas = document.getElementById('path-canvas')
    var SpriteCanvas = document.getElementById('sprite-canvas')
    var GridCanvas = document.getElementById('grid-canvas')
    container = $('.canvas-container')

    PathCanvas.height = container.height()
    PathCanvas.width = container.width()
    SpriteCanvas.height = container.height()
    SpriteCanvas.width = container.width()
    GridCanvas.height = container.height()
    GridCanvas.width = container.width()

    applicationController.initializeGame()
  });
})
