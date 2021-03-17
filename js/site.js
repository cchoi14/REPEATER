// fades in everything
$(document).ready(function(){
  $("#previewTitle h1").fadeIn(3000);
  descriptLoad();
  buttonLoad();
});

//loads site description
function descriptLoad(){
  setTimeout(function() {
    $("#description").fadeIn(3000);
  },2000);
}

// loads button
function buttonLoad(){
  setTimeout(function() {
    $("#previewButton").fadeIn(1500);
  },4000);
}

// what happens when you click on continue
$('#previewButton').click(function() {
  // fades out and loads index.html
  $('#preview').fadeOut(1000, function() {
    $('#preview').style('display: none');
  });
  setTimeout(function() {
      $('#content').fadeIn(2000);
  },2000)
})

// variable declarations
var intervalNum;
var interval;
var sound;

// this function takes an input in BPM and converts it to miliseconds
function BPMToMS(BPM) {
  return (60000 / BPM);
}

// this function takes an input in seconds and converts it to miliseconds
function secondsToMS(seconds) {
  return (seconds * 1000);
}

function start() {
  // grabs interval and checks if it is a number. if not, ends function and alerts user.
  var temp = $('#intervalNum').val();
  if ( temp == 0 || isNaN(temp) ) {
      window.alert("Please enter a number for the interval.");
      return false;
  }

  // checks if selector is at BPM or seconds then converts to miliseconds
  if ( $('#intervalType').val() == "BPM" ) {
    intervalNum = BPMToMS(temp);
  } else if ( $('#intervalType').val() == "seconds" ) {
    intervalNum = secondsToMS(temp);
  }

  // reads user sound selection from menu
  if ( $('#soundPick').val() == 'sound1' ) {
    sound = new Audio('./sounds/sound1.wav');
  } else if ( $('#soundPick').val() == 'sound2' ) {
    sound = new Audio('./sounds/sound2.wav');
  } else if ( $('#soundPick').val() == 'sound3' ) {
    sound = new Audio('./sounds/sound3.wav');
  } else if ( $('#soundPick').val() == 'sound4' ) {
    sound = new Audio('./sounds/Sound4.wav');
  } else if ( $('#soundPick').val() == 'sound5' ) {
    sound = new Audio('./sounds/Sound5.wav');
  } else if ( $('#soundPick').val() == 'sound6' ) {
    sound = new Audio('./sounds/Sound6.wav');
  } else if ( $('#soundPick').val() == 'sound7' ) {
    sound = new Audio('./sounds/Sound7.mp3');
  }

  // starts playing the repeating sound at interval
  if (interval) {
    stop();
  }
  interval = setInterval(function() {
    sound.play()
  }, intervalNum);
}

function stop() {
  // stops the interval
  clearInterval(interval);
}

$("#start").click(function() {
  start();
})
$("#stop").click(function() {
  stop();
})
