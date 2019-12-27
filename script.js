"use strict"

const $ = document.querySelector.bind(document);

const MOVE_LEFT = 'a',
  MOVE_RIGHT = 'd',
  MOVE_UP = 'w',
  MOVE_DOWN = 's',
  PAUSE = ' ';

const SIZE = 20
const SPEED = 180

let scorePoints = 0

const canvas = $('#game')
const context = canvas.getContext('2d')
const pause = $('#pause')

const background = new Background(context)
const keyboard = new Keyboard()
const game = new Game()

const connection = new signalR.HubConnectionBuilder().withUrl("https://localhost:5001/gamehub").build()

let lastUpdate = new Date().getTime()

connection.start()
.then(function () {
  console.log(connection)
  console.log('connected')
}).catch(function (err) {
    return console.error(err.toString());
})

connection.on("UpdateView", (state) => {
  context.clearRect(0, 0, 500, 500)

  background.draw()

  state.snakes.forEach(s => {
    const snake = new Snake(s, context)

    if (snake.id != connection.connectionId) {
      snake.color = 'yellow';
    }
    
    snake.draw()
  })

  state.fruits.forEach(f => {
    const fruit = new Fruit(f, context)
    fruit.draw()
  })
})

// collisor.addObject(new ScreenLimit(-20, 0, 20, 500))
// collisor.addObject(new ScreenLimit(501, 0, 20, 500))
// collisor.addObject(new ScreenLimit(0, -20, 500, 20))
// collisor.addObject(new ScreenLimit(0, 0, 500, 20))
// collisor.addObject(fruit)

// collisor.whenCollide([ScreenLimit.name, SnakePiece.name], gameOver)
// collisor.whenCollide([SnakePiece.name, SnakePiece.name], gameOver)
// collisor.whenCollide([SnakePiece.name, Fruit.name], score)

keyboard.onPress(MOVE_LEFT, () => {
  sendMove('left')
})
keyboard.onPress(MOVE_RIGHT, () => {
  sendMove('right')
})
keyboard.onPress(MOVE_UP, () => {
  sendMove('up')
})
keyboard.onPress(MOVE_DOWN, () => {
  sendMove('down')
})

keyboard.onPress(PAUSE, () => {
  sendMove('')
})


keyboard.onRelease(MOVE_LEFT, () => {
  reduceSpeed()
})
keyboard.onRelease(MOVE_RIGHT, () => {
  reduceSpeed()
})
keyboard.onRelease(MOVE_UP, () => {
  reduceSpeed()
})
keyboard.onRelease(MOVE_DOWN, () => {
  reduceSpeed()
})

function sendMove(pos) {
  connection.invoke("Move", pos).catch(function (err) {
    return console.error(err.toString());
  });
}

function reduceSpeed() {
  connection.invoke("ReduceSnakeSpeed").catch(function (err) {
    return console.error(err.toString());
  });
}

// keyboard.onPress(PAUSE, () => {
//   if (game.isOver) {
//     return
//   }

//   if (game.isPaused) {
//     game.unpause()
//     pause.classList.add('hidden')
//   } else {
//     game.pause()
//     pause.classList.remove('hidden')
//   }
// })

// game.addToDraw(background)
// game.addToDraw(snake)
// game.executeAfterDraw(() => collisor.check())

game.start()

// function score() {
//   scorePoints += 10
//   $('#score #points').innerHTML = scorePoints
// }

// function gameOver() {
//   const gameOver = $('#game-over')
//   gameOver.style.webkitAnimationPlayState = 'running'
//   game.over()
// }