class SnakePiece {
  constructor(x, y) {
    const div = document.createElement('div')
    div.classList.add('snake-piece')

    this.element = div
    this.move(x, y)

    $('#game').appendChild(div)
  }

  move(x, y) {
    this.element.style.left = `${x}px`
    this.element.style.top = `${y}px`
  }

  get x() {
    return parseInt(this.element.style.left)
  }

  get y() {
    return parseInt(this.element.style.top)
  }
}