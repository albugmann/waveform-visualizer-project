let angle = 0;
let angleSpeed = 0.02; // Adjust the speed of rotation

function setup() {
  createCanvas(windowWidth, windowHeight); // Create a canvas that matches the window size
}

function draw() {
  background(0);
  
  // Calculate the center of the canvas
  let centerX = width / 2;
  let centerY = height / 2;
  
  // Translate to the center of the canvas
  translate(centerX, centerY);

  // Set the stroke color and weight for the line
  stroke(255);
  strokeWeight(2);

  // Calculate the end point of the line using polar coordinates
  let radius = 200; // Adjust the length of the line as needed
  let x = radius * cos(angle);
  let y = radius * sin(angle);

  // Draw the line from the center to the calculated end point
  line(0, 0, x, y);
  
  // Increment the angle to rotate the line clockwise
  angle += angleSpeed;
}

// To ensure the canvas resizes with the window
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
