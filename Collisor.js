class Collisor {
  constructor() {
    this.objects = []
    this.checked = {}
  }

  addObject(object) {
    this.objects.push(object)
  }

  check() {
    this.checked = {}

    for (const i in this.objects) {
      for (const j in this.objects) {
        if (i == j) {
          continue
        }

        const objI = JSON.stringify(this.objects[i])
        const objJ = JSON.stringify(this.objects[j])

        if (!this.checked[objI]) {
          this.checked[objI] = []
        }

        if (!this.checked[objJ]) {
          this.checked[objJ] = []
        }

        if (
          this.checked[objI].indexOf(objJ) > -1
          || this.checked[objJ].indexOf(objI) > -1
        ) {
          continue
        }

        this.checkCollision(this.objects[i], this.objects[j])

        this.checked[objI].push(objJ)
        this.checked[objJ].push(objI)
      }
    }
  }

  checkCollision(obj1, obj2) {
    const hitboxes1 = obj1.hitboxes()
    const hitboxes2 = obj2.hitboxes()

    for (const i in hitboxes1) {
      for (const j in hitboxes2) {
        if (!this.collided(hitboxes1[i], hitboxes2[j])) {
          continue
        }

        obj1.collidedTo(obj2)
        obj2.collidedTo(obj1)

        return
      }
    }
  }

  collided(hitbox1, hitbox2) {
    return (hitbox1.x + hitbox1.largura) > hitbox2.x &&
      hitbox1.x < (hitbox2.x + hitbox2.largura) &&
      (hitbox1.y + hitbox1.altura) > hitbox2.y &&
      hitbox1.y < (hitbox2.y + hitbox2.altura)
  }
}