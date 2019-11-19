"use strict"

const $ = document.querySelector.bind(document);

const MOVE_LEFT = 'a',
  MOVE_RIGHT = 'd',
  MOVE_UP = 'w',
  MOVE_DOWN = 's',
  PAUSE = ' ';

const SIZE = 20

let SPEED = 180

let scorePoints = 0

let lastTime = new Date().getTime()

let isGameOver = false
let isPaused = false

const canvas = $('#game')
const context = canvas.getContext('2d')

const fruit = new Fruit(SIZE, context)
const keyboard = new Keyboard()
const collisor = new Collisor()
const snake = new Snake(200, 200, SIZE, collisor)

fruit.update()

animate()

collisor.addObject(new ScreenLimit(-20, 0, 20, 500))
collisor.addObject(new ScreenLimit(501, 0, 20, 500))
collisor.addObject(new ScreenLimit(0, -20, 500, 20))
collisor.addObject(new ScreenLimit(0, 0, 500, 20))

collisor.addObject(fruit)

keyboard.onPress(MOVE_LEFT, () => snake.moveLeft())
keyboard.onPress(MOVE_RIGHT, () => snake.moveRight())
keyboard.onPress(MOVE_UP, () => snake.moveUp())
keyboard.onPress(MOVE_DOWN, () => snake.moveDown())
keyboard.onPress(PAUSE, () => togglePause())


function animate() {

  if (isPaused || isGameOver) {
    requestAnimationFrame(animate)
    return
  }

  context.clearRect(0, 0, canvas.width, canvas.size)
  context.fillStyle = '#3a3a3a'
  context.fillRect(0, 0, canvas.width, canvas.height)

  let now = new Date().getTime()

  if (now - lastTime > SPEED ) {
    snake.update()
    lastTime = now
  }

  snake.draw(context)
  fruit.draw(context)
  
  collisor.check()


  requestAnimationFrame(animate)
}


function score() {
  scorePoints += 10
  $('#score #points').innerHTML = scorePoints
}


function togglePause() {
  if (isGameOver) return

  isPaused = !isPaused
  const pause = $('#pause')

  if (isPaused) {
    pause.classList.remove('hidden')
  } else {
    pause.classList.add('hidden')
  }
}

function gameOver() {
  isGameOver = true
  const gameOver = $('#game-over')
  gameOver.style.webkitAnimationPlayState = 'running'
}