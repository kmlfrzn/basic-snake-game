// GAME BOARD

const GAME_BOARD = document.getElementById("game-board");

// IMPORTS

import {
  update as updateSnake,
  draw as drawSnake,
  SNAKE_SPEED,
  getSnakeHead,
  snakeIntersection,
} from "./snake.js";
import { update as updateFood, draw as drawFood } from "./food.js";
import { outsideGrid } from "./grid.js";

// VARIABLES

let lastRenderTime = 0;
let gameOver = false;

//  --- CONTENT ---  //

// GAME LOOP

function main(currentTime) {
  if (gameOver) {
    if (confirm("You Lost! Press OK to Restart!")) {
      location.reload();
    }
    return;
  }
  window.requestAnimationFrame(main);

  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
  if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;

  lastRenderTime = currentTime;

  update();
  draw();
}
window.requestAnimationFrame(main);

// UPDATE FUNCTION

function update() {
  updateSnake();
  updateFood();
  checkDeath();
}

// DRAW FUNCTION

function draw() {
  GAME_BOARD.innerHTML = "";
  drawSnake(GAME_BOARD);
  drawFood(GAME_BOARD);
}

// CHECK FOR DEATH

function checkDeath() {
  gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
}
