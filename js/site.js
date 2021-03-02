// this function takes an input in BPM and converts it to miliseconds
function BPMToMS(BPM) {
  return (60000 / BPM);
}

// this function takes an input in seconds and converts it to miliseconds
function secondsToMS(seconds) {
  return (seconds * 1000);
}

// this function takes a milisecond interval and plays the looping sound
function metronome(ms, sound) {
  return setInterval(sound.play(), ms);
}

// this function checks if the user input is actually a number
// alerts user if it is not a number and returns false to stop the rest of the
// functions from being called
function validateNum(tag) {
  if ( $("#" + tag).value().isNaN() ) {
    window.alert(tag + "is not a number!");
    return false;
  }
  return true;
}

function start() {
  // validateNum();
  // BPMToMS() or secondsToMS()
  // return metronome()
}

function stop() {
  // clearInterval(metronome);
}

BPMToMS(160);
secondsToMS(2.7);

debugger;

metronome(BPMToMS(120), beep);

debugger;
