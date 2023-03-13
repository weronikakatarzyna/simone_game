var buttonColors = ["red", "blue", "green", "yellow"]; // colors array
var gamePattern = []; //array with random chosen colors
var userClickedPattern = []; //array with users pattern
var started = false;
var level = 0;

//1. Use jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
$(document).keypress(function () {
  if (!started) {
    //3. The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function () {
  var userChosenColor = $(this).attr("id"); // save id clicked button
  userClickedPattern.push(userChosenColor); // push id to userclickedpattern
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("succes");

    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart!");
    startOver();
  }
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4); // choose random number
  var randomChosenColor = buttonColors[randomNumber]; // choose random color from buttonColors array
  gamePattern.push(randomChosenColor); //push random chosencolor to game pattern
  $("#" + randomChosenColor) // gives random chosen color fadein buuut id does not work
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColor);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3"); ///gives random chosen color sound
  audio.play();
}
function animatePress(currentColor) {
  // gives animation to pressed box
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 200);
}
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
