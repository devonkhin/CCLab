let stars = [];

function setup() {
  let cnv=createCanvas(500, 500);
  cnv.parent("canvasWrapper");
  for (let i = 0; i < 100; i++) {
    let x = random(width);
    let y = random(height);
    let star = new Star(x, y);
    stars.push(star);
  }
}

function draw() {
  background(0);
  for (let star of stars) {
    star.update();
    star.display();
  }
}

class Star {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = random(2, 5);
    this.brightness = random(50, 255); // Set a minimum brightness
    this.brightnessChange = random(1, 3);
    this.twinkleInterval = random(500, 2000); // Random twinkle interval
    this.lastTwinkleTime = millis(); // Store the last twinkle time
  }

  update() {
    // Check if it's time to twinkle
    if (millis() - this.lastTwinkleTime > this.twinkleInterval) {
      this.brightness = random(50, 255);
      this.lastTwinkleTime = millis();
    }
  }

  display() {
    fill(this.brightness);
    noStroke();
    ellipse(this.x, this.y, this.size, this.size);
  }
}