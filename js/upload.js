/**
  * Authors: Tristan Dunlop <tdunlop@ucsc.edu>
  * Created:   21 Feb. 2021
  * License:   Public Domain
 **/
// duration obtainer functionality obtained from
// https://ourcodeworld.com/articles/read/1036/how-to-retrieve-the-duration-of-a-mp3-wav-audio-file-in-the-browser-with-javascript
// file validation knowledge obtained from
// https://www.geeksforgeeks.org/file-type-validation-while-uploading-it-using-javascript/

// Add a change event listener to the file input
document.getElementById("fileInput").addEventListener('change', function(){

   // Obtain the uploaded file, you can change the logic if you are working with multiupload
   var file = this.files[0];

   // Create instance of FileReader
   var reader = new FileReader();

   // When the file has been succesfully read
   reader.onload = function (event) {

       // Create an instance of AudioContext
       var audioContext = new (window.AudioContext || window.webkitAudioContext)();

       // Asynchronously decode audio file data contained in an ArrayBuffer.
       audioContext.decodeAudioData(event.target.result, function(buffer) {
           // Obtain the duration in seconds of the audio file (with milliseconds as well, a float value)
           var duration = buffer.duration;

           // example 12.3234 seconds
           console.log("The duration of the song is of: " + duration + " seconds");
           // Alternatively, just display the integer value with
           // parseInt(duration)

           // In case file is of wrong duration
           if (duration > 5){
             window.alert("Please upload an audio file that is no longer than 5 seconds");
             fileInput.value = '';
             return false;
          }else{
            fileValidation();
          }
       });
   };

   // In case that the file couldn't be read
   reader.onerror = function (event) {
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
            }else{
              //
              $("#playBack").css("visibility","visible");
            }
}    

// this function plays back the file if button is pressed
$("#playBack").click(function(){
  var files = fileInput.files;
  var file = URL.createObjectURL(files[0]);
  audio_player.src = file;
  audio_player.play();
})
