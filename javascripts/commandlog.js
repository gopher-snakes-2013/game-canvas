var CommandLog = function() {
  this.logContainer = $('.list-of-commands')
}

CommandLog.prototype.update = function(lastCommand){
  this.logContainer.append('<li>' + lastCommand + '</li>')
  this.setCommandLogToBottom()
  this.emptyTextBox()
}

CommandLog.prototype.retrieveLogContainer = function(){
  return $('.list-of-commands')
}

CommandLog.prototype.retrieveCurrentLogs = function() {
  return $('.list-of-commands li')
}

CommandLog.prototype.setCommandLogToBottom = function() {
  this.logContainer[0].scrollTop = this.logContainer[0].scrollHeight
}

CommandLog.prototype.emptyTextBox = function() {
  $('#textbox').val('')
}