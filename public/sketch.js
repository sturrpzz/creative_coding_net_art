document.body.style.margin   = 0
document.body.style.overflow = `hidden`

// Link to blog: https://sturrpzz-blog-2.deno.dev

/*
Click on different keys or mouse to generate random shapes of random sizes and colors.
Use mouse scroll wheel to reset the canvas.
*/

// I ended up not adding audio to the interactions because it can get quite annoying.

var r; 
var g; 
var b; 
var a;
let x, y;
let speedX, speedY;
let redVal, greenVal, blueVal;
let alphaVal = 100;
let angle = 0;


function setup() {
  createCanvas(1800, 950);
  background(20);

  // Randomize variables used to draw shapes
  x = random(0, width);
  y = random(0, height);
  speedX = random(-5, 5);
  speedY = random(-5, 5);
}

// Draw layered lines across canvas
function parametricLines() {
  push();
  // Map x and y positions to a color range
  redVal = map(y, 0, height, 0, 255);
  greenVal = map(x, 0, width, 0, 255);
  blueVal = 200;

  translate(x, y);
  let rotation = map(x, 0, height, 0, PI);
  rotate(rotation);

  stroke(redVal, greenVal, blueVal, alphaVal);
  line(-200, 0, 200, x);

  x = x + speedX;
  y = y + speedY;

  // Lines don't go beyond the canvas width
  if (x > width || x < 0) {
    speedX = -speedX;
  }
  // Lines don't go beyond the canvas height
  if (y > height || y < 0) {
    speedY = -speedY;
  }
  pop();
}

// Draw trails of ellipses across canvas. I learnt how to make this from a Thecodingtrain video and found it very fascinating.
function bouncingEllipse(size) {
  // Set the size of the ellipse based on the y value
  if (y > 0) {
    size = map(y, 0, height, 0, 100);
  } else {
    size = map(speedX, 0, height, 0, 100);
  }
  // Map x and y positions to a color range 
  redVal = map(y, 0, height, 0, 255);
  greenVal = map(x, 0, width, 0, 255);
  blueVal = map(x + y, 0, width + height, 0, 255);

  stroke(redVal, greenVal, blueVal, alphaVal);
  fill(greenVal, 255, blueVal, alphaVal);
  x = x + speedX;
  y = y + speedY;

  // Ellipse doesn't go beyond the canvas width
  if (x > width || x < 0) {
      speedX = -speedX;
    }
  // Ellipse doesn't go beyond the canvas height
  if (y > height || y < 0) {
      speedY = -speedY;
    }
    ellipse(x, y, size, size);
}


// Rectangle with rounded corners and various sizes at random positions
function roundedRect() {
  push();
  rectMode(CENTER);
  let shapeX = random(width);
  let shapeY = random(height);
  // Randomize the shape size
  let size = random(10, 400);
  
  // Map red fill value to the shape's size
  redVal = map(size, 100, 300, 0, 255);
  noStroke();
  fill(120, redVal, 160, alphaVal * 0.5);
  rect(shapeX, shapeY, size * 0.1, size, size * 0.03, size * 0.03, size * 0.03, size * 0.03);
  pop();
}

// Function which draws flower animation at random positions across the canvas.
function realFlower() {
  for (let i=0; i<=10; i++) {
  let x=random(width);     
  let y=random(height);
  r = random(255); 
  g = random(100,200);
  b = random(100);
  a = random(50,200);
  fill(r,g,b,a);
  ellipse(x,y,20,20)
  // Position of flower petals
  ellipse(x-15,y+5,20,20)
  ellipse(x-25,y-5,20,20)
  ellipse(x-17,y-20,20,20)
  ellipse(x,y-15,20,20)
  // Position of flower center
  fill (random(225), random(225), random(225));
  ellipse(x-12,y-7,22,22) 
  }
}

function draw() {

  // Key inputs are mapped to different functions above
  if (keyIsPressed && key != ' ' ) {
    if (keyCode % 5 === 0) {
      parametricLines();
    }
    if (keyCode % 5 === 1) {
      bouncingEllipse(random(-100, 50));
    }
    if (keyCode % 5 === 2) {
      realFlower();
    }
  }
}

// keyPressed() function to ensure that the drawing functions don't repeat on single key presses
function keyPressed() {
  if (key != ' ' ) {
    if (keyCode % 5 === 3 || keyCode % 5 === 4) {
      roundedRect();
    }
  } else {
    clear();
    background(20);
  }
}

// Scroll mouse wheel to reset canvas
function mouseWheel() {
  clear();
  background(20);
}

// When key is released values are randomized again
function keyReleased() {
  x = random(0, width);
  y = random(0, height);
  speedX = random(-5, 5);
  speedY = random(-5, 5);
}

function mouseClicked() {
  if (mouseX >= 0 && mouseX <= width && mouseY >= 0 && mouseY <= height) {
    realFlower();
    guitar.play();
  }
}