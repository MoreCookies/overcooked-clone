let endSceneAssets = {};
let endSceneClicked = {d: false, n: false, a: false};

function preload() {
  endSceneAssets.bg = loadImage("assets/kitchenfloor.png");
  endSceneAssets.potatoKingSmile = loadImage("assets/potatokingsmile.png");
  endSceneAssets.d1 = loadImage("assets/d1.png");
  endSceneAssets.d2 = loadImage("assets/d2.png");
  endSceneAssets.n1 = loadImage("assets/n1.png");
  endSceneAssets.n2 = loadImage("assets/n2.png");
  endSceneAssets.a1 = loadImage("assets/a1.png");
  endSceneAssets.a2 = loadImage("assets/a2.png");
}

function setup() {
  createCanvas(900, 600);
}

function draw() {
  background(255, 238, 140);

  if(endSceneAssets.bg) image(endSceneAssets.bg, width, height, width, height);
  if(endSceneAssets.potatoKingSmile) image(endSceneAssets.potatoKingSmile, -70, 170, 400, 500);

  fill(255); stroke(0);
  rect(width/2 - 200, height - 120, 400, 80, 20);
  fill(0); textAlign(CENTER, CENTER); textSize(28);
  text("YAY! U did it!", width/2, height - 80);

  fill('red'); textSize(100); textStyle(BOLD); textAlign(CENTER, CENTER);
  text("ROAR! :)", width/2, 80);

  let assetsToShow = [
    {id: "d", x: 250, y: 150, img: endSceneClicked.d ? endSceneAssets.d2 : endSceneAssets.d1},
    {id: "n", x: 400, y: 120, img: endSceneClicked.n ? endSceneAssets.n2 : endSceneAssets.n1},
    {id: "a", x: 550, y: 120, img: endSceneClicked.a ? endSceneAssets.a2 : endSceneAssets.a1},
  ];
  assetsToShow.forEach(obj => { if(obj.img) image(obj.img, obj.x, obj.y, 500, 500); });
}

function mouseClicked() {
  let positions = {d:{x:150,y:120}, n:{x:450,y:120}, a:{x:750,y:120}};
  for(let key in positions) {
    let pos = positions[key];
    if(dist(mouseX, mouseY, pos.x, pos.y) < 90) endSceneClicked[key] = !endSceneClicked[key];
  }
}