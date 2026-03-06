class Obstacle {
  constructor(x, y, w, h, type, item=null, imgref=null) {
    this.obstacle_sprite = new Sprite(x, y, w, h)
    //Note: hitboxes scale from the center of the sprite
    this.obstacle_sprite.physics = STATIC;
    this.obstacle_sprite.color = "blue"

    //this.obstacle_sprite.image = imgref --> DISPLAY IMAGE FROM THE SPRITE


    this.focus = false
    this.progress = 0;
    this.type = type
    
    //this will be the item on the obstacle, only for types: "CHOP", "COOK", "BOIL", "NONE" (table),
    this.item = item 
  }

  interact() {
    console.log("interacted")
    if(["CHOP", "COOK", "BOIL"].includes(this.type)) {
      this.progress += 20;
      if (this.progress == 100) {
        //create new item on the obstacle
        this.progress = 0
        //this.item.change(this.type) //Change item into different type
      }
    }
  }

  display() {
    // Cooking station
    if(["CHOP", "COOK", "BOIL"].includes(this.type)) {
      //Show progress bar
      rectMode(CENTER)
      strokeWeight(2);
      if (this.focus) { this.obstacle_sprite.stroke = "black" } else { this.obstacle_sprite.stroke = "white" }
      noStroke();
      fill("green")
      rect(this.obstacle_sprite.position.x, this.obstacle_sprite.position.y-30, this.progress*(0.3), 10)
      noFill()
      stroke(0)
      rect(this.obstacle_sprite.position.x, this.obstacle_sprite.position.y-30, 30, 10)
      noStroke();
    }
    //Display item
    
  }

  display_item() {
    if(this.item) {
      image(this.item.imgref, 
        this.obstacle_sprite.position.x, 
        this.obstacle_sprite.position.y) 
        //once we have an img for the items, make sure it is the right resolution
    }
  }
}

/*
rest of gameplay
- timer --> connect to gamestate
- orders --> create some display and maybe animations if u r feeling fancy
- combining objects
*/