let dia = 20;
let diag = 0.5;
let angle;
let a = 0;
let Speed;

function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(0, 20);

  let freq1 = frameCount * 0.03;
  let amp = 200;
  let sinValue = sin(-freq1 - 0.5) * (amp - 110);
  let cosValue = cos(freq1 + 10) * (amp - 30);
  let sinValue3 = sin(freq1) * (amp - 30);
  let cosValue3 = cos(freq1) * (amp - 110);

  let sinValue1 = sin(-freq1 + 1) * (amp + 50);
  let cosValue1 = cos(freq1 - 5) * (amp + 50);
  let sinValue2 = sin(-freq1 - 1) * (amp + 50);
  let cosValue2 = cos(freq1 + 5) * (amp + 50);

  let sinValue4 = sin(-freq1 - 0.5) * (amp - 110);
  let cosValue4 = cos(freq1 + 10) * (amp - 30);
  let sinValue5 = sin(freq1) * (amp - 30);
  let cosValue5 = cos(freq1) * (amp - 110);

  let x = width / 2 + cosValue;
  let y = height / 2 + sinValue;
  let x3 = width / 2 + cosValue3;
  let y3 = height / 2 + sinValue3;

  let x1 = width / 2 + cosValue1;
  let y1 = height / 2 + sinValue1;
  let x2 = width / 2 + cosValue2;
  let y2 = height / 2 + sinValue2;

  let x4 = width / 2 + cosValue4;
  let y4 = height / 2 + sinValue4;
  let x5 = width / 2 + cosValue5;
  let y5 = height / 2 + sinValue5;

  noStroke();
  fill(201, 169, 170, a + 255);
  ellipse(x, y, 50, 30);
  ellipse(x3, y3, 50, 30);

  ellipse(x1, y1, 45, 45);
  ellipse(x2, y2, 45, 45);

  ellipse(x4, y4, 30, 50);
  ellipse(x5, y5, 30, 50);

  //stroke(250, 160, 160,20)
  fill(250, 160, 160, 30);
  translate(width / 2, height / 2);
  for (let i = 0; i < 5; i++) {
    ellipse(0, 0, i * 10, dia);
    rotate(frameCount * 0.7);

    if (mouseIsPressed) {
      dia = dia + diag;
      a = a - 1.5;

      fill(250, 128, 114, 60);
      circle(random(1, 300), random(1, 300), random(1, 40));
    } else {
      dia = dia - diag * 10;
      a = 255;
    }
    dia = constrain(dia, 100, 600);
  }
}