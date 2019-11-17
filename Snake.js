class Snake {

  constructor(x, y, size, collisor) {
    this.x = x
    this.y = y
    this.direction = ''
    this.speed = 180
    this.size = size
    this.collisor = collisor

    const head = new SnakeHead(x, y, this.collidedTo.bind(this))
    this.head = head
    this.collisor.addObject(head)

    this.pieces = []
    this.grow()
    this.grow()
    this.grow()
    this.grow()
    this.grow()
    this.grow()
    this.grow()

  }

  grow(x = -300, y = -300) {
    const newPiece = new SnakePiece(x, y)
    this.pieces.push(newPiece)
    this.collisor.addObject(newPiece)
  }

  update() {
    switch (this.direction) {
      case '':
        break

      case 'left':
        this.x -= this.size
        break

      case 'right':
        this.x += this.size
        break

      case 'up':
        this.y -= this.size
        break

      case 'down':
        this.y += this.size
        break
    }
  }

  draw() {
    let x = this.x
    let y = this.y

    if (this.x == this.head.x && this.y == this.head.y) {
      return
    }

    const body = [this.head, ...this.pieces]

    for (let i = 0; i < body.length; i++) {
      let oldX = body[i].x
      let oldY = body[i].y

      body[i].move(x, y)

      x = oldX
      y = oldY
    }
  }

  collidedTo(obj) {
    console.log(this.head)
    this.grow()
  }
}