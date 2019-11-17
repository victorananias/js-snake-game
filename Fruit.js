class Fruit {
  constructor(size, context) {
    this.x = -200
    this.y = -200
    this.size = size
    this.context = context
  }

  update() {
    this.x = Math.floor(Math.random() * (500 / this.size)) * this.size;
    this.y = Math.floor(Math.random() * (500 / this.size)) * this.size;
  }

  draw() {
    //FIXME: refactor
    this.context.fillStyle = '#c54c4c'
    this.context.fillRect(this.x, this.y, this.size, this.size)
  }

  collidedTo(obj) {
    this.update()
    this.draw()
  }

  hitboxes() {
    return [{
      x: this.x, y: this.y, width: this.size, height: this.size
    }]
  }
}