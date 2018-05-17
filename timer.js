var status = 0;
var time = 0

function start() {
	status = 1;
	timer();
	//start timer upon first click
	document.getElementById("").disabled = true;
}

function stop() {
	status = 0;
	//stop timer upon game completion
	document.getElementById("").disabled = false;
}

function timer() {
	if(status == 1) {
		setTimer(function(){
			time++;
			var mins = Math.floor(time/10/60);
			var secs = Math.floor(time/10);
			var mSecs = time % 10;

			if(mins < 10) {
				mins = "0" + mins;
				
			}
			if(secs >= 60) {
				secs = secs % 60;
			}

			document.getElementById("stopwatch").innerHTML = mins + ":" + secs + ":" +
			"0" + mSecs;
			timer();
		}, 100);
	}
}