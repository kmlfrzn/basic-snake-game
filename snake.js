// GLOBALS

const scoreBoard = document.getElementById("score");

// This is a changable variable.
// ~~ Fiddle with this to change the Expansion Rate on eating one food instance. ~~

export const SNAKE_SPEED = 3;

// ~~ This is signifies the position of the starting point. Set to be in the middle. ~~

const snakeBody = [{ x: 11, y: 11 }];

// IMPORTS

import { getInputDirection } from "./input.js";

// VARIABLES

let newSegments = 0;
var score = 0;

//  --- CONTENT ---  //

// UPDATE FUNCTION

export function update() {
  addSegments();

  const inputDirection = getInputDirection();
  for (let i = snakeBody.length - 2; i >= 0; i--) {
    snakeBody[i + 1] = { ...snakeBody[i] };
  }

  snakeBody[0].x += inputDirection.x;
  snakeBody[0].y += inputDirection.y;
}

// DRAW FUNCTION

export function draw(gameBoard) {
  snakeBody.forEach((segment) => {
    const snakeElement = document.createElement("div");

    snakeElement.style.gridRowStart = segment.y;
    snakeElement.style.gridColumnStart = segment.x;

    snakeElement.classList.add("snake");
    gameBoard.appendChild(snakeElement);
  });
}

// ADD EXTRA BODY SIZE

export function expandSnake(amount) {
  newSegments += amount;
  score++;
  scoreBoard.textContent = score;
}

// CHECK SNAKE'S POSITION

export function onSnake(position, { ignoreHead = false } = {}) {
  return snakeBody.some((segment, index) => {
    if (ignoreHead && index === 0) return false;
    return equalPositions(segment, position);
  });
}

// GET SNAKE HEAD

export function getSnakeHead() {
  return snakeBody[0];
}

// CHECK FOR INTERSECTION THRU onSnake()

export function snakeIntersection() {
  return onSnake(snakeBody[0], { ignoreHead: true });
}

// EQUAL POSITIONS

function equalPositions(pos1, pos2) {
  return pos1.x === pos2.x && pos1.y === pos2.y;
}

// EXTRA SEGMENTS

function addSegments() {
  for (let i = 0; i < newSegments; i++) {
    snakeBody.push({ ...snakeBody[snakeBody.length - 1] });
  }

  newSegments = 0;
}
