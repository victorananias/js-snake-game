class Fruit {
  constructor(size) {
    this.size = size
    this.element = $('.fruit')
    this.x = -200
    this.y = -200
  }

  update() {
    this.x = Math.floor(Math.random() * (gameWidth / this.size)) * this.size;
    this.y = Math.floor(Math.random() * (gameHeight / this.size)) * this.size;
  }

  draw() {
    const fruit = $('.fruit')
    fruit.style.left = `${this.x}px`
    fruit.style.top = `${this.y}px`
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