import { Laser } from "./laser.js";

export class Player {
  constructor(picture) {
    this.x = width / 2;
    this.y = height - 50;
    this.lasers = [];
    this.picture = picture;
  }

  shoot() {
    this.lasers.push(new Laser(this.x, this.y, -10, "white"));
  }

  update() {
    // fill("purple");
    // circle(this.x, this.y, 50);
    // See for examples of drawing images: https://p5js.org/reference/#/p5/image
    image(this.picture, this.x - 30, this.y - 30, 60, 60);

    // Draw lasers
    for (let i = 0; i < this.lasers.length; i++) {
      this.lasers[i].move();
      this.lasers[i].draw();
    }
  }
}
