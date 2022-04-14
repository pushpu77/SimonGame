
var gamePattern=[];
var colors=["red","blue","green","yellow"];
var userChosenColor=[];
var level=0;
var started=false;


$("body").keypress(function(){
  if(!started){
    $("#level-title").text("Level "+level);
    nextSequence();
    started=true;
  }
});


$(".btn").click(function(){
  var chosenColor=$(this).attr("id");
  userChosenColor.push(chosenColor);
  //console.log(userChosenColor);
  playSound(chosenColor);
  animatePress(chosenColor);
  checkAnswer(userChosenColor.length-1);
});



function checkAnswer(currentLevel){
  if(userChosenColor[currentLevel]===gamePattern[currentLevel])
  {
    console.log("Success!!");
    if(userChosenColor.length===gamePattern.length){
      setTimeout(function(){
        nextSequence();
      },1000);
    }

  }
  else{
    console.log("Wrong!!");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
    $("body").removeClass("game-over");
    },200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
    }
  }



function nextSequence()
{
  userChosenColor=[];
  level++;
  $("#level-title").text("Level "+level);
  var randomNumber=Math.floor(Math.random()*4);
  var randomColor=colors[randomNumber];
  gamePattern.push(randomColor);
  $("#"+randomColor).fadeOut(100).fadeIn(100);
  playSound(randomColor);
}



function playSound(name){
  var audio=new Audio(name+".mp3");
  audio.play();
}


function animatePress(currentColor){
  $("."+currentColor).addClass("pressed");
  setTimeout(function(){
    $("."+currentColor).removeClass("pressed");
  }
  ,100);
}


function startOver()
{
   gamePattern=[];
   level=0;
   started=false;
}
