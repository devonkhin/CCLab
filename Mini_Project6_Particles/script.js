// CCLab Mini Project - 9.R Particles Template

let NUM_OF_FIREFLIES = 150; // Decide the initial number of particles.

let fireflies = [];

function setup() {
  let canvas = createCanvas(600, 600);
  //canvas.parent("canvasWrapper");

  // generate particles
  for (let i = 0; i < NUM_OF_FIREFLIES; i++) {
    fireflies[i] = new Firefly(random(width), random(height));
  }
}

function draw() {
  background(0);

  // update and display
  for (let i = 0; i < fireflies.length; i++) {
    let f = fireflies[i];
    f.update();
    f.display();
    f.glow();
  }
}

class Firefly {
  // constructor function
  constructor(startX, startY) {
    // properties: particle's characteristics
    this.x = startX;
    this.y = startY;
    this.dia = random(1, 12);
    this.xSpd = random(-1, 1);
    this.ySpd = random(-1, 1);
    this.dir = random(-1, 1);
    this.r = 237;
    this.g = 226;
    this.b = 116;
    this.a = 1;
    this.h = 0;
  }
  // methods (functions): particle's behaviors
  update() {
    this.xSpd = sin(frameCount * random(0, 0.06)) * this.dir;
    this.check();
    this.x -= this.xSpd; //+
    this.y += this.ySpd;
  }
  display() {
    // particle's appearance
    push();
    translate(this.x, this.y);
    // stroke(154,204,50)
    noStroke();
    fill(this.r, this.g, this.b, this.a);
    circle(0, 0, this.dia);

    pop();
  }

  glow() {
    let aVal = sin(frameCount * random(0.001, 0.005)) * random(0, 900);
    constrain(aVal, 0, 255);
    this.a = aVal;
  }

  check() {
    if (this.x <= 10 || this.x >= width - 10) {
      // this.x -= this.xSpd;
      this.xSpd *= -1;
    }
    if (this.y <= 10 || this.y >= height - 10) {
      this.ySpd *= -1;
    }
  }
}

