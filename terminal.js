var Terminal = function(){
  this.focus = this.initializeFocusOnTextBox()
  this.textbox = $('#textbox')
  this.commandListIndex = 1
  this.priorCommands = ['']  
}

Terminal.prototype.initializeFocusOnTextBox = function() {
  $('#textbox').focus()
}

Terminal.prototype.enableListeners = function(){
  $('#textbox').on('keydown', this.traversePriorCommands)
  $('#textbox').on('change', this.adustTextBoxSize)

}

Terminal.prototype.adjustTextBoxSize = function() {
  var currentInputLength = $('#textbox').val().length
  if (currentInputLength === 15) {
    $('#textbox').css('width', '300')
  }
  if (currentInputLength === 30) {
    $('#textbox').css('width', '500')
  } 
}

Terminal.prototype.traversePriorCommands = function(event) {
  if (event.keyCode == 38) {
    $('#textbox').val('' + priorCommands[priorCommands.length-commandListIndex]) //array[0]
    if (commandListIndex < priorCommands.length) {
      commandListIndex++
    }
  }
  if (event.keyCode == 40) {
    if (commandListIndex > 1 ) {
      commandListIndex--
    }
    $('#textbox').val('' + priorCommands[priorCommands.length-commandListIndex])   
  }
}

Terminal.prototype.addCommandToCompilation = function(userCommand) {
  this.priorCommands.push(userCommand)
}
