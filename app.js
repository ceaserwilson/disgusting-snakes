const screens = document.querySelectorAll(".screen");
const selectSnake = document.querySelectorAll(".select-snake");
const start = document.querySelector("#start-btn");
const timeEl = document.querySelector("#time");
const scoreEl = document.querySelector("#score");
const message = document.querySelector("#message");
const container = document.querySelector("#game-container");
let seconds = 0;
let score = 0;
let selectedSnake = {};

start.addEventListener("click", () => {
  screens[0].classList.add("up");
});

selectSnake.forEach((snake) => {
  snake.addEventListener("click", () => {
    const img = snake.querySelector("img");
    const src = img.getAttribute("src");
    const alt = img.getAttribute("alt");
    selectedSnake = { src, alt };
    screens[1].classList.add("up");
    setTimeout(createSnake, 1000);
    startGame();
  });
});

function startGame() {
  setInterval(increaseTime, 1000);
}

function increaseTime() {
  let m = Math.floor(seconds / 60);
  let s = seconds % 60;
  m = m < 10 ? `0${m}` : m;
  s = s < 10 ? `0${s}` : s;
  timeEl.innerHTML = `Time: ${m}:${s}`;
  seconds++;
}

function createSnake() {
  const snake = document.createElement("div");
  snake.classList.add("snake");
  const { x, y } = getRandomLocation();
  snake.style.top = `${y}px`;
  snake.style.left = `${x}px`;
  snake.innerHTML = `
    <img src='${selectedSnake.src}' alt='${
    selectedSnake.alt
  }' style= 'transform: rotate(${Math.random() * 360}deg)' />
  `;

  snake.addEventListener("click", killSnake);

  container.appendChild(snake);
}

function getRandomLocation() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const x = Math.random() * (width - 200) + 100;
  const y = Math.random() * (height - 200) + 100;
  return { x, y };
}

function killSnake() {
  increaseScore();
  this.classList.add("caught");
  setTimeout(() => this.remove(), 2000);
  multiplySnakes();
}

function multiplySnakes() {
  setTimeout(createSnake, 1000);
  setTimeout(createSnake, 1500);
}

function increaseScore() {
  score++;
  if (score > 19) {
    message.classList.add("visible");
  }
  scoreEl.innerHTML = `Score: ${score}`;
}
