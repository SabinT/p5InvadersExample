import { BigEnemy, Enemy } from "./enemy.js"
import { Player } from "./player/player.js"

let enemies = [];

let p;
let enemyImage;

window.preload = function() {
  // Load the image
  enemyImage = loadImage("./images/invaders.png");
}

window.setup = function () {
  createCanvas(800, 800);
  p = new Player();
};

window.draw = function () {
  // Clear the screen
  background(100);


  // Move player 
  if (keyIsDown(LEFT_ARROW)) {
    p.x = p.x - 10;
  }
  
  if (keyIsDown(RIGHT_ARROW)) {
    p.x = p.x + 10;
  }

  // Draw function
  p.draw();

  for (let i = 0; i < enemies.length; i++) {
    enemies[i].move();
    enemies[i].draw();
  }
};

// Callback function
window.mousePressed = function () {
  console.log("Mouse was pressed at " + mouseX + ", " + mouseY);

  let e = new Enemy(mouseX, mouseY, enemyImage);
  enemies.push(e);

}

window.keyPressed = function () {
  // ASCII code for space
  if (keyCode == 32) {
    console.log("Spacebar was pressed");
  }
}

