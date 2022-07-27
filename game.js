import { Enemy } from "./enemy.js";
import { Player } from "./player.js";
import { Laser } from "./laser.js";
import { removeValuesFromArray } from "./library.js";

let enemies = []; // enemies
let enemyLasers = []; // lasers fired by enemies
let p; // Player

let state = {
  lives: 3,
  score: 0,
};

window.setup = function () {
  createCanvas(800, 800);

  
  // Create 10 enemies on a 4x4 grid
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      enemies.push(new Enemy(i * 100, 100 + j * 75));
    }
  }
  
  // Loads an image from a file in the assets folder
  let shipPicture = loadImage("assets/playership.png");
  p = new Player(shipPicture);

  lastEnemyShootTime = millis();
};

let lastEnemyShootTime = 0;
const enemyShootInterval = 1000;

window.draw = function () {
  // Clear the screen with a semi-transparent black color,
  // in order to create a "trail" effect (i.e., things drawn during
  // the previous frame are still slightly visible)
  // color(0, 0, 0, 50) means "black with opaqueness 50/255" (r,g,b,a)
  // See: https://p5js.org/reference/#/p5/color
  background(color(0, 0, 0, 50));

  if (enemies.length == 0) {
    // You win!
    state.score += 100;
    text("You win!", width / 2 - 50, height / 2);

    // noLoop(); prevents p5js from calling the draw function again
    noLoop();

    // short-circuit the rest of the draw function
    return;
  }

  // Move player
  movePlayer();

  // Move/draw the enemies
  for (let i = 0; i < enemies.length; i++) {
    enemies[i].update();
  }

  // Move/draw the player
  p.update();

  shootEnemyLasers();

  checkCollisions();

  drawEnemyLasers();

  // Draw score and lives
  fill("white");
  textSize(30);
  text("Score: " + state.score, 10, 30);
  text("Lives: " + state.lives, 10, 60);
};

function movePlayer() {
  if (keyIsDown(LEFT_ARROW)) {
    p.x = p.x - 10;
  }

  if (keyIsDown(RIGHT_ARROW)) {
    p.x = p.x + 10;
  }

  // Constrain to screen
  if (p.x < 0) {
    p.x = 0;
  }

  if (p.x > width) {
    p.x = width;
  }
}

/**
 * Shoots laser from a random enemy with a fixed time interval
 */
function shootEnemyLasers() {
  // "millis()" - a p5js functionreturns the number of milliseconds since the setup() was called
  if (millis() - lastEnemyShootTime > enemyShootInterval) {
    let randomEnemy = enemies[Math.floor(Math.random() * enemies.length)];
    enemyLasers.push(new Laser(randomEnemy.x, randomEnemy.y, 10, "red"));
    lastEnemyShootTime = millis();
  }
}

function drawEnemyLasers() {
  for (let i = 0; i < enemyLasers.length; i++) {
    enemyLasers[i].move();
    enemyLasers[i].draw();
  }
}

function checkCollisions() {
  // Check collisions between player's lasers and enemies
  // Keep track of lasers and enemies that collided, then remove them from the arrays later
  let lasersToRemove = [];
  let enemiesToRemove = [];
  for (let i = 0; i < p.lasers.length; i++) {
    for (let j = 0; j < enemies.length; j++) {
      if (p.lasers[i].checkCollision(enemies[j].x, enemies[j].y)) {
        enemiesToRemove.push(enemies[j]);
        lasersToRemove.push(p.lasers[i]);
        state.score++;
      }
    }
  }

  // Remove lasers fired by player that go out of screen
  for (let i = 0; i < p.lasers.length; i++) {
    if (p.lasers[i].y < 0) {
      lasersToRemove.push(p.lasers[i]);
    }
  }

  // Check collisions between player and enemy lasers
  let enemyLasersToRemove = [];
  for (let i = 0; i < enemyLasers.length; i++) {
    if (enemyLasers[i].checkCollision(p.x, p.y)) {
      state.lives--;
      enemyLasersToRemove.push(enemyLasers[i]);
      if (state.lives <= 0) {
        // Game over
        text("Game over", width / 2 - 50, height / 2);
        noLoop();
      }
    }
  }

  // Remove lasers fired by enemies that go out of screen
  for (let i = 0; i < enemyLasers.length; i++) {
    if (enemyLasers[i].y > height) {
      enemyLasersToRemove.push(enemyLasers[i]);
    }
  }

  // Remove objects that collided or went out of screen
  removeValuesFromArray(enemyLasers, enemyLasersToRemove);
  removeValuesFromArray(enemies, enemiesToRemove);
  removeValuesFromArray(p.lasers, lasersToRemove);
}

function checkCollisionsBad() {
  // BUGBUG: This is the wrong way to remove things from an array
  // while iterating over it.
  for (let i = 0; i < p.lasers.length; i++) {
    for (let j = 0; j < enemies.length; j++) {
      if (p.lasers[i].checkCollision(enemies[j].x, enemies[j].y)) {
        enemies.splice(j, 1);
        p.lasers.splice(i, 1);
        state.score++;
      }
    }
  }
}

window.mousePressed = function () {
  console.log("Mouse was pressed at " + mouseX + ", " + mouseY);
};

window.keyPressed = function () {
  // 32 is the ASCII code for space
  // Reference: https://www.cs.cmu.edu/~pattis/15-1XX/common/handouts/ascii.html
  if (keyCode == 32) {
    p.shoot();
  }
};
