class Background {
  constructor(context) {
    this.context = context
  }

  update() { }

  draw() {
    this.context.fillStyle = '#2e2c2c'
    this.context.fillRect(0, 0, 500, 500)
  }
}