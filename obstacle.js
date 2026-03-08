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

  interact(ingredients) {
    console.log(this.type)
    
    //Check if the ingredient is mutable by this workstation
    if(["CHOP", "COOK", "BOIL"].includes(this.type) && ingredients[this.item][(this.type)]) {
      console.log("changing!")
      this.progress += 20;
      if (this.progress == 100) {
        //create new item on the obstacle
        this.progress = 0
        //this.item.change(this.type) //Change item into different type
      }
    } else if(this.type == "NONE") { //THIS IS JUST A TABLE
      this.item = null //the item has been picked up!
    }
  }

  display() {
    strokeWeight(2);
    if (this.focus) { this.obstacle_sprite.stroke = "black" } else { this.obstacle_sprite.stroke = "white" }
    noStroke();

    // Cooking station
    if(["CHOP", "COOK", "BOIL"].includes(this.type)) {
      //Show progress bar
      rectMode(CENTER)
      fill("green")
      rect(this.obstacle_sprite.position.x, this.obstacle_sprite.position.y-30, this.progress*(0.3), 10)
      noFill()
      stroke(0)
      rect(this.obstacle_sprite.position.x, this.obstacle_sprite.position.y-30, 30, 10)
      noStroke();
    }
    //Display item
    if(this.item) {
      if(this.item.imgref) { image(this.item.imgref, this.obstacle_sprite.position.x, this.obstacle_sprite.position.y) }
      else { text("🍅", this.obstacle_sprite.position.x, this.obstacle_sprite.position.y)} //temp
      //once we have an img for the items, make sure it is the right resolution
    }
  }
}

/*
rest of gameplay
- timer --> connect to gamestate
- orders --> create some display and maybe animations if u r feeling fancy (we r not fancy rn)
- combining objects
*/