class Background {
  constructor(context) {
    this.context = context
  }

  update() { }

  draw() {
    // FIXME: need to refactor
    this.context.clearRect(0, 0, 500, 500)
    this.context.fillStyle = '#3a3a3a'
    this.context.fillRect(0, 0, 500, 500)
  }
}