var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;
document.addEventListener("keydown", function () {
    if (!started) {
        $("h1").text("Level" + level);
        nextSequence();
        started = true;
    }
});

$(".btn").on("click", function () {
    userClickedPattern.push($(this).attr("id"));

    playSound($(this).attr("id"));
    animatePress($(this).attr("id"));
    checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
    level += 1;
    $("h1").text("Level " + level);

    var randomNumber = (Math.floor(Math.random() * 4));
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(() => {
                userClickedPattern = [];
                nextSequence();
            }, 1000);
        }
    }
    else {
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        
        setTimeout(() => {
        $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}


function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(animatePress) {
    $("." + animatePress).addClass("pressed");
    setTimeout(() => {
        $("." + animatePress).removeClass("pressed");
    }, 100);
}
function startOver(){
    level=0;
    gamePattern=[];
    userClickedPattern=[];
    started=false;

    document.addEventListener("keydown", function () {
        if (!started) {
            $("h1").text("Level" + level);
            nextSequence();
            started = true;
        }
    });
}
console.log(gamePattern);
console.log(userClickedPattern);