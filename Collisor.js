class Collisor {
  constructor() {
    this.objects = []
    this.events = []
  }

  addObject(object) {
    this.objects.push(object)
  }

  whenCollide(objects, action) {
    this.events.push({ objects, action })
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
        if (!this.collided(hitboxes1[i], hitboxes2[j])) {
          continue
        }

        if (obj1.onCollision) {
          obj1.onCollision(obj2)
        }

        if (obj2.onCollision) {
          obj2.onCollision(obj1)
        }

        this.callEvents(obj1, obj2)

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

  callEvents(obj1, obj2) {
    this.events.forEach(e => {
      if (
        (e.objects[0] == obj1.constructor.name && e.objects[1] == obj2.constructor.name)
        || (e.objects[0] == obj2.constructor.name && e.objects[1] == obj1.constructor.name)
      ) {
        e.action()
      }
    })
  }
}