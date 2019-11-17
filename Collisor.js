class Collisor {
  constructor() {
    this.objects = []
  }

  addObject(object) {
    this.objects.push(object)
  }

  check() {
    const checked = {}

    for (const i in this.objects) {
      for (const j in this.objects) {
        if (i == j) {
          continue
        }

        const objI = JSON.stringify(this.objects[i])
        const objJ = JSON.stringify(this.objects[j])

        if (!checked[objI]) {
          checked[objI] = []
        }

        if (!checked[objJ]) {
          checked[objJ] = []
        }

        if (
          checked[objI].indexOf(objJ) > -1 || checked[objJ].indexOf(objI) > -1
        ) {
          continue
        }

        this.checkCollision(this.objects[i], this.objects[j])

        checked[objI].push(objJ)
        checked[objJ].push(objI)
      }
    }
  }

  checkCollision(obj1, obj2) {
    const hitboxes1 = obj1.hitboxes()
    const hitboxes2 = obj2.hitboxes()

    for (const i in hitboxes1) {
      for (const j in hitboxes2) {
        if (hitboxes1[i] instanceof SnakeHead || hitboxes1[j] instanceof SnakeHead) {
          console.log(hitboxes1[i], hitboxes2[j])
        }

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
    return (hitbox1.x + hitbox1.width) > hitbox2.x &&
      hitbox1.x < (hitbox2.x + hitbox2.width) &&
      (hitbox1.y + hitbox1.height) > hitbox2.y &&
      hitbox1.y < (hitbox2.y + hitbox2.height)
  }
}