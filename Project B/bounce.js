class BounceBall {
  // constructor function
  constructor(startX, startY) {
    // properties: particle's characteristics
    this.x = startX;
    this.y = startY;
    this.dia = 30;
    this.xSpd = random(-2,2);
    this.ySpd = random(-2,2);
    this.color = color(255);
  }

  changeSize(size){
    this.dia = size;
  }

  changeColor(r,g,b){
    this.color = color(r,g,b);
  }

  move(){
    this.x += this.xSpd;
    this.y += this.ySpd;
    
  }
  bounce(){
    if (this.x > width || this.x < 0){
      this.xSpd = -this.xSpd;
    }

    if (this.y>height || this.y < 0) {
      this.ySpd = -this.ySpd;
    }
  }

  
  display() {
    // particle's appearance
    push();
    translate(this.x, this.y);
    fill(this.color);
    circle(0, 0, this.dia);
    pop();
  }

}
