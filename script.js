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
const bullets = [];
const bulletWidth = 5;
const bulletHeight = 10;
const bulletSpeed = 5;

const plane = {
  x: screenWidth / 2,
  y: 650,
  width: 20,
  height: 20,
};

window.addEventListener("keydown", function (event) {
  const step = 10;
  if (event.key === "ArrowLeft" && plane.x > 0) {
    plane.x -= step;
  } else if (
    event.key === "ArrowRight" &&
    plane.x < canvas.width - plane.width
  ) {
    plane.x += step;
  } else if (event.key === " ") {
    spawnBullet();
  }
});

function getRandomPosition(max) {
  return Math.floor(Math.random() * max);
}

function spawnBullet() {
  bullets.push({
    x: plane.x + (plane.width / 2) - (bulletWidth / 2),
    y: plane.y,
    width: bulletWidth,
    height: bulletHeight,
  });
}

function spawnObjects() {
  const x = getRandomPosition(canvas.width - obstacleWidth);
  const y = 0;
  const speed = 1;
  objects.push({ x, y, width: obstacleWidth, height: obstacleHeight, speed });
}

setInterval(spawnObjects, miliseconds);

function checkCollision(plane, obj) {
  return (
    obj.x < plane.x + plane.width &&
    obj.x + obj.width > plane.x &&
    obj.y < plane.y + plane.height &&
    obj.y + obj.height > plane.y
  );
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
  for (let i = 0; i < objects.length; ++i) {
    const obj = objects[i];
    obj.y += obj.speed;
    drawObstaclesAndPlane(obj.x, obj.y, obstacleWidth, obstacleHeight, "black");
    if (checkCollision(plane, obj)) {
      alert("Game over! Your score was: " + playerScore);
    }
    if (obj.y > canvas.height) {
      objects.splice(i, 1);
    }
  }
  for (let i = bullets.length - 1; i >= 0; --i) {
    const bullet = bullets[i];
    bullet.y -= bulletSpeed;
    drawObstaclesAndPlane(
      bullet.x,
      bullet.y,
      bullet.width,
      bullet.height,
      "yellow"
    );
    if (bullet.y + bullet.height < 0) {
      bullets.splice(i, 1);
    }
    for (let j = objects.length - 1; j >= 0; --j) {
      const obj = objects[j];
      if (checkCollision(bullet, obj)) {
        bullets.splice(i, 1);
        objects.splice(j, 1);
        ++playerScore;
      }
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
