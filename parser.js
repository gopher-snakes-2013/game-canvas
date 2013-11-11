


function parseGivenCode(userCommand) {
  terminal.commandListIndex = 1
  var currentLoopMultiplier = 1
  if (checkIfLoopCommandExists(userCommand) === true){
    var commandChainMultiplierPair = separateCommandFromMultiplier(userCommand)
    var userCommand = commandChainMultiplierPair.commandChain
    currentLoopMultiplier = commandChainMultiplierPair.loopMultiplier
  } 
  for (var i=0; i<currentLoopMultiplier; i++){
    performCommandsGiven(userCommand)
  }
}


function checkIfLoopCommandExists(command){
  if (command.indexOf("repeat") >= 0){
    return true
  } else {
    return false
  }
}

function separateCommandFromMultiplier(loopCommand){
  intermediaryData = loopCommand.split(' repeat ')
  return  {
    commandChain: intermediaryData[0].slice(1,-1),
    loopMultiplier: Number(intermediaryData[1])
  }
}
