const $ = document.querySelector.bind(document);

const ARROW_LEFT = 65;
  ARROW_RIGHT = 68,
  ARROW_UP = 87,
  ARROW_DOWN = 83,
  SPACE = 32;

const SIZE = parseInt(getStyle($('.snake-piece')).width);

let SPEED = 180;

let scorePoints = 0;

let lastTime = new Date().getTime();
let lastClick = new Date().getTime();

let isGameOver = false
let isPaused = false;

const game = $('#game');

const gameWidth = parseInt(getStyle(game).width);
const gameHeight = parseInt(getStyle(game).height);

const snakeStyle = getStyle($('.snake-piece'))

const snake = new Snake(
  parseInt(snakeStyle.left),
  parseInt(snakeStyle.top),
  parseInt(snakeStyle.width)
)

const fruit = new Fruit()
const keyboard = new Keyboard()

fruit.update()


// game.addEventListener('click', function (e) {
//   const offsetY = e.offsetY
//   const offsetX = e.offsetX
//   const snakeHead = $('.snake-piece');
//   const x = parseInt(snakeHead.style.left);
//   const y = parseInt(snakeHead.style.top);

//   if (direction == 'left' || direction == 'right') {
//     if (offsetY > y) {
//       direction = 'down'
//     } else {
//       direction = 'up';
//     }

//     return;
//   }

//   if (direction == 'up' || direction == 'down') {
//     if (offsetX > x) {
//       direction = 'right'
//     } else {
//       direction = 'left';
//     }
//     return;
//   }

//   direction = 'right'
// });

keyboard.onPress(ARROW_LEFT, () => {
  if (snake.direction != 'right') {
    snake.direction = 'left'
  }
})

keyboard.onPress(ARROW_RIGHT, () => {
  if (snake.direction != 'left') {
    snake.direction = 'right'
  }
})

keyboard.onPress(ARROW_UP, () => {
  if (snake.direction != 'down') {
    snake.direction = 'up'
  }
})

keyboard.onPress(ARROW_DOWN, () => {
  if (snake.direction != 'up') {
    snake.direction = 'down'
  }
})

keyboard.onPress(SPACE, () => {
  togglePause()
})

function animate() {
  if (isPaused || isGameOver) {
    requestAnimationFrame(animate);
    return;
  }

  let now = new Date().getTime();

  if (now - lastTime > SPEED) {
    snake.update()
    lastTime = now
  }

  snake.draw()
  fruit.draw()

  requestAnimationFrame(animate);
}

function move() {
  

  // if (
  //   willCollide(x, y)
  //   || x < 0
  //   || x >= gameWidth
  //   || y < 0
  //   || y >= gameHeight
  // ) {
  //   gameOver();
  //   return;
  // }


  // pointCheck(parts[0].style.left, parts[0].style.top, SIZE)
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
  return document.querySelectorAll('.snake-piece');
}

function getStyle(element) {
  return window.getComputedStyle(element)
}

function growUp() {
  const div = document.createElement('div')
  div.classList.add('snake-piece');
  div.style.left = '-200px';
  div.style.top = '-200px';
  game.appendChild(div);
}

function spawnPoint() {
  // const x = Math.floor(Math.random() * (gameWidth / SIZE)) * SIZE;
  // const y = Math.floor(Math.random() * (gameHeight / SIZE)) * SIZE;

  // point.style.left = `${x}px`;
  // point.style.top = `${y}px`;
}

function score() {
  scorePoints += 10;
  $('#score #points').innerHTML = scorePoints;
}

function speedUp() {
  SPEED -= 2;
}

function hidePoint() {
  // point.style.left = '-200px';
  // point.style.top = '-200px';
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