var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var keyPressed = false;

$(document).keydown(function() {
    if (!keyPressed) {
        nextSequence();
        $("#level-title").text("Level 0"); 
        keyPressed = true;
    }
});

function nextSequence() {
    level++;
    $("#level-title").text("Level " + level); 
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut().fadeIn();
    playSound(randomChosenColour);
}

function playSound(color) {
    var audio = new Audio("sounds/" + color + ".mp3");
    audio.play();
}

$(".btn").click(function() {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePressed(userChosenColor);
    var lastIndex = userClickedPattern.length - 1;
    checkAnswer(lastIndex);
});

function animatePressed(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
        if (userClickedPattern.length == gamePattern.length) {
            setTimeout(function() {
                nextSequence();
                userClickedPattern = [];
            }, 1000);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over"); 
        startOver();
        $("h1").text("Game Over, Press Any Key To Restart");
        setTimeout(function() {
            $("body").removeClass("game-over"); 
        }, 200);
    }
}

function startOver(){
 level=0;
 gamePattern=[];
 keyPressed=false;
 userClickedPattern=[];
}
