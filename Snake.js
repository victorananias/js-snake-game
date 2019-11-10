class Snake {

  constructor(x, y, size) {
    const head = $('.snake-piece')

    this.direction = ''
    this.speed = 180
    
    this.x = x
    this.y = y
    this.size = size
    
    this.pieces = []
    this.pieces.push(head)
  }

  grow() {
    const div = document.createElement('div')
    div.classList.add('snake-piece')

    div.style.left = '-200px'
    div.style.top = '-200px'

    this.pieces.push(part)

    $('#game').appendChild(div)
  }

  update() {
    switch (this.direction) {
      case '':
        break

      case 'left':
        this.x -= this.size
        break

      case 'right':
        this.x += this.size
        break

      case 'up':
        this.y -= this.size
        break

      case 'down':
        this.y += this.size
        break
    }
  }

  draw() {
    let x = this.x
    let y = this.y

    for (let i = 0; i < this.pieces.length; i++) {
      let oldX = parseInt(this.pieces[i].style.left)
      let oldY = parseInt(this.pieces[i].style.top)

      const el = this.pieces[i]

      el.style.left = `${x}px`
      el.style.top = `${y}px`

      x = oldX
      y = oldY
    }
  }
}