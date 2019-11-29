class ScreenLimit {
  constructor(x, y, width, height) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
  }

  hitboxes() {
    return [
      { x: this.x, y: this.y, width: this.width, height: this.height }
    ]
  }
}