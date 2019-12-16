class Background {
  constructor(context) {
    this.context = context
  }

  update() { }

  draw() {
    this.context.fillStyle = '#3a3a3a'
    this.context.fillRect(0, 0, 500, 500)
  }
}