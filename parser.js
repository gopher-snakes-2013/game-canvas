var Parser = function (){
  this.currentLoopMultiplier = 1
}

Parser.prototype.parseGivenCode = function(userCommand) {
  if (this.checkIfLoopCommandExists(userCommand) === true){
    var commandChainMultiplierPair = this.separateCommandFromMultiplier(userCommand)
    var userCommand = commandChainMultiplierPair.commandChain
    this.currentLoopMultiplier = commandChainMultiplierPair.loopMultiplier
  }   
  return {command: userCommand, multiplier: this.currentLoopMultiplier}
}

Parser.prototype.checkIfLoopCommandExists = function(command){
  if (command.indexOf("repeat") >= 0){
    return true
  } else {
    return false
  }
}

Parser.prototype.separateCommandFromMultiplier = function(loopCommand){
  intermediaryData = loopCommand.split(' repeat ')
  return  {
    commandChain: intermediaryData[0].slice(1,-1),
    loopMultiplier: Number(intermediaryData[1])
  }
}

Parser.prototype.extractActionAndMagnitude = function(userCommand) {
  var individualCommands = userCommand.split(', ') 
  var actionMagnitude = []
  individualCommands.forEach(function(command) {
    actionMagnitude.push({action: command.split(' ')[0],
    magnitudeOfAction: Number(command.split(' ')[1])})
  }) 
  return actionMagnitude
}
