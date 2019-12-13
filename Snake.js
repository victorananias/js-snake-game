class Snake {

  constructor(x, y, size, collisor, context) {
    this.direction = ''
    this.size = size
    this.collisor = collisor

    this.head = new SnakePiece(x, y, this.size)
    this.head.onCollision = this.onCollision.bind(this)
    this.collisor.addObject(this.head)

    this.pieces = []
    this.shouldGrow = false
    this.continue = true
    this.context = context

    this.lastUpdate = new Date().getTime()
  }

  // grow(x, y) {
  //   const newPiece = new SnakePiece(x, y, this.size)
  //   this.pieces.push(newPiece)
  //   this.collisor.addObject(newPiece)
  // }

  // update() {
  //   let x = this.head.x
  //   let y = this.head.y

  //   if (!this.shouldUpdate()) {
  //     return
  //   }

  //   switch (this.direction) {
  //     case '':
  //       break

  //     case 'left':
  //       x -= this.size
  //       break

  //     case 'right':
  //       x += this.size
  //       break

  //     case 'up':
  //       y -= this.size
  //       break

  //     case 'down':
  //       y += this.size
  //       break
  //   }

  //   const body = [this.head, ...this.pieces]

  //   for (let i = 0; i < body.length; i++) {
  //     const piece = body[i]

  //     let oldX = piece.x
  //     let oldY = piece.y

  //     piece.move(x, y)

  //     x = oldX
  //     y = oldY
  //   }

  //   if (this.shouldGrow) {
  //     this.grow(x, y)
  //     this.shouldGrow = false
  //   }

  // }

  draw() {
    if (!this.continue) return;
    const body = [this.head, ...this.pieces]

    for (let i = 0; i < body.length; i++) {
      const piece = body[i]
      this.context.fillStyle = '#4bb84b'
      this.context.fillRect(piece.x, piece.y, piece.size, piece.size)
    }
  }

  onCollision(obj) {
    if (obj instanceof Fruit) {
      this.shouldGrow = true
    } else if (obj instanceof SnakePiece) {
      this.continue = false
    } else if (obj instanceof ScreenLimit) {
      this.continue = false
    }
  }

  shouldUpdate() {
    const now = new Date().getTime()

    if (now - this.lastUpdate <= this.speed) {
      return false
    }

    this.lastUpdate = now

    return true
  }

  moveDown() {
      this.direction = 'down'
  }

  moveUp() {
      snake.direction = 'up'
  }

  moveLeft() {
      snake.direction = 'left'
  }

  moveRight() {
      snake.direction = 'right'
  }
}