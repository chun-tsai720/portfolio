let t = 0;

function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(10);

  noStroke();

  for (let x = 30; x < width; x += 30) {

    for (let y = 30; y < height; y += 30) {

      let wave =
        sin(x * 0.02 + y * 0.02 + t) * 10;

      let size =
        10 + sin(x * 0.02 + y * 0.02 + t) * 8;

      fill(255);

      circle(
        x,
        y + wave,
        size
      );

    }

  }

  t += 0.05;
}