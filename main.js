let scene = "start";
let text_bubble = null;

let saveButton, nahButton;
let potatoKing;

let gameState = "game"; //change back to cutscene later

let mouseClicked_X;
let mouseClicked_Y;
let direction = Math.PI/2;

let obstacles = [];
let in_focus = [];

let inventory = ""

function preload() {
  // worldFire = loadImage("assets/world_fire.png");
  // cytoplasmBG = loadImage("assets/cytoplasm.png");
  // kitchenBG = loadImage("assets/kitchen.png");
  // potatoImg = loadImage("assets/potato_king.png");
  characterImg = loadImage("assets/textbox.png"); //placeholder
}

function setup() {
  new Canvas(900, 600);
  
  saveButton = new Button(width/2 - 220, height/2 + 120, 250, 80, "SAVE THE WORLD");
  nahButton = new Button(width/2 + 20, height/2 + 120, 250, 80, "Nah");
  potatoKing = new Character(150, height - 130);

  character = new Sprite(250, 250, 20);
  character.color = "pink"
  character.visible = true;
  character.physics = DYN;
  interact_hitbox = new Sprite(250, 250, 35);
  interact_hitbox.debug = true
  interact_hitbox.physics = DYN;

  character.overlaps(interact_hitbox)
  
  //create obstacles
  obstacle1 = new Obstacle(400, 400, 60, 40, "SPAWN")
  obstacle2 = new Obstacle(465, 400, 60, 40, "CHOP")
  obstacle3 = new Obstacle(530, 400, 60, 40, "RETURN")

  obstacles.push(obstacle1)
  obstacles.push(obstacle2)
  obstacles.push(obstacle3)

  for(var i = 0; i<obstacles.length;i++) {
    obstacles.visible = true
    interact_hitbox.overlaps(obstacles[i].obstacle_sprite)
    character.collides(obstacles[i].obstacle_sprite)
  }
}

function draw() {
  background("beige")
  if (gameState == "cutscene") {
    if (scene === "start") drawStartScene();
    if (scene === "intro") drawIntroScene();
    if (scene === "kitchenExplain") drawKitchenScene();
  } else if (gameState == "game") {
    //Reset character velocity if it moves undirected by mouse, or reaches mouse position
    if (Math.abs(5-Math.sqrt(Math.pow(character.velocity.x,2) + Math.pow(character.velocity.y, 2))) > 0.1 ||
      Math.sqrt(Math.pow(character.position.x-mouseClicked_X,2)+Math.pow(character.position.y-mouseClicked_Y,2)) <= 5) {
      character.velocity.x = 0
      character.velocity.y = 0
    }

    //Interact hitbox
    displaced = p5.Vector.add(character.position, createVector(30*Math.cos(direction),30*Math.sin(direction)))
    interact_hitbox.position = createVector(displaced.x, displaced.y)
    
    //obstacles
    for(var i = 0; i<obstacles.length;i++) {
      
      //Check for collision & add to focus
      obstacles[i].display()
      if (character.collides(obstacles[i].obstacle_sprite)) { character.velocity = createVector(0,0) }
      if(interact_hitbox.overlapping(obstacles[i].obstacle_sprite)) { obstacles[i].focus = true; }
      else { obstacles[i].focus = false }
      
      if(!in_focus.includes(i) && obstacles[i].focus) { in_focus.push(i) }

      //Handle multiple focuses
      if(in_focus.length > 1) {
        closest=[0,10000]
        for(var k = 0; k<in_focus.length;k++) {
          distance = obstacles[in_focus[k]].obstacle_sprite.position.dist(interact_hitbox.position)
          console.log(k + ": " + distance)
          if(distance < closest[1]) {
            closest[0] = in_focus[k]
            closest[1] = distance
          } else {
            obstacles[in_focus[k]].focus = false
          }
          console.log("Closest: " + closest[0])
        }
        in_focus=[closest[0]]
        //console.log(in_focus)
        //console.log("Closest: " + closest[0])
      }
    }
    if(kb.presses("space")) {
        //interaction behaviour
        /*4 types of interaction
        CHANGE --> chop, cook, boil... etc.
        GET --> obtain new item, spawned
        PLACE --> put down item (e.g. counters, will display item on top)
        
        TURN IN --> fulfill orders
        */
        workstation_type = obstacles[in_focus[0]].type
        console.log(workstation_type)
        obstacles[in_focus[0]].interact()
    }
  }
  
}

//Start Page Scene
function drawStartScene() {
  // image(worldFire, 0, 0, width, height);
  background(150, 30, 30);

  fill(255);
  textAlign(CENTER, CENTER);
  textSize(44);
  textStyle(BOLD);

  text(
    "Oh No, The Beast is Hungry!\nWe must save the world from their wrath!",
    width/2,
    height/2 - 150
  );

  saveButton.display();
  nahButton.display();
  // Troll dialogue 
  if (text_bubble) text_bubble.updateCenter();
}
//Intro Scene
function drawIntroScene() {

  // image(cytoplasmBG, 0, 0, width, height);
  background(70, 40, 15);

  // Placeholder monster eyes
  fill(255);
  ellipse(250, 150, 25); ellipse(285, 150, 25);
  ellipse(450, 180, 25); ellipse(485, 180, 25);
  ellipse(650, 160, 25); ellipse(685, 160, 25);

  potatoKing.display();

  if (text_bubble) text_bubble.updateSide();
}

//Kitchen Scene
function drawKitchenScene() {
  // image(kitchenBG, 0, 0, width, height);
  background(110, 85, 50);

  fill(255);
  textAlign(CENTER, CENTER);
  textSize(36);
  textStyle(BOLD);
  text("Ribosome 1 - Your Kitchen", width/2, 70);

  potatoKing.display();

  if (text_bubble) text_bubble.updateSide();
}

//Click Handler
function mouseClicked() {
  mouseClicked_X = mouseX
  mouseClicked_Y = mouseY
  if (gameState=="cutscene") {
    // Click to advance dialogue
    if (text_bubble && (text_bubble.isClickedCenter || text_bubble.isClickedSide)) {
      text_bubble.next();
    }
    if (scene === "start") {
      if (saveButton.isClicked()) {
        scene = "intro";
        text_bubble = new Dialogue([
          "We don’t have much time for introductions.\nHi tRNA, my name is Potato King IV...",
          "AND WE ARE DOOMED!",
          "You are our last hope.\nYou must feed all these monsters before the timer runs out!",
          "I have provided everything you need in my restaurant 'Potato's Cytoplasm'.",
          "You will work in Ribosome 1.",
          "I'll act as RNA Polymerase and break down vile creatures' orders (DNA genes)\ninto recipes (mRNA) at the nucleus front desk."
        ]);
      }
      if (nahButton.isClicked()) {
        text_bubble = new Dialogue([
          "...",
          "The world burns.",
          "The monsters roar.",
          "You monster.",
          "Fine. Click SAVE THE WORLD."
        ]);
      }
      if (text_bubble.finished()) {
        scene = "kitchenExplain"
        text_bubble = null
       };
    } else if (text_bubble.finished() && scene == "intro") {
      scene = "kitchenExplain";
      text_bubble = new Dialogue([
        "This will be your kitchen (Ribosome 1).",
        "Your kitchen has different parts (rRNA): worktop, sink, oven, fridge...",
        "You can collect ingredients from each station.",
        "You have 3:00 minutes.",
        "When the timer hits 0:00 (stop codon), the monster roars (release factor)...",
        "Which means TIME'S UP 😨",
        "Before starting any order (mRNA), you must place ONE giant plate (start codon).",
        "Only ONE plate for ALL dishes.",
        "Good luck, tRNA."
      ]);
    } else if (text_bubble.finished() && scene == "kitchenExplain") {
      gameState = "game"
    }
  } else if (gameState == "game" && mouseClicked_X < 900 && mouseClicked_Y < 600) {
    for(var i = 0; i<obstacles.length;i++) {
      obstacles[i].focus = false
      in_focus = []
    }

    //Click to move
    dist = Math.sqrt(Math.pow(character.position.x-mouseClicked_X,2)+Math.pow(character.position.y-mouseClicked_Y,2))
    character.velocity.x = ((mouseClicked_X-character.position.x)/dist)*5
    character.velocity.y = ((mouseClicked_Y-character.position.y)/dist)*5

    //Interact_hitbox follows mouse click direction
    direction = Math.atan(character.velocity.y/character.velocity.x)
    if (character.velocity.x < 0) { direction = (Math.PI)+direction }
  }
}

// Dialogue 

class Dialogue {
  constructor(msgs) {
    this.msgs = msgs;
    this.index = 0;
  }

  // Center dialogue 
  updateCenter() {
    fill(255);
    stroke(0);
    rect(width/2 - 350, height - 200, 700, 120, 20);

    fill(0);
    textAlign(CENTER, CENTER);
    textSize(22);
    text(this.msgs[this.index], width/2, height - 140);
  }

  // Side dialogue (Potato King scenes)
  updateSide() {
    fill(255);
    stroke(0);
    rect(280, height - 230, 580, 160, 20);

    fill(0);
    textAlign(LEFT, TOP);
    textSize(22);
    text(this.msgs[this.index], 310, height - 210, 540);
  }

  isClickedCenter() {
    return (
      mouseX > width/2 - 350 &&
      mouseX < width/2 + 350 &&
      mouseY > height - 200 &&
      mouseY < height - 80
    );
  }

  isClickedSide() {
    return (
      mouseX > 280 &&
      mouseX < 860 &&
      mouseY > height - 230 &&
      mouseY < height - 70
    );
  }

  next() {
    this.index++;
  }

  finished() {
    return this.index >= this.msgs.length;
  }
}

// Button

class Button {
  constructor(x, y, w, h, label) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.label = label;
  }

  display() {
    fill(255);
    rect(this.x, this.y, this.w, this.h, 15);

    fill(0);
    textAlign(CENTER, CENTER);
    textSize(24);
    text(this.label, this.x + this.w/2, this.y + this.h/2);
  }

  isClicked() {
    return (
      mouseX > this.x &&
      mouseX < this.x + this.w &&
      mouseY > this.y &&
      mouseY < this.y + this.h
    );
  }
}

// character

class Character {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  display() {
    // image(potatoImg, this.x - 90, this.y - 140, 180, 220);
    fill(190, 140, 80);
    ellipse(this.x, this.y, 160, 200);

    fill(0);
    textAlign(CENTER, CENTER);
    textSize(40);
    text("👑", this.x, this.y - 120);
  }
}