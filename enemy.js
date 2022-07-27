export class Enemy {
    // The function that gets called when an object is created
    constructor(a,b) {
      this.x = a;
      this.y = b;
    }

    update() {
      this.move();
      this.draw();
    }
  
    move() {
      this.x = this.x + 5;
      this.x = (this.x + width) % width; // wrap around
    }
  
    draw() {
      fill("red");
      circle(this.x, this.y, 50);
    }
}