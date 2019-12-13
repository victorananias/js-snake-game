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
const fruit = new Fruit(SIZE, context)
const keyboard = new Keyboard()
const collisor = new Collisor()
const snake = new Snake(200, 200, SIZE, collisor, context)
const game = new Game()

const connection = new signalR.HubConnectionBuilder().withUrl("https://localhost:5001/gamehub").build();

connection.start().then(function () {
  console.log('connected')
}).catch(function (err) {
    return console.error(err.toString());
});

connection.on("ReceiveMessage", function (msg) {
  console.log(msg)
});

connection.on("UpdateGameState", function (state) {
  game.clear()
  game.addToDraw(background)

  state.snakes.forEach(s => {
    game.addToDraw(Object.assign(new Snake, s))
  })
});

// collisor.addObject(new ScreenLimit(-20, 0, 20, 500))
// collisor.addObject(new ScreenLimit(501, 0, 20, 500))
// collisor.addObject(new ScreenLimit(0, -20, 500, 20))
// collisor.addObject(new ScreenLimit(0, 0, 500, 20))
// collisor.addObject(fruit)

// collisor.whenCollide([ScreenLimit.name, SnakePiece.name], gameOver)
// collisor.whenCollide([SnakePiece.name, SnakePiece.name], gameOver)
// collisor.whenCollide([SnakePiece.name, Fruit.name], score)

// keyboard.onPress(MOVE_LEFT, () => {
//   // snake.moveLeft()
//   sendMove('left')
// })
// keyboard.onPress(MOVE_RIGHT, () => {
//   // snake.moveRight()
//   sendMove('right')
// })
// keyboard.onPress(MOVE_UP, () => {
//   // snake.moveUp()
//   sendMove('up')
// })
// keyboard.onPress(MOVE_DOWN, () => {
//   // snake.moveDown()
//   sendMove('down')
// })

// function sendMove(pos) {
//   connection.invoke("Move", pos).catch(function (err) {
//     return console.error(err.toString());
//   });
// }

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

game.addToDraw(background)
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