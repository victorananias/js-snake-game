class Snake {

  constructor(x, y, size, collisor) {
    this.direction = ''
    this.speed = 180
    this.size = size
    this.collisor = collisor

    this.head = new SnakePiece(x, y, this.size)
    this.head.collidedTo = this.collidedTo.bind(this)
    this.collisor.addObject(this.head)

    this.pieces = []
    this.shouldGrow = false
    this.continue = true
  }

  grow(x, y) {
    const newPiece = new SnakePiece(x, y, this.size)
    this.pieces.push(newPiece)
    this.collisor.addObject(newPiece)
  }

  update() {
    let x = this.head.x
    let y = this.head.y

    switch (this.direction) {
      case '':
        break

      case 'left':
        x -= this.size
        break

      case 'right':
        x += this.size
        break

      case 'up':
        y -= this.size
        break

      case 'down':
        y += this.size
        break
    }

    const body = [this.head, ...this.pieces]

    for (let i = 0; i < body.length; i++) {
      const piece = body[i]

      let oldX = piece.x
      let oldY = piece.y

      piece.move(x, y)

      x = oldX
      y = oldY
    }

    if (this.shouldGrow) {
      this.grow(x, y)
      this.shouldGrow = false
    }

  }

  draw(context) {
    if (!this.continue) return;
    const body = [this.head, ...this.pieces]

    for (let i = 0; i < body.length; i++) {
      const piece = body[i]
      context.fillStyle = '#4bb84b'
      context.fillRect(piece.x, piece.y, piece.size, piece.size)
    }
  }

  collidedTo(obj) {
    if (obj instanceof Fruit) {
      this.shouldGrow = true
      //FIXME: nneed refactoring
      score()
    } else if (obj instanceof SnakePiece) {
      //FIXME: nneed refactoring
      this.continue = false
      gameOver()
    } else if (obj instanceof ScreenLimit) {
      this.continue = false
      gameOver()
    }
  }

  moveDown() {
    if (this.direction != 'up') {
      this.direction = 'down'
    }
  }

  moveUp() {
    if (snake.direction != 'down') {
      snake.direction = 'up'
    }
  }

  moveLeft() {
    if (snake.direction != 'right') {
      snake.direction = 'left'
    }
  }

  moveRight() {
    if (snake.direction != 'left') {
      snake.direction = 'right'
    }
  }
}