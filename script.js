const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;

canvas.width = screenWidth;
canvas.height = screenHeight;

let playerScore = 0;

const objects = [];
const obstacleWidth = 20;
const obstacleHeight = 20;
const miliseconds = 1000;

let plane = {
  x: screenWidth / 2,
  y: 650,
  width: 20,
  height: 20,
};

window.addEventListener("keydown", function (event) {
  const step = 10;
  if (event.key === "ArrowLeft" && plane.x > 0) {
    plane.x -= step;
  } else if (event.key === "ArrowRight" && plane.x < canvas.width - plane.width) {
    plane.x += step;
  }
});

function getRandomPosition(max) {
  return Math.floor(Math.random() * max);
}

function spawnObjects() {
  const x = getRandomPosition(canvas.width - obstacleWidth);
  const y = 0;
  const speed = 1;
  objects.push({ x, y, width: obstacleWidth, height: obstacleHeight, speed });
}

setInterval(spawnObjects, miliseconds);

function checkCollision(plane, objects) {
  for (let i = objects.length - 1; i >= 0; --i) {
    const obj = objects[i];
    if (obj.x < plane.x + plane.width &&
      obj.x + obj.width > plane.x &&
      obj.y < plane.y + plane.height &&
      obj.y + obj.height > plane.y) {
      return true;
    }
  }
}

function drawObstaclesAndPlane(x, y, width, height, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
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
    drawObstaclesAndPlane(obj.x, obj.y, obstacleWidth, obstacleHeight, "black")
    if (checkCollision(plane, objects)) {
      alert("Game over! Your score was: " + playerScore);
    }
    if (obj.y > canvas.height) {
      objects.splice(i, 1);
      ++playerScore;
    }
  }
  drawObstaclesAndPlane(plane.x, plane.y, plane.width, plane.height, "blue");
  drawScore();
}

function animationLoop() {
  drawObjects();
  requestAnimationFrame(animationLoop);
}

animationLoop();
