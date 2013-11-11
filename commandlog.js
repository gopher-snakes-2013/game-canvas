var CommandLog = function() {
  this.list = $('.command-log ul')
}

CommandLog.prototype.update = function(lastCommand){
  this.list.append('<li>' + lastCommand + '</li>')
  $('#textbox').val('')  
}

