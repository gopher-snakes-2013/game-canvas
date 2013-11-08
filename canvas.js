$(document).ready(function(){

  var c_canvas = document.getElementById("c");
  var context = c_canvas.getContext("2d");
  var my_gradient=context.createLinearGradient(0,0,0,170);
  var turtleX=50
  var turtleY=50


  makeGrid = function(){
    for (var x = 0.5; x < 1000; x += 50) {
      context.moveTo(x, 0);
      context.lineTo(x, 1000);
    }
    for (var y = 0.5; y < 1000; y += 50) {
      context.moveTo(0, y);
      context.lineTo(1000, y);
    }
    context.strokeStyle = "#eee";
    context.stroke();
  };

  makeTurtle = function(){
    my_gradient.addColorStop(0,"red");
    my_gradient.addColorStop(1,"white");
    context.fillStyle=my_gradient;
     // upper-left corner (50, 50), width (50), height (50).
    context.fillRect(turtleX, turtleY, 50, 50);
  };

  drawLine = function(){
    context.moveTo

  };

  resetCanvas = function(){
    c_canvas.width = c_canvas.width;
  };

  makeGrid();
  makeTurtle();

  console.log("Hello")

});
