/**
  * Authors: Tristan Dunlop <tdunlop@ucsc.edu>
  * Created:   12 Mar. 2021
  * License:   Public Domain
 **/

// fades in everything
$(document).ready(function(){
  $("#title").fadeIn(3000);
  descriptLoad();
  buttonLoad();
});

//loads site description
function descriptLoad(){
  setTimeout(function() {
    $("#description").fadeIn(3000);
  },1000);
}

// loads button
function buttonLoad(){
  setTimeout(function() {
    $(".button").fadeIn(1500);
  },4000);
}

// what happens when you click on continue
$('.button').click(function(event) {
  event.preventDefault();
  // fades out and loads index.html
  $('body').fadeOut(1000, function(){
    window.location.href='index.html';
  });
});
