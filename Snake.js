class Snake {

  constructor(snake, context) {
    Object.assign(this, snake)
    this.context = context
  }

  // grow(x, y) {
  //   const newPiece = new SnakePiece(x, y, this.size)
  //   this.body.push(newPiece)
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

    // const body = [this.head, ...this.body]

    // for (let i = 0; i < body.length; i++) {
    //   const piece = body[i]

    //   let oldX = piece.x
    //   let oldY = piece.y

    //   piece.move(x, y)

    //   x = oldX
    //   y = oldY
    // }

    // if (this.shouldGrow) {
    //   this.grow(x, y)
    //   this.shouldGrow = false
    // }

  // }

  draw() {
    const body = [this.head, ...this.body]
    
    for (let i = 0; i < body.length; i++) {
      const piece = body[i]
      this.context.fillStyle = '#4bb84b'
      this.context.fillRect(piece.x, piece.y, piece.size, piece.size)
    }
  }

  // onCollision(obj) {
  //   if (obj instanceof Fruit) {
  //     this.shouldGrow = true
  //   } else if (obj instanceof SnakePiece) {
  //     this.continue = false
  //   } else if (obj instanceof ScreenLimit) {
  //     this.continue = false
  //   }
  // }

  // shouldUpdate() {
  //   const now = new Date().getTime()

  //   if (now - this.lastUpdate <= this.speed) {
  //     return false
  //   }

  //   this.lastUpdate = now

  //   return true
  // }

  // moveDown() {
  //     this.direction = 'down'
  // }

  // moveUp() {
  //     snake.direction = 'up'
  // }

  // moveLeft() {
  //     snake.direction = 'left'
  // }

  // moveRight() {
  //     snake.direction = 'right'
  // }
}