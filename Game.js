class Game {

  constructor() {
    this.objectsToDraw = []
    this.processesBeforeDraw = []
    this.processesAfterDraw = []
    this.state = 'running'
  }

  start() {
    if (this.state != 'running') {
      requestAnimationFrame(() => this.start())
      return
    }

    this.objectsToDraw.forEach(obj => obj.update())

    this.processesBeforeDraw.forEach(p => p())

    this.objectsToDraw.forEach(obj => obj.draw())

    this.processesAfterDraw.forEach(p => p())

    requestAnimationFrame(() => this.start())
  }

  addToDraw(obj) {
    this.objectsToDraw.push(obj)
  }

  executeBeforeDraw(obj) {
    this.processesBeforeDraw.push(obj)
  }

  executeAfterDraw(obj) {
    this.processesAfterDraw.push(obj)
  }

  pause() {
    this.state = 'paused'
  }

  unpause() {
    this.state = 'running'
  }
  
  get isPaused() {
    return this.state == 'paused' 
  }

  over() {
    throw new Error('Game Over')
  }
}