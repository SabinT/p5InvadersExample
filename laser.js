export class Laser {
  constructor(x, y, speed, color) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.color = color;
  }

  move() {
    this.y += this.speed;
  }

  draw() {
    fill(this.color);
    circle(this.x, this.y, 20);
  }

  checkCollision(x, y) {
    const d = Math.sqrt(Math.pow(this.x - x, 2) + Math.pow(this.y - y, 2));

    // You can try to improve this by checking the radii of the objects colliding
    // instead of a fixed distance threshold.
    return d < 20;
  }
}
