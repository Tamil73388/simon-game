//random number generator 0-4
var buttonColours=["red", "blue", "green", "yellow"];
var gamePattern=[]
var userClickedPattern=[]

function   nextSequence() {
    userClickedPattern=[];
    level++;
    $("#level-title").text("level "+level);
    var randomNumber=Math.floor(Math.random()*4);
    //chose a color in buttonColors variable
    var randomChosenColour=buttonColours[randomNumber];
    //this line of code will use to color stored in gamepattern
    gamePattern.push(randomChosenColour);
    console.log(gamePattern)
    console.log(userClickedPattern)

    //color choosen randomly will blink and play sound
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
   playSound(randomChosenColour);
}
//click tracker and store the value 
$(".btn").click(function () { 
   var userChosenColour=$(this).attr("id");
   userClickedPattern.push(userChosenColour);
   
   playSound(userChosenColour);
   animatePress(userChosenColour)
   checkAnswer(userClickedPattern.length-1)
   
});
//sound generator
function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3")
    audio.play();

}
//animation generator
function animatePress(pressed){
    $("#"+pressed).addClass("pressed");
    setTimeout(() => {
        $("#"+pressed).removeClass("pressed");
    }, 100);
}
//level checker
var level= "0";

//game start fucntion start
started=false;

$(document).keypress(function () { 
    if(!started){
    $("#level-title").text("level "+level);
    nextSequence()
    started=true;
    }
});

//game start fucntion end


function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(() => {
            nextSequence();
            }, 1000);
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        setTimeout(function () {
            $("body").removeClass("game-over");
          }, 200);
    
          startOver();
    }

}

function startOver(){
    level = 0;
  gamePattern = [];
  started = false;
}