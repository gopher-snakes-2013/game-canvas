var Timer = function() {
  this.stop();
}
Timer.prototype = {
  start: function() {
    this.startTime = (new Date()).getTime();
    this.started = true;
  },

  elapsed: function() {
    if (this.started) {
      var endTime = (new Date()).getTime();
      return endTime - this.startTime;
    } else {
      console.log("ERROR: you must call start() first");
    }
  },

  logElapsed: function() {
    console.log("elapsed time=" + this.elapsed() + "ms");
  },

  stop: function() {
    this.started = false;
    this.startTime = 0;
  }
}
