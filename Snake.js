class Snake {

  constructor(x, y, size) {
    this.x = x
    this.y = y
    this.direction = ''
    this.speed = 180
    this.size = size

    this.pieces = []

    this.pieces.push(new SnakePiece(x, y))
    this.pieces.push(new SnakePiece(-200, -200))
    this.pieces.push(new SnakePiece(-200, -200))
  }

  grow(x = -200, y = -200) {
    this.pieces.push(new SnakePiece(x, y))
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

    if (this.x == this.pieces[0].x && this.y == this.pieces[0].y) {
      return
    }

    for (let i = 0; i < this.pieces.length; i++) {
      let oldX = this.pieces[i].x
      let oldY = this.pieces[i].y

      this.pieces[i].move(x, y)

      x = oldX
      y = oldY
    }
  }
}