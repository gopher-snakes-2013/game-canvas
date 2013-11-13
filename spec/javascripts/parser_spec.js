describe ("Parser", function() {

  var parser = new Parser()

  describe ("Parser.prototype.parseGivenCode()", function(){
    it ('should store the command into an object literal', function(){
      var sampleRepeatCommand = '(forward 5, rotate 90) repeat 4'
      expect(parser.parseGivenCode(sampleRepeatCommand).command).toEqual('forward 5, rotate 90')
    })

    it ('should store the multiplier into an object literal', function(){
      var sampleRepeatCommand = '(forward 5, rotate 90) repeat 4'
      expect(parser.parseGivenCode(sampleRepeatCommand).multiplier).toEqual(4)
    })

    it ('should update parser.currentLoopMultiplier with repeat value', function(){
      var sampleRepeatCommand = '(forward 5, rotate 90) repeat 4'
      parser.parseGivenCode(sampleRepeatCommand)
      expect(parser.currentLoopMultiplier).toEqual(4)
    })
  })

  describe ("Parser.prototype.checkIfLoopCommandExists()", function(){
    it ('should return true if the command contains the word "repeat"'), function(){
      var sampleRepeatCommand = 'forward 5, rotate 90) repeat 4'
      expect(parser.checkIfLoopCommandExists(sampleRepeatCommand)).toBeTruthy()
    }

    it ('should return true if the command contains the word "repeat"'), function(){
      var sampleCommandChain = 'forward 7, rotate 45'
      expect(parser.checkIfLoopCommandExists(sampleUserCommand)).toBeFalsy()
    }
  })

  describe ('Parser.prototype.extractActionAndMagnitude()', function(){
    it ('should separate the action and the magnitude'), function() {
      var sampleCommand = 'forward 7'
      var actionMagnitudePairArray = parser.extractActionAndMagnitude(sampleCommand)
      expect(actionMagnitudePairArray[0].action).toEqual('forward')
      expect(actionMagnitudePairArray[0].magnitudeOfAction).toEqual(7)
    }

    it ('should separate chained commands into object literals within an Array'), function(){
      var sampleCommandChain = 'backward 20, rotate 60, spin'
      var actionMagnitudePairArray = parser.extractActionAndMagnitude(sampleCommandChain)
      expect(actionMagnitudePairArray[0].action).toEqual('backward')
      expect(actionMagnitudePairArray[0].magnitudeOfAction).toEqual(20)
      expect(actionMagnitudePairArray[1].action).toEqual('rotate')
      expect(actionMagnitudePairArray[1].magnitudeOfAction).toEqual(60)
      expect(actionMagnitudePairArray[2].action).toEqual('spin')
      expect(actionMagnitudePairArray[2].magnitudeOfAction).toEqual(NaN)
    }
  })
})

