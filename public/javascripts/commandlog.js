var CommandLog = function() {
  this.list = $('.list-of-commands')
}

CommandLog.prototype.update = function(lastCommand){
  this.list.append('<li>' + lastCommand + '</li>')
  $('#textbox').val('')  
}

