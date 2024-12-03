const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let leftPosition = window.innerWidth / 2;
const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;

canvas.width = screenWidth;
canvas.height = screenHeight;

let playerScore = 0;

window.addEventListener("keydown", function (event) {
  const step = 10;
  if (event.key === "ArrowLeft" && leftPosition > 0) {
    leftPosition -= step;
  } else if (event.key === "ArrowRight" && leftPosition < canvas.width - 20) {
    leftPosition += step;
  }
});

function score() {
  playerScore += 1;
  document.getElementById("score").innerHTML = playerScore;
}
setInterval(score, 1000);

function getRandomPosition(max) {
  return Math.floor(Math.random() * max);
}

const objects = [];
const obstacleWidth = 20;
const obstacleHeight = 20;

function spawnObjects() {
  const x = getRandomPosition(canvas.width - obstacleWidth);
  const y = 0;
  const speed = 1;
  objects.push({ x, y, width: obstacleWidth, height: obstacleHeight, speed });
}
setInterval(spawnObjects, 1000);


let planeY = 650;
let planeWidth = 20;
let planeHeight = 20;

function drawPlane() {
  ctx.fillStyle = "blue";
  ctx.fillRect(leftPosition, planeY, planeWidth, planeHeight);
}

function drawScore() {
  ctx.font = "20px Arial";
  ctx.fillStyle = "black";
  ctx.fillText(`Score: ${playerScore}`, 10, 30);
}

function drawObjects() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = objects.length - 1; i >= 0; --i) {
    const obj = objects[i];
    obj.y += obj.speed;
    ctx.fillStyle = "black";
    ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
    if (obj.x < leftPosition + planeWidth && 
        obj.x + obj.width > leftPosition && 
        obj.y < planeY + planeHeight &&
        obj.y + obj.height > planeY) { 
      alert("Game over! Your score was: " + playerScore);
    }
    if (obj.y > canvas.height) {
      objects.splice(i, 1);
    }
  }
  drawScore();
  drawPlane();
}

function animationLoop() {
  drawObjects();
  requestAnimationFrame(animationLoop);
}
animationLoop();
