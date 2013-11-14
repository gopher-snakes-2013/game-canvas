var CommandLog = function() {
  this.logArea = $('.list-of-commands')
}

CommandLog.prototype.update = function(lastCommand){
  this.logArea.append('<li>' + lastCommand + '</li>')
  this.setCommandLogToBottom()
  this.emptyTextBox()
}

CommandLog.prototype.retrieveCurrentLogs = function() {
  return $('.list-of-commands li')
}

CommandLog.prototype.setCommandLogToBottom = function() {
  this.logArea[0].scrollTop = this.list[0].scrollHeight
}

CommandLog.prototype.emptyTextBox = function() {
  $('#textbox').val('')
}