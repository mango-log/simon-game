var computerArray = []
var myArray = []
var stage = 0


//a 키를 누르면 게임 시작
$(document).keydown(function(e) {
  if (e.key === "a") {
    computerArray = [];
    stageUp();
  }
})


//스테이지 올리며 게임셋 만드는 함수
function stageUp() {
  stage++;
  myArray = [];
  $("h3").text("stage" + stage);
  $("body").css("background-color", "#183966");
  var randomNumber = Math.floor(Math.random() * 4);
  computerArray.push(randomNumber);
  animateCreate(randomNumber);
}


//버튼 클릭 시에 실행할 함수
$(".button").click(function() {
  var clickedColor = $(this).attr("id");
  var clickedId = colorToNumber(clickedColor);
  myArray.push(clickedId);
  animateCreate(clickedId);
  matchTest(myArray.length);
})

//해당 단계에 따라서, 게임셋과 유저가 클릭한 버튼 배열이 일치하는지 확인하여
//stage를 올릴지, gameover 처리할지 분기하는 함수
function matchTest(stage) {
  if (computerArray[stage-1] === myArray[stage-1]) {
    if (computerArray.length === myArray.length) {
      setTimeout(function() {
        stageUp();
      }, 1000);
    }
  } else {
    gameOver()
  }
}


//게임오버시 실행할 것들 - 주요 변수 초기화, 애니메이션
function gameOver() {
  computerArray = [];
  myArray = [];
  stage = 0;
  $("h3").text("Game Over.. press [a] button and try again!");
  $("body").css("background-color", "#661000")
  var audio = new Audio('sounds/wrong.mp3');
  audio.play();
}


// 애니메이션 생성 함수(소리, 그림)
function animateCreate(number) {
  switch (number) {
    case 0:
      $("#green").addClass("clicked");
      var audio = new Audio('sounds/green.mp3');
      break;
    case 1:
      $("#red").addClass("clicked");
      var audio = new Audio('sounds/red.mp3');
      break;
    case 2:
      $("#yellow").addClass("clicked");
      var audio = new Audio('sounds/yellow.mp3');
      break;
    case 3:
      $("#blue").addClass("clicked");
      var audio = new Audio('sounds/blue.mp3');
      break;
    default:
  }
  audio.play();
  setTimeout(function() {
    $(".button").removeClass("clicked");
  }, 1000)
}


function colorToNumber(color) {
  switch (color) {
    case "green":
      return 0;
      break;
    case "red":
      return 1;
      break;
    case "yellow":
      return 2;
      break;
    case "blue":
      return 3;
      break;
    default:

  }
}
