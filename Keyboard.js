class Keyboard {
  pressedKeys = []
  holdedKeys = []
  shotFunctions = []

  constructor() {
    document.addEventListener('keydown', this._onkeydown.bind(this))
    document.addEventListener('keyup', this._onkeyup.bind(this))
  }

  onPress(keyCode, action) {
    this.shotFunctions[keyCode] = action
  }

  _onkeydown({ keyCode }) {
    this.holdedKeys[keyCode] = true

    if (this.shotFunctions[keyCode] && !this.pressedKeys[keyCode]) {
      this.pressedKeys[keyCode] = true
      this.shotFunctions[keyCode]()
    }
  }

  _onkeyup({ keyCode }) {
    this.pressedKeys[keyCode] = false
    this.holdedKeys[keyCode] = false
  }
}