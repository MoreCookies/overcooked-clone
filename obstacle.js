class Obstacle {
  constructor(x, y, w, h, type, item_in=null, item_out=null, imgref=null) {
    this.obstacle_sprite = new Sprite(x, y, w, h)
    //Note: hitboxes scale from the center of the sprite
    this.obstacle_sprite.physics = STATIC;
    this.obstacle_sprite.color = "blue"
    this.focus = false
    this.progress = 0;
  }

  interact() {
    console.log("interacted")
    this.progress += 20;
    if (this.progress == 100) {
      //create new item on the obstacle
      return this.item_out //delete this later
    }
  }

  display() {
    //this.obstacle_sprite.display();

    //show progress bar
    rectMode(CENTER)
    stroke(0);
    if (this.focus) {fill("pink") } else { noFill() }
    rect(this.obstacle_sprite.position.x, this.obstacle_sprite.position.y-30, 30, 10)
    noStroke();
    fill("green")
    rect(this.obstacle_sprite.position.x, this.obstacle_sprite.position.y-30, this.progress*(0.3), 10)
  }
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