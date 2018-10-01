// 2d drawing engine
// Helps with drawing things to an HTML canvas

////////////////////////////////////////////////////////////////
// System start
// 
// script requires a setup() function which is run once
// and also a animate() function that is the main loop

// Call the _init() when the DOM has loaded
document.addEventListener("DOMContentLoaded", function (event) {
  // console.log("DOM fully loaded and parsed");
  _init();
});

// initial function, calls script setup and starts drawing loop
function _init() {
  // console.log('loading setup')
  setup();
  _loop();
}

// loop control
let _animate = true;

// main loop
function _loop() {
  if (_animate) {
    requestAnimationFrame(_loop);
    animate();
  }
}

// function to stop animation
function noLoop() {
  _animate = false;
  console.log('Animation stopped');
}

////////////////////////////////////////////////////////////////


// Constants
const TWO_PI = Math.PI * 2;
const HALF_PI = Math.PI / 2;
const QUARTER_PI = Math.PI / 4;
const PI = Math.PI;

// globals
let canvas, ctx;
let fillColor;

// Creates a canvas object and add to the html body
function createCanvas(w, h) {
  canvas = document.createElement('canvas');
  ctx = canvas.getContext('2d')
  canvas.width = w;
  canvas.height = h;
  document.body.appendChild(canvas);
}

// Sets a background color
// Can use standard color arguments or a single integer as grayscale
function background(color) {
  if (isNaN(color)) {
    ctx.fillStyle = color;
  } else {
    ctx.fillStyle = `rgb(${color},${color},${color})`;
  }
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Sets a gradient background
// colorStart is at the to and colorEnd the bottom
function backgroundGradient(colorStart, colorEnd) {
  const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, colorStart);
  gradient.addColorStop(1, colorEnd);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Drawing obects 

// object fill color
function fill(color) {
  if (isNaN(color)) {
    fillColor = color;
  } else {
    fillColor = `rgb(${color},${color},${color})`;
  }
}

// Object blur color and size
function shadow(color, size) {
  ctx.shadowColor = color;
  ctx.shadowBlur = size;
}

// draw a rectangle
function rect(x, y, w, h) {
  ctx.fillStyle = fillColor;
  ctx.fillRect(x, y, w, h);
}

// draw a circle
function circle(position, radius) {
  ctx.beginPath();
  ctx.arc(position.x, position.y, radius, 0, TWO_PI, false);
  ctx.fillStyle = fillColor;
  ctx.fill()
  ctx.closePath();
}

// utility functions
function randomIntFromRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

function randomRange(min, max) {
  return Math.random() * (max - min + 1) + min;
}