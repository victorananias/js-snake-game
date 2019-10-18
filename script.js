window.onload = () => {
  const KEY_LEFT = 65;
  const KEY_RIGHT = 68;
  const KEY_UP = 87;
  const KEY_DOWN = 83;
  const KEY_PAUSE = 32;
  const SIZE = 20;
  
  let SPEED = 200;
  
  let scorePoints = 0;
  
  let lastTime = new Date().getTime();
  
  let isGameOver = false
  let isPaused = false;

  const point = document.querySelector('.point');
  const container = document.querySelector('#container');

  const containerWidth = parseInt(getStyle(container).width);
  const containerHeight = parseInt(getStyle(container).height);

  let direction = 'd';

  document.addEventListener('keyup', setDirection);

  function setDirection(e) {
    switch (e.keyCode) {
      case KEY_PAUSE:
        isPaused = !isPaused
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
        if (direction != 'top') {
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

    let agora = new Date().getTime();

    if (agora - lastTime > SPEED) {
      move();
      lastTime = agora;
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
        || x >= containerWidth
        || y < 0
        || y >= containerHeight
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
      x <= pointX && x + size >= pointX
      && y <= pointY && y + size >= pointY
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
    container.appendChild(div);
  }

  function spawnPoint() {
    const x = Math.floor(Math.random() * (containerWidth / SIZE)) * SIZE;
    const y = Math.floor(Math.random() * (containerHeight / SIZE)) * SIZE;

    point.style.left = `${x}px`;
    point.style.top = `${y}px`;
  }

  function score() {
    scorePoints += 10;
    document.querySelector('#score #points').innerHTML = scorePoints;
  }

  function speedUp() {
    SPEED -= 1;
  }

  function hidePoint() {
    point.style.left = '-200px';
    point.style.top = '-200px';
  }

  function reposition(el, x, y) {
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
  }

  function gameOver() {
    isGameOver = true;
    const gameOver = document.querySelector('#game-over');
    gameOver.style.webkitAnimationPlayState  = 'running'
  }

  spawnPoint();
  animate();
}

function reload() {
  location.reload();
}