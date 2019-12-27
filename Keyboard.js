class Keyboard {
  pressedKeys = []
  holdedKeys = []
  pressKeyActions = []
  releaseKeyActions = []

  constructor() {
    document.addEventListener('keydown', this._onkeydown.bind(this))
    document.addEventListener('keyup', this._onkeyup.bind(this))
  }

  onPress(key, action) {
    this.pressKeyActions[key] = action
  }

  onRelease(key, action) {
    this.releaseKeyActions[key] = action
  }

  _onkeydown({ key }) {
    this.holdedKeys[key] = true

    if (this.pressKeyActions[key] && !this.pressedKeys[key]) {
      this.pressedKeys[key] = true
      this.pressKeyActions[key]()
    }
  }

  _onkeyup({ key }) {
    this.pressedKeys[key] = false
    this.holdedKeys[key] = false

    if (this.releaseKeyActions[key]) {
      this.releaseKeyActions[key]()
    }
  }
}