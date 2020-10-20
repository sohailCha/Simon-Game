
// four color to choose from
const buttonColours = ["red", "blue", "green", "yellow"];

// randomly generated pattern - initialised empty
var gamePattern = [];

// user pattern - empty when game starts
var userClickedPattern = [];

let started = false;
let level = 0;

// event listener on document to start the game
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);

    // calling next sequence to get new color
    nextSequence();
    started = true;
  } 
});

// checking which button is clicked
$(".btn").click(function() {


  const userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  // playing sound aacording to chosen color
  playSound(userChosenColour);
  
  //animate button according to user clicked button
  animatePress(userChosenColour);

  // checking game pattern with user clicked pattern
  checkAnswer(userClickedPattern.length-1);
});


function checkAnswer(currentLevel) {

  // checking if the answer matches with the pattern
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        // if answer is correct, call next sequence 
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {

      // if answer is wrong
      playSound("wrong");

      // adding class 'game-over'
      $("body").addClass("game-over");
      setTimeout(function () {
        // removing it after 0.3 sec
        $("body").removeClass("game-over");
      }, 300);

      // changing the title to game over
      $("#level-title").text("Game Over, Press Any Key to Restart");

      // start everything again
      startOver();
    }

}

function nextSequence() {

  userClickedPattern = [];
  // increase level no
  level++;
  $("#level-title").text("Level " + level);

  // generating a random number between 0 to 3
  var randomNumber = Math.floor(Math.random() * 4);
  // selecting a random color from array based on randomly generated number
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);


  // setting interval to show each and every sequence all over again for the user
  let i = 0;
  let moves = setInterval(function(){
    $("#" + gamePattern[i]).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
    i++;
    if (i >= gamePattern.length) {
      // when game pattern ends, we clear interval,otherwise it will keep shoqing the same sequence
      clearInterval(moves);
    }
  }, 600);

}

// to play sound
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// to show animation of click
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 150);
}

// clearing everything out
function startOver() {

  level = 0;
  gamePattern = [];
  started = false;
}
