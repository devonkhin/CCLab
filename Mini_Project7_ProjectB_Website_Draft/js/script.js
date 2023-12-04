let tree;
let noofflower = 60;
let flower = [];
let button1;
let button2;
let button3;
let button4;
let r = 163;
let g = 212;
let b = 104;
let winter = false;
let spring = true;
let summer = false;
let fall = false;

function setup() {
  createCanvas(1200, 800);

  let cnv=createCanvas(1200, 800);
  cnv.parent("canvasWrapper");

  tree = new branch(width / 2, height - 200);
  for (let i = 0; i < noofflower; i++) {
    flower[i] = new Flower(random(width), random(-1000, 0));
  }
  button1 = createButton("Winter");
  button1.position(800, 1038);
  button1.size(100, 60);
  button1.mousePressed(() => {
    r = 182;
    g = 208;
    b = 226;
    winter = true;
    spring = false;
    summer = false;
    fall = false;
  });
  button2 = createButton("Spring");
  button2.position(500, 1038);
  button2.size(100, 60);
  button2.mousePressed(() => {
    r = 163;
    g = 212;
    b = 104;
    winter = false;
    spring = true;
    summer = false;
    fall = false;
  });
  button3 = createButton("Summer");
  button3.position(600, 1038);
  button3.size(100, 60);
  button3.mousePressed(() => {
    r = 249;
    g = 214;
    b = 46;
    winter = false;
    spring = false;
    summer = true;
    fall = false;
  });
  button4 = createButton("Fall");
  button4.position(700, 1038);
  button4.size(100, 60);
  button4.mousePressed(() => {
    r = 247;
    g = 151;
    b = 98;
    winter = false;
    spring = false;
    summer = false;
    fall = true;
  });
}

function draw() {
  background(r, g, b);

  tree.update();
  tree.display();

  for (let i = 0; i < flower.length; i++) {
    let f = flower[i];
    f.update();
    f.collision(flower);
    f.slowdown();
    f.wind();
    if (spring == true) {
      f.springDisplay();
    }
    if (summer == true) {
      f.summerDisplay();
    }
    if (fall == true) {
      f.fallDisplay();
    }
    if (winter == true) {
      f.winterDisplay();
    }
  }
  if (flower.length > 80) {
    flower.splice(0, 1);
  }
}

function mousePressed() {
  if (mouseX > 0 && mouseX < 1200 && mouseY > 0 && mouseY < 800) {
    if (dist(600, 350, mouseX, mouseY) < 200) {
      flower.push(new Flower(mouseX, mouseY, false));
    } else {
      flower.push(new Flower(mouseX, mouseY));
    }
  }
}

class Flower {
  constructor(startX, startY, falling = true) {
    this.x = startX;
    this.y = startY;
    this.ySpeed = random(2, 10);
    this.falling = falling;
    this.maxY = height;
    // this.appearAgain();
    this.dia = 200;
    this.contact = false;
  }

  appearAgain() {
    setTimeout(() => {
      this.falling = true;
      this.x = random(width);
      this.y = -random(500, 200);
    }, random(1000, 5000)); //1 to 5 second
  }

  update() {
    if (this.falling) {
      this.y += this.ySpeed;
      if (this.y >= this.maxY) {
        this.y = this.maxY;
        this.falling = false;
        this.appearAgain();
      }
      if (this.x > 1200) {
        this.x = random(0, 600);
      }
      if (this.x < 0) {
        this.x = random(600, 1200);
      }
    }
  }

  springDisplay() {
    push();
    translate(this.x, this.y);
    for (let i = 0; i < 20; i++) {
      stroke(255, 194, 245);
      strokeWeight(15);
      line(0, 0, random(-8, 8), random(-8, 8));
    }
    for (let i = 0; i < 20; i++) {
      stroke(117, 0, 98);
      strokeWeight(2);
      line(0, 0, random(-8, 8), random(-8, 8));
    }

    pop();
  }

  summerDisplay() {
    push();
    translate(this.x, this.y);
    for (let i = 0; i < 1; i++) {
      stroke(45, 184, 61);
      strokeWeight(5);
      line(10, 8, -1, -1);
    }
    for (let i = 0; i < 1; i++) {
      stroke(192, 0, 0);
      strokeWeight(15);
      circle(10, 10, 5);
    }

    pop();
  }

  fallDisplay() {
    push();
    translate(this.x, this.y);
    for (let i = 0; i < 1; i++) {
      stroke(177, 32, 0);
      strokeWeight(10);
      line(-10, -13, random(-3, 3), random(-3, 3));
    }

    pop();
  }

  winterDisplay() {
    push();
    translate(this.x, this.y);
    for (let i = 0; i < 20; i++) {
      stroke(255);
      strokeWeight(2);
      line(0, 0, random(-10, 10), random(-10, 10));
    }

    pop();
  }

  slowdown() {
    if (this.contact) {
      this.ySpeed = 0.8;
    } else {
      this.ySpeed = random(2, 10);
    }
  }

  collision(flowers) {
    let d = dist(600, 350, this.x, this.y);
    if (d < this.dia) {
      this.contact = true;
    } else {
      this.contact = false;
    }
  }
  wind() {
    if (mouseX > 400 && this.y < 790) {
      if (dist(this.x, this.y, 600, 350) > 200) {
        this.x += random(-1, 15);
      }
    }
    if (mouseX < 700 && this.y < 790) {
      if (dist(this.x, this.y, 600, 350) > 200) {
        this.x += random(-15, 1);
      }
    }
  }
}

class branch {
  constructor(startX, startY) {
    this.x = startX;
    this.y = startY;
    this.xmove1 = 0;
    this.xmove2 = 0;
    this.ymove1 = 0;
    this.ymove2 = 0;
  }

  update() {
    this.ymove1 += sin(frameCount * 0.1);
    this.ymove2 += cos(frameCount * 0.4);
    this.xmove1 += sin(frameCount * 0.9);
    this.xmove2 += cos(frameCount * 0.3);
  }

  display() {
    push();
    translate(this.x, this.y);
    strokeWeight(5);
    stroke(96, 60, 20);
    noFill();
    beginShape();
    //larger branches
    curveVertex(0, 300);
    curveVertex(0, 300);
    curveVertex(0, -100);
    curveVertex(100, -200);
    curveVertex(150 + this.xmove1, -300 + this.ymove2);
    curveVertex(200, -300);
    endShape();

    beginShape();
    curveVertex(0, -100);
    curveVertex(0, -100);
    curveVertex(-110 + this.xmove1, -200);
    curveVertex(-150, -350 + this.ymove2);
    curveVertex(-200, -350);
    endShape();

    beginShape();
    curveVertex(0, -100);
    curveVertex(0, -100);
    curveVertex(10, -250 + this.ymove1);
    curveVertex(50, -420 + this.ymove2);
    curveVertex(100 + this.xmove1, -470 + this.ymove2);
    curveVertex(100, -470);
    endShape();

    beginShape();
    curveVertex(-7, -40);
    curveVertex(-7, -40);
    curveVertex(-60 + this.xmove1, -150);
    curveVertex(-50 + this.xmove1, -380);
    curveVertex(-100, -420 + this.ymove1);
    curveVertex(-100, -420);
    endShape();

    beginShape();
    curveVertex(-4, -70);
    curveVertex(-4, -70);
    curveVertex(40, -100);
    curveVertex(110, -110);
    curveVertex(200, -90 + this.ymove2);
    curveVertex(200, -90);
    endShape();

    strokeWeight(3);
    noFill();
    //smaller branches
    beginShape();
    curveVertex(100, -200);
    curveVertex(100, -200);
    curveVertex(80 + this.xmove2, -300);
    curveVertex(90, -350 + this.ymove2);
    curveVertex(90, -350);
    endShape();
    beginShape();
    curveVertex(23, -151);
    curveVertex(23, -151);
    curveVertex(150, -200);
    curveVertex(230 + this.xmove2, -300 + this.ymove1);
    curveVertex(250, -300);
    endShape();
    beginShape();
    curveVertex(160, -209);
    curveVertex(160, -209);
    curveVertex(240, -235 + this.ymove1);
    curveVertex(240, -190);
    endShape();

    beginShape();
    curveVertex(-128, -250);
    curveVertex(-128, -250);
    curveVertex(-180 + this.xmove1, -300 + this.ymove2);
    curveVertex(-180, -400);
    endShape();

    beginShape();
    curveVertex(13, -260);
    curveVertex(13, -260);
    curveVertex(-10 + this.xmove2, -350);
    curveVertex(-1, -450);
    curveVertex(-9 + this.xmove1, -480 + this.ymove2);
    curveVertex(-9, -480);
    endShape();
    beginShape();
    curveVertex(25, -320);
    curveVertex(25, -320);
    curveVertex(75, -390);
    curveVertex(140, -415 + this.ymove2);
    curveVertex(140, -415);
    endShape();
    beginShape();
    curveVertex(2, -150);
    curveVertex(2, -150);
    curveVertex(-15 + this.xmove2, -230);
    curveVertex(-80, -280);
    curveVertex(-100, -330 + this.ymove1);
    curveVertex(-100, -330);
    endShape();

    beginShape();
    curveVertex(-30, -74);
    curveVertex(-30, -74);
    curveVertex(-100, -100);
    curveVertex(-175, -200 + this.ymove1);
    curveVertex(-230, -210 + this.ymove2);
    curveVertex(-230, -210);
    endShape();
    beginShape();
    curveVertex(-100, -100);
    curveVertex(-100, -100);
    curveVertex(-165, -150);
    curveVertex(-210 + this.xmove2, -150);
    curveVertex(-210, -150);
    endShape();
    beginShape();
    curveVertex(-165, -150);
    curveVertex(-165, -150);
    curveVertex(-170 + this.xmove2, -140);
    curveVertex(-168, -120);
    curveVertex(-175 + this.xmove1, -110);
    curveVertex(-175, -110);
    endShape();

    beginShape();
    curveVertex(110, -110);
    curveVertex(110, -110);
    curveVertex(140, -130);
    curveVertex(200 + this.xmove2, -150 + this.ymove2);
    curveVertex(200, -150);
    endShape();
    pop();
  }
}