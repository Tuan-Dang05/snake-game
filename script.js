const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const blockSize = 20;
let snake = [{ x: 10, y: 10 }];
let food = { x: 15, y: 10 };
let dx = 1;
let dy = 0;
let score = 0;
let isGameOver = false;

function drawBlock(x, y) {
  ctx.fillStyle = "green";
  ctx.fillRect(x * blockSize, y * blockSize, blockSize, blockSize);
  ctx.strokeStyle = "black";
  ctx.strokeRect(x * blockSize, y * blockSize, blockSize, blockSize);
}

function drawSnake() {
  snake.forEach(segment => drawBlock(segment.x, segment.y));
}

function drawFood() {
  drawBlock(food.x, food.y);
}

function moveSnake() {
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);
  if (head.x === food.x && head.y === food.y) {
    score += 10;
    document.getElementById("score").innerText = score;
    generateFood();
  } else {
    snake.pop();
  }
}

function generateFood() {
  food.x = Math.floor(Math.random() * (canvas.width / blockSize));
  food.y = Math.floor(Math.random() * (canvas.height / blockSize));
  snake.forEach(segment => {
    if (food.x === segment.x && food.y === segment.y) {
      generateFood();
    }
  });
}

function checkCollision() {
  const head = snake[0];
  if (head.x < 0 || head.x >= canvas.width / blockSize || head.y < 0 || head.y >= canvas.height / blockSize) {
    gameOver();
  }
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      gameOver();
    }
  }
}

function gameOver() {
  isGameOver = true;
  clearInterval(gameLoop);
  document.getElementById("gameOverText").innerText = "Game Over! Your score: " + score;
  document.getElementById("score").innerText = "0";
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function updateGame() {
  if (isGameOver) return;
  clearCanvas();
  drawSnake();
  drawFood();
  moveSnake();
  checkCollision();
}

function keyDownHandler(event) {
  const keyPressed = event.key;
  if (keyPressed === "ArrowUp" && dy === 0) {
    dx = 0;
    dy = -1;
  } else if (keyPressed === "ArrowDown" && dy === 0) {
    dx = 0;
    dy = 1;
  } else if (keyPressed === "ArrowLeft" && dx === 0) {
    dx = -1;
    dy = 0;
  } else if (keyPressed === "ArrowRight" && dx === 0) {
    dx = 1;
    dy = 0;
  }
}

function startGame() {
  snake = [{ x: 10, y: 10 }];
  dx = 1;
  dy = 0;
  score = 0;
  isGameOver = false;
  document.getElementById("gameOverText").innerText = "";
  document.getElementById("score").innerText = score;
  generateFood();
  gameLoop = setInterval(updateGame, 100);
}

document.addEventListener("keydown", keyDownHandler);
