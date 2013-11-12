var Terminal = function(){
  this.focus = this.initializeFocusOnTextBox()
  this.textbox = $('#textbox')
  this.commandListIndex = 1
  this.priorCommands = ['']
}

Terminal.prototype.initializeFocusOnTextBox = function() {
  $('#textbox').focus()
}

Terminal.prototype.initializeListeners = function(){
  var self = this
  $('#textbox').on('keydown', function(event){
    self.traversePriorCommands(event)
  })
  $('#textbox').on('keyup', self.adjustTextBoxSize)
}

Terminal.prototype.adjustTextBoxSize = function() {
  var currentInputLength = $('#textbox').val().length
  if (currentInputLength === 15) {
    $('#textbox').css('width', '500px')
  }
  if (currentInputLength === 30) {
    $('#textbox').css('width', '800px')
  }
}

Terminal.prototype.traversePriorCommands = function(event) {
  if (event.keyCode == 38) {
    $('#textbox').val('' + this.priorCommands[this.priorCommands.length-this.commandListIndex])
    if (this.commandListIndex < this.priorCommands.length) {
      this.commandListIndex++
    }
  }
  if (event.keyCode == 40) {
    if (this.commandListIndex > 1 ) {
      this.commandListIndex--
    }
    $('#textbox').val('' + this.priorCommands[this.priorCommands.length-this.commandListIndex])
  }
}

Terminal.prototype.addCommandToCompilation = function(userCommand) {
  this.priorCommands.push(userCommand)
}
