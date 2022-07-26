import { BigEnemy, Enemy } from "./enemy.js"
import { Player } from "./player/player.js"

let e;
let e1;

let p;

window.setup = function () {
  createCanvas(800, 800);
  e = new Enemy(100, 100);
  e1 = new BigEnemy(300, 300);
  p = new Player();
};

window.draw = function () {
  // Clear the screen
  background(100);

  // Update the positions of everything
  e.move();
  e1.move();

  // Move player 
  if (keyIsDown(LEFT_ARROW)) {
    p.x = p.x - 10;
  }
  
  if (keyIsDown(RIGHT_ARROW)) {
    p.x = p.x + 10;
  }

  // Draw function
  e.draw();
  e1.draw();
  p.draw();
};

window.mousePressed = function () {
  console.log("Mouse was pressed at " + mouseX + ", " + mouseY);
}

window.keyPressed = function () {
  if (keyCode == 32) {
    console.log("Spacebar was pressed");
  }
}

