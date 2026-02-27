let scene = "start";
let text_bubble = null;

let saveButton, nahButton;
let potatoKing;

let gameState = "cutscene";

let mouseClicked_X;
let mouseClicked_Y;
function preload() {
  // worldFire = loadImage("assets/world_fire.png");
  // cytoplasmBG = loadImage("assets/cytoplasm.png");
  // kitchenBG = loadImage("assets/kitchen.png");
  // potatoImg = loadImage("assets/potato_king.png");
  characterImg = loadImage("assets/textbox.png"); //placeholder
}

function setup() {
  createCanvas(900, 600);

  saveButton = new Button(width/2 - 220, height/2 + 120, 250, 80, "SAVE THE WORLD");
  nahButton = new Button(width/2 + 20, height/2 + 120, 250, 80, "Nah");
  potatoKing = new Character(150, height - 130);

  character = new Sprite(250, 250, 20);
  character.color = "blue"
  interact_hitbox = new Sprite();
  interact_hitbox.width=20;
  interact_hitbox.height=20;
  
  //character.image = characterImg;
}

function draw() {
  background("yellow")
  if (gameState == "cutscene") {
    if (scene === "start") drawStartScene();
    if (scene === "intro") drawIntroScene();
    if (scene === "kitchenExplain") drawKitchenScene();
  } else if (gameState == "game") {
    //player movement
    character.display()
    if (Math.sqrt(Math.pow(character.position.x-mouseClicked_X,2)+Math.pow(character.position.y-mouseClicked_Y,2)) <= 5) {
      character.velocity.x = 0
      character.velocity.y = 0
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
      console.log("next!")
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
  } else if (gameState == "game") {
    dist = Math.sqrt(Math.pow(character.position.x-mouseClicked_X,2)+Math.pow(character.position.y-mouseClicked_Y,2))
    character.velocity.x = ((mouseClicked_X-character.position.x)/dist)*5
    character.velocity.y = ((mouseClicked_Y-character.position.y)/dist)*5
    
    
    //moveTo(mouseX, mouseY, 5); but with more steps
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