/**
 * Authors: Tristan Dunlop <tdunlop@ucsc.edu>
 *          Johnny Choi <cchoi14@ucsc.edu>
 * Created:   21 Feb. 2021
 * License:   Public Domain
 **/
// duration obtainer functionality obtained from
// https://ourcodeworld.com/articles/read/1036/how-to-retrieve-the-duration-of-a-mp3-wav-audio-file-in-the-browser-with-javascript
// file validation knowledge obtained from
// https://www.geeksforgeeks.org/file-type-validation-while-uploading-it-using-javascript/

// Add a change event listener to the file input
document.getElementById("fileInput").addEventListener('change', function() {

  // Obtain the uploaded file, you can change the logic if you are working with multiupload
  var file = this.files[0];

  // Create instance of FileReader
  var reader = new FileReader();

  // When the file has been succesfully read
  reader.onload = function(event) {

    // Create an instance of AudioContext
    var audioContext = new(window.AudioContext || window.webkitAudioContext)();

    // Asynchronously decode audio file data contained in an ArrayBuffer.
    audioContext.decodeAudioData(event.target.result, function(buffer) {
      // Obtain the duration in seconds of the audio file (with milliseconds as well, a float value)
      var duration = buffer.duration;

      // example 12.3234 seconds
      console.log("The duration of the song is of: " + duration + " seconds");
      // Alternatively, just display the integer value with
      // parseInt(duration)

      // In case file is of wrong duration
      if (duration > 5) {
        window.alert("Please upload an audio file that is no longer than 5 seconds");
        fileInput.value = '';
        return false;
      } else {
        fileValidation();
      }
    });
  };

  // In case that the file couldn't be read
  reader.onerror = function(event) {
    console.error("An error ocurred reading the file: ", event);
  };

  // Read file as an ArrayBuffer, important !
  reader.readAsArrayBuffer(file);
}, false);

// this function checks the type of the uploaded file
function fileValidation() {
  var fileInput = document.getElementById('fileInput');

  var filePath = fileInput.value;

  // Allowing file type
  var allowedExtensions = /(\.mp3|\.wav)$/i;

  // error message printed if invalid type
  // .exec tests for a match in filePath
  if (!allowedExtensions.exec(filePath)) {
    window.alert('Invalid file type - please upload an .mp3 or .wav file');
    fileInput.value = '';
    return false;
  } else {
    //
    $("#playBack").css("visibility", "visible");
  }
}

// this function plays back the file if button is pressed
$("#playBack").click(function() {
  var files = fileInput.files;
  var file = URL.createObjectURL(files[0]);
  audio_player.src = file;
  audio_player.play();
})

// fades in everything
$(document).ready(function() {
  $("#previewTitle h1").fadeIn(3000);
  descriptLoad();
  buttonLoad();
});

//loads site description
function descriptLoad() {
  setTimeout(function() {
    $("#description").fadeIn(3000);
  }, 2000);
}

// loads button
function buttonLoad() {
  setTimeout(function() {
    $("#previewButton").fadeIn(1500);
  }, 4000);
}

// what happens when you click on continue
$('#previewButton').click(function() {
  // fades out and loads index.html
  $('#preview').fadeOut(1000, function() {
    $('#preview').css('display: none');
  });
  setTimeout(function() {
    $('#content').fadeIn(2000);
  }, 2000)
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
  if (temp == 0 || isNaN(temp)) {
    window.alert("Please enter a number for the interval.");
    return false;
  }

  // checks if selector is at BPM or seconds then converts to miliseconds
  if ($('#intervalType').val() == "BPM") {
    intervalNum = BPMToMS(temp);
  } else if ($('#intervalType').val() == "seconds") {
    intervalNum = secondsToMS(temp);
  }

  // reads user sound selection from menu
  if ( $('#fileInput').val() != false ) {
    sound = audio_player;
  } else if ($('#soundPick').val() == 'sound1') {
    sound = new Audio('./sounds/sound1.wav');
  } else if ($('#soundPick').val() == 'sound2') {
    sound = new Audio('./sounds/sound2.wav');
  } else if ($('#soundPick').val() == 'sound3') {
    sound = new Audio('./sounds/sound3.wav');
  } else if ($('#soundPick').val() == 'sound4') {
    sound = new Audio('./sounds/Sound4.wav');
  } else if ($('#soundPick').val() == 'sound5') {
    sound = new Audio('./sounds/Sound5.wav');
  } else if ($('#soundPick').val() == 'sound6') {
    sound = new Audio('./sounds/Sound6.wav');
  } else if ($('#soundPick').val() == 'sound7') {
    sound = new Audio('./sounds/Sound7.mp3');
  }

  // starts playing the repeating sound at interval
  if (interval) {
    stop();
  }
  var animation = document.getElementById("video1");
  interval = setInterval(function() {
    // "stops" then plays sound and audio
    sound.pause();
    sound.currentTime = 0;
    sound.play();
    animation.pause();
    animation.currentTime = 0;
    animation.play();
  }, intervalNum);
}

function stop() {
  // stops the interval
  clearInterval(interval);
}

// adding start() and stop() to their respective buttons
$(".start").click(function() {
  start();
})
$(".stop").click(function() {
  stop();
})

// giving the animation change drop-down menu it's functionality
$("#animation").change(function() {
  var selection = $("#animation").val();
  if ( selection == "animation1") {
    $("#video1").attr({'src' : 'img/blue.webm'});
  } else if ( selection == "animation2") {
    $("#video1").attr({'src' : 'img/red.webm'});
  } else if ( selection == "animation3") {
    $("#video1").attr({'src' : 'img/red-1.webm'});
  } else if ( selection == "animation4") {
    $("#video1").attr({'src' : 'img/red-2.webm'});
  }
})
