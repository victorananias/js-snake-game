class SnakeHead extends SnakePiece {
  
  constructor(x, y, collidedTo) {
    super(x, y)
    this.collidedTo = collidedTo
  }
}