class Fruit {
  constructor() {
    this.x = -200
    this.y = -200
  }

  update() {
    this.x = Math.floor(Math.random() * (gameWidth / SIZE)) * SIZE;
    this.y = Math.floor(Math.random() * (gameHeight / SIZE)) * SIZE;
  }

  draw() {
    const fruit = $('.fruit')
    fruit.style.left = `${this.x}px`
    fruit.style.top = `${this.y}px`
  }

}