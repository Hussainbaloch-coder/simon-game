var buttonColors = ["red","blue","green","yellow"];
var gamePattern =[];
var userClickedPattern = [];
var started = false;
var level = 0;

function nextSequence(){
  userClickedPattern=[];
  var randomNumber = Math.floor(Math.random()*4);
  var randomChoosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChoosenColor);
  $("#"+randomChoosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  makeSounds(randomChoosenColor);
  level++;
  $("#level-title").text("level"+" "+level);
}

$(".btn").click(function(){
  var userChosenColour= $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  makeSounds(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);

});
$(document).keypress(function(){
  if(!started){
    $("#level-title").text("level"+" "+level);
  nextSequence();
  started = true;
}
});
function makeSounds(color){
  var audio = new Audio("sounds/"+color+".mp3");
  audio.play();
}
function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed")
  },100);
}
function checkAnswer(currentlevel){
if(userClickedPattern[currentlevel]==gamePattern[currentlevel])
{

  if(userClickedPattern.length===gamePattern.length){
  setTimeout(function(){
    nextSequence();
  },1000);
  }
}
else{
var audio = new Audio("sounds/wrong.mp3");
audio.play();
$("body").addClass("game-over");
setTimeout(function(){$("body").removeClass("game-over")},200);
$("#level-title").text("Game over , press any key to restart");
startOver();
}


}
function startOver(){
  level = 0;
  started = false;
  gamePattern=[];
}
