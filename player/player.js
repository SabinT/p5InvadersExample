export class Player {
    constructor() {
        this.x = width / 2;
        this.y = height;
    }

    shoot() {

    }

    draw() {
        fill("purple");
        circle(this.x, this.y, 50);
    }
}