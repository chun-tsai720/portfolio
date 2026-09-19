let petals = [];
let bladePieces = [];

let scene = "hold";
let timer = 0;
let handleAlpha = 255;

const HOLD_TIME = 120;
const DISSOLVE_TIME = 170;
const FLOAT_TIME = 300;
const RESET_TIME = 80;

function setup() {
  createCanvas(800, 800);
  rectMode(CENTER);
  ellipseMode(CENTER);
  buildBlade();
}

function draw() {
  background(7, 7, 13);

  push();
  translate(width / 2, height / 2);

  drawAtmosphere();

  if (scene === "hold") {
    drawBladePieces();
    drawHandle(255);

    timer++;

    if (timer >= HOLD_TIME) {
      timer = 0;
      scene = "dissolve";
    }
  }

  else if (scene === "dissolve") {
    let progress = constrain(
      timer / DISSOLVE_TIME,
      0,
      1
    );

    dissolveBlade(progress);

    drawBladePieces();

    handleAlpha = map(
      progress,
      0.72,
      1,
      255,
      0,
      true
    );

    drawHandle(handleAlpha);

    timer++;

    if (timer >= DISSOLVE_TIME) {
      burstPetals(70);

      timer = 0;
      scene = "float";
    }
  }

  else if (scene === "float") {
    timer++;

    if (
      timer < 90 &&
      frameCount % 7 === 0
    ) {
      spawnResidualPetals(2);
    }

    if (timer >= FLOAT_TIME) {
      timer = 0;
      scene = "reset";
    }
  }

  else if (scene === "reset") {
    timer++;

    if (timer >= RESET_TIME) {
      restart();
    }
  }

  updatePetals();

  pop();
}

function buildBlade() {
  bladePieces = [];

  let step = 5;

  for (let y = -230; y <= 100; y += step) {
    let halfWidth;

    if (y < -180) {
      halfWidth = map(
        y,
        -230,
        -180,
        1,
        15
      );
    } else {
      halfWidth = 15;
    }

    for (
      let x = -halfWidth;
      x <= halfWidth;
      x += step
    ) {
      let edgeNoise =
        noise(
          x * 0.09 + 100,
          y * 0.025 + 200
        ) * 34;

      bladePieces.push({
        x: x,
        y: y,
        size: step + 0.5,
        dissolved: false,
        trigger:
          y + edgeNoise + random(-8, 8)
      });
    }
  }
}

function drawBladePieces() {
  noStroke();

  for (let piece of bladePieces) {
    if (piece.dissolved) {
      continue;
    }

    let brightness;

    if (piece.x < -3) {
      brightness = 225;
    }

    else if (piece.x > 7) {
      brightness = 135;
    }

    else {
      brightness = 248;
    }

    fill(
      brightness,
      brightness + 2,
      min(255, brightness + 8)
    );

    rect(
      piece.x,
      piece.y,
      piece.size,
      piece.size
    );
  }

  stroke(255, 38);
  strokeWeight(1);

  line(
    -15,
    -178,
    -15,
    98
  );

  line(
    15,
    -178,
    15,
    98
  );

  noStroke();
}

function dissolveBlade(progress) {
  let threshold = map(
    progress,
    0,
    1,
    -240,
    145
  );

  for (let piece of bladePieces) {
    if (
      !piece.dissolved &&
      piece.trigger < threshold
    ) {
      piece.dissolved = true;

      if (random() < 0.8) {
        petals.push(
          new Petal(
            piece.x,
            piece.y,
            false
          )
        );
      }

      if (random() < 0.22) {
        petals.push(
          new Petal(
            piece.x,
            piece.y,
            true
          )
        );
      }
    }
  }
}

function drawHandle(a) {
  if (a <= 0) {
    return;
  }

  noStroke();

  fill(
    255,
    190,
    220,
    a * 0.05
  );

  ellipse(
    0,
    -20,
    110,
    440
  );

  fill(
    55,
    53,
    65,
    a
  );

  rect(
    0,
    112,
    82,
    13,
    3
  );

  fill(
    30,
    27,
    36,
    a
  );

  rect(
    0,
    170,
    23,
    100,
    6
  );

  stroke(
    210,
    190,
    205,
    a * 0.32
  );

  strokeWeight(1);

  for (
    let y = 130;
    y < 210;
    y += 12
  ) {
    line(
      -9,
      y,
      9,
      y + 8
    );

    line(
      9,
      y,
      -9,
      y + 8
    );
  }

  noStroke();

  fill(
    18,
    16,
    23,
    a
  );

  rect(
    0,
    225,
    28,
    12,
    4
  );
}

function drawAtmosphere() {
  noStroke();

  fill(
    255,
    120,
    180,
    5
  );

  ellipse(
    0,
    -30,
    420,
    560
  );

  fill(
    255,
    165,
    210,
    3
  );

  ellipse(
    0,
    -20,
    650,
    680
  );

  fill(
    255,
    180,
    215,
    10
  );

  ellipse(
    0,
    230,
    270,
    45
  );
}

function burstPetals(amount) {
  for (
    let i = 0;
    i < amount;
    i++
  ) {
    petals.push(
      new Petal(
        random(-18, 18),
        random(-220, 105),
        true
      )
    );
  }
}

function spawnResidualPetals(amount) {
  for (
    let i = 0;
    i < amount;
    i++
  ) {
    petals.push(
      new Petal(
        random(-20, 20),
        random(-210, 100),
        false
      )
    );
  }
}

function updatePetals() {
  for (
    let i = petals.length - 1;
    i >= 0;
    i--
  ) {
    petals[i].update();
    petals[i].display();

    if (petals[i].isDead()) {
      petals.splice(i, 1);
    }
  }
}

function restart() {
  petals = [];
  handleAlpha = 255;
  timer = 0;
  scene = "hold";
  buildBlade();
}

function mousePressed() {
  petals = [];
  handleAlpha = 255;
  timer = 0;
  scene = "dissolve";
  buildBlade();
}

class Petal {
  constructor(x, y, burst) {
    this.x = x;
    this.y = y;

    if (burst) {
      this.vx = random(
        -6.5,
        6.5
      );

      this.vy = random(
        -6,
        2
      );
    }

    else {
      let side =
        random() < 0.5
          ? -1
          : 1;

      this.vx =
        side *
        random(
          0.6,
          3.2
        );

      this.vy = random(
        -3.5,
        0.8
      );
    }

    this.size = random(
      6,
      14
    );

    this.angle = random(
      TWO_PI
    );

    this.spin = random(
      -0.09,
      0.09
    );

    this.r = random(
      242,
      255
    );

    this.g = random(
      170,
      218
    );

    this.b = random(
      202,
      238
    );

    this.alpha = 255;

    this.fadeSpeed = random(
      0.35,
      0.8
    );

    this.noiseOffset = random(
      1000
    );

    this.flutter = random(
      TWO_PI
    );

    this.flutterSpeed = random(
      0.025,
      0.07
    );

    this.stretch = random(
      1.35,
      1.9
    );
  }

  update() {
    let wind = map(
      noise(
        this.noiseOffset
      ),
      0,
      1,
      -0.07,
      0.07
    );

    this.vx += wind;

    this.vx +=
      sin(
        this.flutter
      ) * 0.015;

    this.vy += 0.022;

    this.vx *= 0.994;
    this.vy *= 0.994;

    this.x += this.vx;
    this.y += this.vy;

    this.angle +=
      this.spin +
      sin(
        this.flutter
      ) *
      0.008;

    this.flutter +=
      this.flutterSpeed;

    this.noiseOffset += 0.01;

    if (scene === "reset") {
      this.alpha -=
        this.fadeSpeed * 4;
    }

    else {
      this.alpha -=
        this.fadeSpeed;
    }
  }

  display() {
    push();

    translate(
      this.x,
      this.y
    );

    rotate(
      this.angle
    );

    scale(
      1,
      0.82 +
        sin(
          this.flutter
        ) *
        0.18
    );

    noStroke();

    fill(
      this.r,
      this.g,
      this.b,
      this.alpha
    );

    ellipse(
      0,
      0,
      this.size,
      this.size *
        this.stretch
    );

    fill(
      7,
      7,
      13,
      this.alpha
    );

    triangle(
      -this.size * 0.19,
      -this.size * 0.72,

      this.size * 0.19,
      -this.size * 0.72,

      0,
      -this.size * 0.43
    );

    fill(
      255,
      245,
      250,
      this.alpha * 0.3
    );

    ellipse(
      -this.size * 0.14,
      this.size * 0.08,
      this.size * 0.25,
      this.size * 0.75
    );

    pop();
  }

  isDead() {
    return (
      this.alpha <= 0 ||
      this.y > 520 ||
      this.x < -520 ||
      this.x > 520
    );
  }
}