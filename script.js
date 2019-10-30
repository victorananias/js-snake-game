const $ = document.querySelector.bind(document);

const KEY_LEFT = 65;
KEY_RIGHT = 68,
  KEY_UP = 87,
  KEY_DOWN = 83,
  KEY_PAUSE = 32;

const SIZE = parseInt(getStyle($('.snake-part')).width);

let SPEED = 180;

let scorePoints = 0;

let lastTime = new Date().getTime();
let lastClick = new Date().getTime();

let isGameOver = false
let isPaused = false;

const point = $('.point');
const game = $('#game');

const gameWidth = parseInt(getStyle(game).width);
const gameHeight = parseInt(getStyle(game).height);

let direction = '';

document.addEventListener('keyup', setDirection);

game.addEventListener('click', function (e) {
  const offsetY = e.offsetY
  const offsetX = e.offsetX
  const snakeHead = $('.snake-part');
  const x = parseInt(snakeHead.style.left);
  const y = parseInt(snakeHead.style.top);

  if (direction == 'left' || direction == 'right') {
    if (offsetY > y) {
      direction = 'down'
    } else {
      direction = 'up';
    }

    return;
  }

  if (direction == 'up' || direction == 'down') {
    if (offsetX > x) {
      direction = 'right'
    } else {
      direction = 'left';
    }
    return;
  }

  direction = 'right'
});

function setDirection(e) {

  let now = new Date().getTime();
  if (now - lastClick <= (SPEED * 0.8)) {
    return;
  }

  lastClick = now;

  switch (e.keyCode) {
    case KEY_PAUSE:
      togglePause();
      break;
    case KEY_LEFT:
      if (direction != 'right') {
        direction = 'left'
      }
      break;
    case KEY_RIGHT:
      if (direction != 'left') {
        direction = 'right'
      }
      break;
    case KEY_UP:
      if (direction != 'down') {
        direction = 'up'
      }
      break;
    case KEY_DOWN:
      if (direction != 'up') {
        direction = 'down'
      }
      break;
  }
}

function animate() {
  if (isPaused || isGameOver) {
    requestAnimationFrame(animate);
    return;
  }

  let now = new Date().getTime();

  if (now - lastTime > SPEED) {
    move();
    lastTime = now;
  }

  requestAnimationFrame(animate);
}

function move() {
  const parts = snakeBody();

  let x = parseInt(getStyle(parts[0]).left);
  let y = parseInt(getStyle(parts[0]).top);

  if (!direction) return;

  if (direction == 'left') {
    shouldReposition = true;
    x -= SIZE;
  }

  if (direction == 'right') {
    shouldReposition = true;
    x += SIZE;
  }

  if (direction == 'up') {
    shouldReposition = true;
    y -= SIZE;
  }

  if (direction == 'down') {
    shouldReposition = true;
    y += SIZE;
  }

  if (
    willCollide(x, y)
    || x < 0
    || x >= gameWidth
    || y < 0
    || y >= gameHeight
  ) {
    gameOver();
    return;
  }

  for (let i = 0; i < parts.length; i++) {
    let oldX = parseInt(parts[i].style.left);
    let oldY = parseInt(parts[i].style.top);

    reposition(parts[i], x, y);

    x = oldX;
    y = oldY;
  }

  pointCheck(parts[0].style.left, parts[0].style.top, SIZE)
}

function willCollide(x, y) {
  const parts = snakeBody();

  for (let i = 1; i < parts.length; i++) {
    const part = parts[i];
    const partX = parseInt(part.style.left);
    const partY = parseInt(part.style.top);

    if (x == partX && y == partY) {
      return true;
    }
  }

}

function pointCheck(x, y, size) {
  const pointX = getStyle(point).left;
  const pointY = getStyle(point).top;

  if (
    x <= pointX
    && x + size >= pointX
    && y <= pointY
    && y + size >= pointY
  ) {
    score();
    growUp();
    speedUp();
    hidePoint();
    spawnPoint();
  }
}

function snakeBody() {
  return document.querySelectorAll('.snake-part');
}

function getStyle(element) {
  return window.getComputedStyle(element)
}

function growUp() {
  const div = document.createElement('div')
  div.classList.add('snake-part');
  div.style.left = '-200px';
  div.style.top = '-200px';
  game.appendChild(div);
}

function spawnPoint() {
  const x = Math.floor(Math.random() * (gameWidth / SIZE)) * SIZE;
  const y = Math.floor(Math.random() * (gameHeight / SIZE)) * SIZE;

  point.style.left = `${x}px`;
  point.style.top = `${y}px`;
}

function score() {
  scorePoints += 10;
  $('#score #points').innerHTML = scorePoints;
}

function speedUp() {
  SPEED -= 2;
}

function hidePoint() {
  point.style.left = '-200px';
  point.style.top = '-200px';
}

function reposition(el, x, y) {
  el.style.left = `${x}px`;
  el.style.top = `${y}px`;
}

function togglePause() {
  if (isGameOver) return;

  isPaused = !isPaused;
  const pause = $('#pause');

  if (isPaused) {
    pause.classList.remove('hidden');
  } else {
    pause.classList.add('hidden');
  }
}

function gameOver() {
  isGameOver = true;
  const gameOver = $('#game-over');
  gameOver.style.webkitAnimationPlayState = 'running'
}

spawnPoint();
animate();

function reload() {
  location.reload();
}