var Parser = function (){
  this.currentLoopMultiplier = 1
}

Parser.prototype.parseGivenCode = function(userCommand) {
  if (this.checkIfLoopCommandExists(userCommand) === true){
    intermediaryData = userCommand.split(' repeat ')
    var userCommandChain = intermediaryData[0].slice(1,-1)
    var loopMultiplier = Number(intermediaryData[1])
    this.currentLoopMultiplier = loopMultiplier
  }
  return {command: userCommandChain, multiplier: loopMultiplier}
}

Parser.prototype.checkIfLoopCommandExists = function(command){
  if (command.indexOf("repeat") >= 0){
    return true
  } else {
    return false
  }
}

Parser.prototype.extractActionAndMagnitude = function(userCommand) {
  var individualCommands = userCommand.split(', ')
  var actionMagnitudeArray = []
  individualCommands.forEach(function(command) {
    actionMagnitudeArray.push({action: command.split(' ')[0],
    magnitudeOfAction: Number(command.split(' ')[1])})
  })
  return actionMagnitudeArray
}
