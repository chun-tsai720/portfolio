function setup() {
  createCanvas(600, 600);
  background(10);
}

function draw() {

  fill(
    random(255),
    random(255),
    random(255),
    100
  );

  noStroke();

  circle(
    mouseX,
    mouseY,
    random(10, 100)
  );
}