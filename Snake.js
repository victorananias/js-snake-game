class Snake {

  constructor(x, y, size, collisor) {
    this.direction = ''
    this.speed = 180
    this.size = size
    this.collisor = collisor

    const head = new SnakePiece(x, y, this.size)
    this.head = head
    this.head.collidedTo = this.collidedTo.bind(this)
    this.collisor.addObject(head)

    this.pieces = []
    this.shouldGrow = false
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
    } else if (obj instanceof SnakePiece) {
      alert('deu ruim')
    }
  }
}