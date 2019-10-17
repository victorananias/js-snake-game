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

  let play = true;

  const point = document.querySelector('.point');
  const container = document.querySelector('#container');

  const containerWidth = parseInt(getStyle(container).width);
  const containerHeight = parseInt(getStyle(container).height);

  let direction = '';

  document.addEventListener('keyup', setMovement);

  function setMovement(e) {

    switch (e.keyCode) {
      case KEY_PAUSE:
        play = !play
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
    if (!play) {
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
    let shouldReposition = false;

    if (!direction) return;

    if (direction == 'left' && x - SIZE >= 0) {
      shouldReposition = true;
      x -= SIZE;
    }

    if (direction == 'right' && x + SIZE < containerWidth) {
      shouldReposition = true;
      x += SIZE;
    }

    if (direction == 'up' && y - SIZE >= 0) {
      shouldReposition = true;
      y -= SIZE;
    }

    if (direction == 'down' && y + SIZE < containerHeight) {
      shouldReposition = true;
      y += SIZE;
    }
    
    if (!shouldReposition) return;


    for (let i = 0; i < parts.length; i++) {
      let oldX = parseInt(parts[i].style.left);
      let oldY = parseInt(parts[i].style.top);

      reposition(parts[i], x, y);

      x = oldX;
      y = oldY;
    }

    checkPoint(
      parts[0].style.left,
      parts[0].style.top,
      parts[0].style.width
    )

  }

  function snakeBody() {
    return document.querySelectorAll('.snake-part');
  }

  function getStyle(element) {
    return window.getComputedStyle(element)
  }

  function growUp() {
    const div = document.createElement('div')
    div.classList.add('snake-part')
    div.innerHTML = snakeBody().length + 1;
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

  function checkPoint(x, y, size) {
    const pointX = getStyle(point).left;
    const pointY = getStyle(point).top;

    if (
      x <= pointX && x + size >= pointX
      && y <= pointY && y + size >= pointY
    ) {
      score();
      growUp();
      speedUp();
      removePoint();
      spawnPoint();
    }
  }

  function score() {
    scorePoints += 10;
    document.querySelector('#score #points').innerHTML = scorePoints;
  }

  function speedUp() {
    SPEED -= 1;
  }

  function removePoint() {
    point.style.left = '-200px';
    point.style.top = '-200px';
  }

  function reposition(el, x, y) {
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
  }

  spawnPoint();
  animate();
}