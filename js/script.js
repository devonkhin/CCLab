let xPos = 350
let yPos = 350;
let xSpeed = 0
let ySpeed = 3
let xAccel = 1;
let yAccel = 1;
let pg;

function setup() {
  let canvas = createCanvas(600, 600);
  canvas.id('myp5');
  canvas.parent('p5container');
  pg=createGraphics(160,180)
}

  function draw() {
  background(243, 207, 198,10)
    
  pg.background(243, 207, 198,10);
  pg.noFill();
  pg.stroke(255);
    
  image(pg, 220, 210);
    
  let freq = frameCount * 0.03;
  let amp = 200;
  let sinValue = sin(freq) * amp;
  let cosValue = cos(freq) * amp;
  let sinValue1 = sin(freq + 0.9) * (amp + 100);
  let cosValue1 = cos(freq) * (amp + 100);
  let sinValue2 = sin(freq - 0.9 ) * (amp + 100);
  let cosValue2 = cos(freq) * (amp + 100);
  
  let x = width/2 + cosValue;
  let y = height/2 + sinValue;
  let x1 = width/2 + cosValue1;
  let y1 = height/2 + sinValue1;
  let x2 = width/2 + cosValue2;
  let y2 = height/2 + sinValue2;
    
  fill(169, 92, 104); 
  ellipse(x, y, 40, 40);
  ellipse(x1, y1, 40, 40);
  ellipse(x2, y2, 40, 40)
    
  stroke(169, 92, 104)
  fill(159, 43, 104)
  circle(xPos, yPos,57)
  
  xSpeed =xSpeed + xAccel;
  xPos = xPos + xSpeed;
    
  ySpeed =ySpeed + yAccel;
  yPos = yPos + ySpeed;
  
  if(xPos > width/2 && xSpeed > 0){
     xAccel = -1;
  }else if(xPos < width/2 && xSpeed < 0){
     xAccel = 1;
  }
    
  if(yPos > height/2 && ySpeed > 0){
     yAccel = -1;
  }else if(yPos < height/2 && ySpeed < 0){
     yAccel = 1;
  }
}