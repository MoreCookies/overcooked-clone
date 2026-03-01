class Obstacle {
  constructor(x, y, w, h, type, item_in=null, item_out=null, imgref=null) {
    //this.img = load(imgref)
    this.pos = createVector(x, y)
    this.obstacle_sprite = new Sprite()
    this.obstacle_sprite.image = this.img

    //Note: hitboxes scale from the center of the sprite
    this.obstacle_sprite.width = w
    this.obstacle_sprite.height = h
    
    this.obstacle_sprite.color = "brown"
    this.obstacle_sprite.stroke = "light_brown"

    this.progress = 0;
  }

  interact() {
    this.progress += 20;
    if (this.progress == 100) {
      //create new item on the obstacle
      return this.item_out //delete this later
    }
  }

  display() {
    this.obstacle_sprite.display();

    //show progress bar
    rectMode(CENTER)
    stroke(0);
    rect(this.pos.x, this.pos.y+50, 100, 30)
    noStroke();
    fill("green")
    rect(this.pos.x, this.pos.y+50, this.progress, 30)
  }

  /*
  collisions: add all obstacles to an array, check within array constantly for collisions
  this sounds really inefficient but its ok i guess lol
  if collision, set velocity to 0

  on mouse clicked move collision box sprite in direction of with the same velocity so it sticks
  check with this box for interactions
  */
}

class Item {
  constructor(id) {

  }
  
  combine(other_id) {

  }
}

/*
rest of gameplay
- timer --> connect to gamestate
- orders --> create some display and maybe animations if u r feeling fancy
- combining objects


recipes:
- tomato soup --> chop tomato, cook tomato, serve tomato
- salad --> chop lettuce, chop tomato, assemble, serve


*/