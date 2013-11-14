var CommandLog = function() {
  this.logArea = $('.list-of-commands')
}

CommandLog.prototype.update = function(lastCommand){
  this.logArea.append('<li>' + lastCommand + '</li>')
  $('#textbox').val('')
}

CommandLog.prototype.retrieveCurrentLogs = function() {
  return $('.list-of-commands li')
}

