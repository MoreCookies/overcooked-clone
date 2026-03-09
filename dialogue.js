let scene = "start";
let text_bubble = null;

let saveButton, nahButton;
let potatoKing;

function preload() {
  backgroundlol = loadImage("assets/backgroundlol.png");
  // kitchenBG = loadImage("assets/kitchen.png");
  potatoImg = loadImage("assets/potatoking.png");
  titlepage = loadImage("assets/titlepage.png");
}

function setup() {
  createCanvas(900, 600);

  saveButton = new Button(width/2 - 220, height/2 + 120, 250, 80, "SAVE THE WORLD");
  nahButton = new Button(width/2 + 20, height/2 + 120, 250, 80, "Nah");
  potatoKing = new Character(150, height - 130);
}

function draw() {
  if (scene === "start") drawStartScene();
  if (scene === "intro") drawIntroScene();
  if (scene === "kitchenExplain") drawKitchenScene();
}

//Start Page Scene
function drawStartScene() {
  image(titlepage, 0, 0, width, height);
  fill(0);
  textAlign(CENTER, CENTER);
  textSize(44);
  textStyle(BOLD);

  saveButton.display();
  nahButton.display();
  // Troll dialogue 
  if (text_bubble) text_bubble.updateCenter();
}
//Intro Scene

function drawIntroScene() {

image(backgroundlol, 0, 0, width, height);

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

  if (scene === "start") {

    if (saveButton.isClicked()) {
      scene = "intro";
      text_bubble = new Dialogue([
        ".....", 
        "We don’t have much time for introductions.\nHi tRNA, my name is Potato King IV… AND WE ARE DOOMED!", 
        "You are our last hope… you must feed all these monsters before the timer runs out!",
        " Don’t worry;  I’ve provided you everything you need in my restaurant, Potato’s Cytoplasm.",
       "I’ll act as your RNA Polymerase,\nand I’ll break down each monster’s multi-dish order \n( each one of these monsters’ orders is like one gene in DNA)  into recipes, or mRNA.",
        "These creatures speak a weird form of English: \nmost of it looks normal, but some letters change (T → U), \nand I’ve translated them for you.",
        "Some monsters get feisty, so I’ve added a little extra paper at the end of the receipt ( your poly-A tail) \nto make sure their orders survive any chaos.", 
        "Of course, monsters are picky: some don’t want onions or lettuce, that's your introns, the little instructions scattered through the ticket.",
        "Every ticket has a heading (methyl cap) to tell you which monster this meal is for. Now let’s go to your kitchen…"
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

    // Click to advance dialogue
    if (text_bubble && text_bubble.isClickedCenter()) {
      text_bubble.next();
      if (text_bubble.finished()) text_bubble = null;
    }
  }

  else {

    if (text_bubble && text_bubble.isClickedSide()) {
      text_bubble.next();

      if (text_bubble.finished()) {

        if (scene === "intro") {
          scene = "kitchenExplain";
          text_bubble = new Dialogue([
            "This will be your kitchen, Ribosome 1. \nYour kitchen has different parts (rRNA):  your worktop, sink, oven, fridge, all the tools you need to prep the dishes.", 
            "You, tRNA, are the chief. \nYou’ll pick up ingredients and carry them across from station to station. Every order has 3 ingredients (the codons)  that make up the dish (1 amino acid).",
            "When you hand a dish to the counter (P site), you swap your appearance;\n you’re a new tRNA ready for the dish! The A site is where you accept the next dish recipe (mRNA).",
            "You’ll have a single giant plate for the whole order. That’s your start codon… place it first before cooking. \nThen follow the mRNA ticket exactly: ingredient by ingredient.",
            "You have 3:00 minutes. When the timer hits 0:00 (stop codon), the monster will roar (release factor). \nFinish in time or… 😨",
            "Now get to it! \nYour monsters are hungry, time is running, and Potato King IV is counting on you!"
          ]);
        } else {
          text_bubble = null;
        }
      }
    }
  }
}

// Diaglogue 

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
    image(potatoImg, this.x - 200, this.y - 450, 1000, 1000);
  }
}