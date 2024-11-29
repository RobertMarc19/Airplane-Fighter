const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const image = document.getElementById("plane");

let leftPosition = 700;
window.addEventListener("keydown", function (event) {
  const step = 10;
  if (event.key == "ArrowLeft" && leftPosition >= 500) {
    leftPosition -= step;
  } else if (event.key == "ArrowRight" && leftPosition <= 920) {
    leftPosition += step;
  }
  image.style.left = `${leftPosition}px`;
});

let playerScore = 0;

function score() {
  playerScore += 1;
  document.getElementById("score").innerHTML = playerScore;
}
setInterval(score, 1000);

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const objects = [];
const obstacleWidth = 20;
const obstacleHeight = 30;

function spawnObjects() {
  const x = getRandomInt(canvas.width - obstacleWidth);
  const y = 0;
  const speed = 1;
  objects.push({ x, y, width: obstacleWidth, height: obstacleHeight, speed });
}

function drawObjects() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = objects.length - 1; i >= 0; --i) {
    const obj = objects[i];
    obj.y += obj.speed;
    ctx.fillStyle = "black";
    ctx.fillRect(obj.x, obj.y, obj.width, obj.height);
    console.log(obj.y);
    if (obj.y > canvas.height) {
      objects.splice(i, 1);
    }
  }
}
function animationLoop() {
  drawObjects();
  requestAnimationFrame(animationLoop);
}
setInterval(spawnObjects, 2000);
animationLoop();
