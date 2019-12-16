class Fruit {
  constructor(fruit, context) {
    Object.assign(this, fruit)
    this.context = context
  }

  // update() {
    // if (!this.shouldUpdate) {
    //   return
    // }

    // this.shouldUpdate = false
    // this.x = Math.floor(Math.random() * (500 / this.size)) * this.size
    // this.y = Math.floor(Math.random() * (500 / this.size)) * this.size
  // }

  draw() {
    //FIXME: nneed refactoring
    this.context.fillStyle = '#c54c4c'
    this.context.fillRect(this.x, this.y, this.size, this.size)
  }

  // onCollision(obj) {
  //   this.shouldUpdate = true
  // }

  // hitboxes() {
  //   return [{
  //     x: this.x, y: this.y, width: this.size, height: this.size
  //   }]
  // }
}