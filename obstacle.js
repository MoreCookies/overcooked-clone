class Obstacle {
  constructor(imgref, x, y, type, item=null) {
    this.img = load(imgref)
    this.pos = new Vector2(x, y)
    this.obstacle_sprite = new Sprite()
    this.obstacle_sprite.image = this.img
    this.obstacle_sprite.width = 20
    this.obstacle_sprite.height = 20
  }

  
  //figure out collisions?
}

class Tool extends Obstacle {
  interact() {

  }
}