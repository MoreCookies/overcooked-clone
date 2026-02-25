function preload() {

}

function setup() {
  createCanvas(400, 400);
  text_bubble = new dialogue(["hello world", "welcome to this very awesome project"])
  
}

function draw() {
  background(220);
  if (text_bubble != null) {
    text_bubble.update()
  }
}

class dialogue {
  constructor(msgs) {
    this.msgs = msgs
    this.index = 0
  }

  update() {
    stroke("black")
    fill(255)
    rect(20, 300, 360, 80)
    text(this.msgs[this.index], 40, 320, 320)
  }
}

function mouseClicked() {
  if ((mouseX < 380 && mouseX > 20) && (mouseY > 300 && mouseY < 380)) {
    text_bubble.index++
  }
  if(text_bubble.index == text_bubble.msgs.length) {
    text_bubble = null  
  }
}

class character {
  constructor(imgref, startPos) {
    this.img = load(imgref)
    this.startPos = startPos
  }
}