var CommandLog = function() {
  this.list = $('.list-of-commands')
}

CommandLog.prototype.update = function(lastCommand){
  this.list.append('<li>' + lastCommand + '</li>')
  this.list[0].scrollTop = this.list[0].scrollHeight
  $('#textbox').val('')
}

