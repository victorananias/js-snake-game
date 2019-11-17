class SnakePiece {
  constructor(x, y, size) {
    this.size = size;
    this.move(x, y)
  }

  move(x, y) {
    this.x = x
    this.y = y
  }

  hitboxes() {
    return [{
      x: this.x, y: this.y, width: this.size, height: this.size
    }]
  }

  collidedTo(obj) { }
}