var commandLog = { 
  letter: 'a'}


var CommandLog = function() {
  this.counter = 0
  this.list = $('.command-log ul')
}

CommandLog.prototype.update = function(lastCommand){
  if (++this.counter > MAXLOGLINES){
    this.list.find('li').eq(0).remove()
  }
  this.list.append('<li>' + lastCommand + '</li>')
  $('#textbox').val('')  
}

