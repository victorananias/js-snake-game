class Keyboard {
  pressedKeys = []
  holdedKeys = []
  shotFunctions = []

  constructor() {
    document.addEventListener('keydown', this._onkeydown.bind(this))
    document.addEventListener('keyup', this._onkeyup.bind(this))
  }

  onPress(key, action) {
    this.shotFunctions[key] = action
  }

  _onkeydown({ key }) {
    this.holdedKeys[key] = true

    if (this.shotFunctions[key] && !this.pressedKeys[key]) {
      this.pressedKeys[key] = true
      this.shotFunctions[key]()
    }
  }

  _onkeyup({ key }) {
    this.pressedKeys[key] = false
    this.holdedKeys[key] = false
  }
}