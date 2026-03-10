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

let item_held = "lettuce";

//For next dish game logic
let dish_recipes;
let ingredients;
let current_order;
let remaining_dishes = 10-Math.floor(Math.random()*3)
console.log(remaining_dishes)

//let inventory = null;

function preload() {
  backgroundlol = loadImage("assets/backgroundlol.png");
  kitchenBG = loadImage("assets/kitchenfloor.png");
  potatoImg = loadImage("assets/potatoking.png");
  titlepage = loadImage("assets/titlepage.png");
  characterImg1 = loadImage("assets/character_right1.png")
  characterImg2 = loadImage("assets/character_right2.png")

  //Load items
  tomatoImg = loadImage("assets/tomato.png")
  lettuceImg = loadImage("assets/lettuce.png")
  onionImg = loadImage("assets/onion.png")
  salad2Img = loadImage("assets/salad2.png")
  salad1Img = loadImage("assets/salad1.png")
  boiled_tomato = loadImage("assets/boiled_tomato.png")
  cut_onionsImg = loadImage("assets/cut_onions.png")
  cut_lettuceImg = loadImage("assets/cutlettuce.png")
  cut_tomatoImg = loadImage("assets/cuttomato.png")
  cut_cucumberImg = loadImage("assets/cutcucumber.png")

  tableImg = loadImage("assets/table.png")
  choppingBoardImg = loadImage("assets/chopping_board.png")
  returnTableImg = loadImage("assets/serve_table.png")
  garbageImg = loadImage("assets/garbage.jpg")
}

function setup() {
  tomatoImg.resize(30, 0)
  lettuceImg.resize(30, 0)
  onionImg.resize(30, 0)
  tableImg.resize(50, 0)
  choppingBoardImg.resize(50, 0)
  returnTableImg.resize(50, 0)
  garbageImg.resize(50, 0)
  salad1Img.resize(30, 0)
  salad2Img.resize(30, 0)
  cut_onionsImg.resize(30, 0)
  cut_lettuceImg.resize(35, 0)
  cut_tomatoImg.resize(35, 0)


  characterImg1.resize(40, 0)
  characterImg2.resize(40, 0)

  new Canvas(900, 600);
  saveButton = new Button(width/2 - 220, height/2 + 120, 250, 80, "SAVE THE WORLD");
  nahButton = new Button(width/2 + 20, height/2 + 120, 250, 80, "Nah");
  potatoKing = new Character(150, height - 130);

  character = new Sprite(250, 250, 40);
  character.color = "pink"
  character.physics = DYN;

  character.frames = [characterImg1, characterImg2];
  character.frameIndex = 0;

  character.image = character.frames[0];
  
  interact_hitbox = new Sprite(250,250,35);
  interact_hitbox.debug = true;
  interact_hitbox.physics = DYN;
  angleMode(DEGREES)

  character.draw = () => {
    push() 
    rotate(-character.rotation)
    if(direction > Math.PI/2) { scale(-1, 1) }
    image(character.image, 0, 0)
    pop()
    pop() //pops the draw translations
    if(item_held) { image(ingredients[item_held].imgref, interact_hitbox.position.x, interact_hitbox.position.y) }
  }

  ingredients = {};

  tomato = new Ingredient("tomato", {"CHOP":"cut_tomato"},tomatoImg);
  lettuce = new Ingredient("lettuce", {"CHOP":"cut_lettuce"},lettuceImg);
  onion = new Ingredient("onion", {"CHOP":"cut_onion"}, onionImg);
  cut_lettuce = new Ingredient("cut_lettuce", {}, cut_lettuceImg);
  cut_onion = new Ingredient("cut_onion", {}, cut_onionsImg);
  cut_tomato = new Ingredient("cut_tomato", {}, cut_tomatoImg);

  character.overlaps(interact_hitbox)

  //Set up items
  //Definitions of all items, any existing instances IN THE GAME are just the NAMES OF THE ITEMS
  ingredients  = {}

  tomato = new Ingredient ("tomato", {"CHOP": "cut_tomato", "COOK": "boiled_tomato"}, tomatoImg)
  cut_tomato = new Ingredient ("cut_tomato", {}, cut_tomatoImg) //Cut tomato is a final processig of the tomato
  lettuce = new Ingredient ("lettuce", {"CHOP": "cut_lettuce"}, lettuceImg)
  cut_lettuce = new Ingredient ("cut_lettuce", {}, cut_lettuceImg) //Cut tomato is a final processig of the tomato
  onion = new Ingredient ("onion", {"CHOP": "cut_onion"}, onionImg)
  cut_onion = new Ingredient ("cut_onion", {}, cut_onionsImg)

  salad1 = new Ingredient("salad1", {}, salad1Img)
  salad2 = new Ingredient("salad2", {}, salad2Img)

  ingredients[tomato.id] = tomato
  ingredients[cut_tomato.id] = cut_tomato
  ingredients[lettuce.id] = lettuce
  ingredients[cut_lettuce.id] = cut_lettuce
  ingredients[onion.id] = onion
  ingredients[cut_onion.id] = cut_onion
  ingredients[salad1.id] = salad1
  ingredients[salad2.id] = salad2
  

  imageMode(CENTER)

  //Recipes for assembly of foods
  dish_recipes  = {"salad1": ["cut_lettuce", "cut_onion"], "salad2": ["cut_lettuce", "cut_tomato"]}

  current_order = Object.keys(dish_recipes)[Math.floor(Math.random()*Object.keys(dish_recipes).length)]
  console.log(current_order)

  //create obstacles
  obstaclea = new Obstacle(300, 400, 50, 50, "SPAWN", tableImg, item_spawn="tomato")
  obstacle0 = new Obstacle(350, 400, 50, 50, "SPAWN", tableImg, item_spawn="onion")
  obstacle1 = new Obstacle(400, 400, 50, 50, "SPAWN", tableImg, item_spawn="lettuce")
  obstaclea.item = "tomato"
  obstacle0.item = "onion"
  obstacle1.item = "lettuce"
  obstacle2 = new Obstacle(450, 400, 50, 50, "CHOP", choppingBoardImg, item_spawn=null)
  obstacle3 = new Obstacle(500, 400, 50, 50, "GARBAGE", garbageImg, item_spawn=null)
  obstacle4 = new Obstacle(550, 400, 50, 50, "RETURN", returnTableImg, item_spawn=null)
  obstacle5 = new Obstacle(600, 400, 50, 50, "NONE", tableImg, item_spawn=null)
  obstacle6 = new Obstacle(650, 400, 50, 50, "NONE", tableImg, item_spawn=null)
  obstacle7 = new Obstacle(650, 400, 50, 50, "NONE", tableImg, item_spawn=null)

  obstacles.push(obstaclea)
  obstacles.push(obstacle0)
  obstacles.push(obstacle1)
  obstacles.push(obstacle2)
  obstacles.push(obstacle3)
  obstacles.push(obstacle4)
  obstacles.push(obstacle5)
  obstacles.push(obstacle6)
  obstacles.push(obstacle7)

  //Set to make invisible, temp rn
  character.visible = true
  character.layer = 2
  for(var i = 0; i<obstacles.length;i++) {
    obstacles.visible = true
    interact_hitbox.overlaps(obstacles[i].obstacle_sprite)
    character.collides(obstacles[i].obstacle_sprite)
    //obstacles[i].obstacle_sprite.layer = 1
  }
}

function draw() {
  background("beige")
  if (gameState == "cutscene") {
    if (scene === "start") drawStartScene();
    if (scene === "intro") drawIntroScene();
    if (scene === "kitchenExplain") drawKitchenScene();
  } else if (gameState == "game") {
    character.rotation = 0;
    frame = floor(frameCount / 10) % character.frames.length;
    if (character.velocity.x != 0 || character.velocity.y != 0) {character.image = character.frames[frame]; }

    //Display orders
    textSize(20)
    text("Current amino acid: " + current_order, 50, 50)
    text("Codon: " + dish_recipes[current_order], 50, 100)
    text("Codons remaining: " + remaining_dishes, 50, 150)

    //Reset character velocity if it moves undirected by mouse, or reaches mouse position
    if (Math.abs(5-Math.sqrt(Math.pow(character.velocity.x,2) + Math.pow(character.velocity.y, 2))) > 0.1 ||
      Math.sqrt(Math.pow(character.position.x-mouseClicked_X,2)+Math.pow(character.position.y-mouseClicked_Y,2)) <= 5
    ) {
      character.velocity.x = 0
      character.velocity.y = 0
    }

    //Interact hitbox
    displaced = p5.Vector.add(character.position, createVector(30*Math.cos(direction),30*Math.sin(direction)))
    interact_hitbox.position = createVector(displaced.x, displaced.y)
    
    //Display item being held, would be an image but just ellipse as placeholder
    
    //obstacles
    for(var i = 0; i<obstacles.length;i++) {
      //Check for collision & add to focus
      //obstacles[i].display()
      if (character.collides(obstacles[i].obstacle_sprite)) { character.velocity = createVector(0,0) }
      if(interact_hitbox.overlapping(obstacles[i].obstacle_sprite)) { obstacles[i].focus = true; }
      else if (in_focus.includes(i)) { in_focus.splice(in_focus.indexOf(i)); obstacles[i].focus = false }
      else { obstacles[i].focus = false }
      
      if(!in_focus.includes(i) && obstacles[i].focus) { in_focus.push(i) }

      //Handle multiple focuses
      if(in_focus.length > 1) {
        closest=[0,10000]
        for(var k = 0; k<in_focus.length;k++) {
          distance = obstacles[in_focus[k]].obstacle_sprite.position.dist(interact_hitbox.position)
          if(distance < closest[1]) {
            closest[0] = in_focus[k]
            closest[1] = distance
          } else {
            obstacles[in_focus[k]].focus = false
          }
        }
        in_focus=[closest[0]]
      }
    }
    
    //interaction behaviour
    if(kb.presses("space") && in_focus.length > 0) {
      workstation_type = obstacles[in_focus[0]].type
      console.log(item_held)
      if(!item_held) {
        console.log("no item held!")
        if(["CHOP","COOK","BOIL"].includes(workstation_type) && obstacles[in_focus[0]].item && ingredients[obstacles[in_focus[0]].item].recipes[workstation_type]) {
          //Interact with a cooking workbench
          obstacles[in_focus[0]].interact(ingredients)
          console.log("doing some cooking!")
        } else if(workstation_type == "SPAWN") {
          //if obstacle is a spawner
          item_held = obstacles[in_focus[0]].item_spawn
          console.log("picked up item from spawner")
        } else if(obstacles[in_focus[0]].item && workstation_type != "SPAWN") {
          //Pick up an item , or there is an item to be picked up
          item_held = obstacles[in_focus[0]].item
          obstacles[in_focus[0]].item = null
          console.log("picked up item!")
        }
      } else if(item_held) {
        //COMBINING TO MAKE DISH
        if(obstacles[in_focus[0]].item == "plate")

        //Put item down
        console.log("item held!")
        if(workstation_type == "RETURN" && item_held == current_order) {
          //Return dish
          item_held = null
          current_order = Object.keys(dish_recipes)[Math.floor(Math.random()*Object.keys(dish_recipes).length)]
          
          remaining_dishes -= 1;
          console.log("item returned!")
        } else if (workstation_type == "GARBAGE") {
          //Throw item away
          item_held = null
          console.log("item thrown away!")
        } else if(obstacles[in_focus[0]].item == null && workstation_type != "SPAWN" && workstation_type != "RETURN") {
          obstacles[in_focus[0]].item = item_held
          item_held = null
          console.log("item put down!")
        } else if(obstacles[in_focus[0]].item) {
          //Try combining
          console.log("tried combining")
          possible_dish = [obstacles[in_focus[0]].item, item_held]
          console.log(possible_dish)
          for(var i = 0; i<Object.keys(dish_recipes).length;i++) {
            //isEqual = (dish_recipes[Object.keys(dish_recipes)[i]][0] == possible_dish[0] && dish_recipes[Object.keys(dish_recipes)[i]][1] == possible_dish[1])
            
            isEqual = dish_recipes[Object.keys(dish_recipes)[i]].every((element, index) => element === possible_dish[index]);
            console.log(isEqual)
            if(isEqual) {
              console.log("COMBIEND!")
              item_held = Object.keys(dish_recipes)[i]
              obstacles[in_focus[0]].item = null
            }
            
            // recipe = (isEqual) ? Object.keys(dish_recipes)[i] : "";
            // console.log(recipe)
            // item_held = recipe
          }
          
        }
      }
    }
  }
}
// start page scene
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
      if (text_bubble.finished()) {
        scene = "kitchenExplain"
        text_bubble = null
       };
    } else if (text_bubble.finished() && scene == "intro") {
      scene = "kitchenExplain";
      text_bubble = new Dialogue([
            "This will be your kitchen, Ribosome 1. \nYour kitchen has different parts (rRNA):  your worktop, sink, oven, fridge, all the tools you need to prep the dishes.", 
            "You, tRNA, are the chief. \nYou’ll pick up ingredients and carry them across from station to station. Every order has 3 ingredients (the codons)  that make up the dish (1 amino acid).",
            "When you hand a dish to the counter (P site), you swap your appearance;\n you’re a new tRNA ready for the dish! The A site is where you accept the next dish recipe (mRNA).",
            "Your first dish is the start codon.\nThen follow the mRNA ticket exactly: ingredient by ingredient.",
            "When you finish the last dish (stop codon), the monster will roar (release factor). \nIf it roars happily, you win! If it roars angrily, you lose. Now get to it!",
            "Now get to it! \nYour monsters are hungry and Potato King IV is counting on you!"
          ]);
    } else if (text_bubble.finished() && scene == "kitchenExplain") {
      gameState = "game"
      //Show all sprites
      character.visible = true
      item_held.visible = true
      for(var i = 0; i<obstacles.length;i++) {
        obstacles.visible = true
        interact_hitbox.overlaps(obstacles[i].obstacle_sprite)
        character.collides(obstacles[i].obstacle_sprite)
      }
    }
  } else if (gameState == "game" && mouseClicked_X < 900 && mouseClicked_Y < 600) {
    for(var i = 0; i<obstacles.length;i++) {
      obstacles[i].focus = false
      in_focus = []
    }

    //Interact_hitbox follows mouse click direction
    direction = Math.atan((mouseClicked_Y-character.position.y)/(mouseClicked_X-character.position.x))
    
    if (mouseClicked_X-character.position.x < 0) { direction = (Math.PI)+direction }

    //Click to move
    dist = Math.sqrt(Math.pow(character.position.x-mouseClicked_X,2)+Math.pow(character.position.y-mouseClicked_Y,2))
    character.velocity = createVector(Math.cos(direction) * 5, Math.sin(direction) * 5)
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
    image(potatoImg, this.x - 200, this.y - 450, 1000, 1000);
  }
}
function drawEndScene() {
  background(200);
  if (endSceneAssets.bg) image(endSceneAssets.bg, width/2, height/2, width, height);
  if (endSceneAssets.potatoKingSmile) image(endSceneAssets.potatoKingSmile, width/2, height/2 + 50, 300, 300);

  fill(255); stroke(0);
  rect(width/2 - 150, 50, 300, 80, 20);
  fill(0); textAlign(CENTER, CENTER); textSize(28);
  text("YAY! U did it!", width/2, 90);

  let assetsToShow = [
    {id: "d", x: 150, y: 400, img: endSceneClicked.d ? endSceneAssets.d2 : endSceneAssets.d1},
    {id: "n", x: 400, y: 400, img: endSceneClicked.n ? endSceneAssets.n2 : endSceneAssets.n1},
    {id: "a", x: 650, y: 400, img: endSceneClicked.a ? endSceneAssets.a2 : endSceneAssets.a1},
  ];

  assetsToShow.forEach(obj => { if(obj.img) image(obj.img, obj.x, obj.y, 100, 100); });
}

function handleEndSceneClicks() {
  let positions = {d:{x:150,y:400}, n:{x:400,y:400}, a:{x:650,y:400}};
  for(let key in positions) {
    let pos = positions[key];
    if(dist(mouseX, mouseY, pos.x, pos.y) < 50) endSceneClicked[key] = !endSceneClicked[key];
  }
}