class Obstacle {
  constructor(x, y, w, h, type, imgref, item_spawn=null) {
    console.log(item_spawn)
    this.obstacle_sprite = new Sprite(x, y, w, h)
    //Note: hitboxes scale from the center of the sprite
    this.obstacle_sprite.physics = STATIC;
    //this.obstacle_sprite.color = "blue"
    this.w = w
    this.h = h
    this.imgref = imgref
    console.log(imgref)
    this.item_spawn = item_spawn
    this.obstacle_sprite.draw = () => {
      noFill();
      strokeWeight(3)
      if (this.focus) { this.obstacle_sprite.layer = 2; stroke("black"); rect(0, 0, 50, 50) } else { this.obstacle_sprite.layer = 1 }
      if(this.imgref) { image(this.imgref, 0, 0)}
      noStroke();

      // Cooking station
      if(["CHOP", "COOK", "BOIL"].includes(this.type)) {
        //Show progress bar
        rectMode(CENTER)
        fill("green")
        strokeWeight(1);
        rect(0, -35, this.progress*(0.3), 10)
        noFill()
        stroke(0)
        rect(0, -35, 30, 10)
        noStroke();
      }
      //Display item
      if(this.item) {
        if(ingredients[this.item].imgref) { image(ingredients[this.item].imgref, 0, 0) }
        else { fill("red"); ellipse(0, 0, 20); noFill(); } //temp
        //once we have an img for the items, make sure it is the right resolution
      }
    }


    this.focus = false
    this.progress = 0;
    this.type = type
    

    //this will be the item on the obstacle, only for types: "CHOP", "COOK", "BOIL", "NONE" (table),
    this.item = null 
  }

  interact(ingredients) {
    console.log(this.type)
    
    //Check if the ingredient is mutable by this workstation
    console.log(this.item)
    console.log(ingredients)
    if(["CHOP", "COOK", "BOIL"].includes(this.type) && ingredients[this.item].recipes[this.type]) {
      console.log("changing!")
      this.progress += 20;
      if (this.progress == 100) {
        //create new item on the obstacle
        this.progress = 0
        this.item = ingredients[this.item].change(this.type)
        //this.item.change(this.type) //Change item into different type
      }
      return true
    }
    // } else if(this.type == "NONE") { //THIS IS JUST A TABLE
    //   this.item = null //the item has been picked up!
    // }
    return false
  }
}

/*
rest of gameplay
- timer --> connect to gamestate
- orders --> create some display and maybe animations if u r feeling fancy (we r not fancy rn)
- combining objects
*/