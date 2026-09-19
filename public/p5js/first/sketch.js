function setup() {
  createCanvas(900, 900);
  noLoop();
}

function draw() {
  background(242, 236, 228);

  drawTextureBackground();
  drawOilBlobs(45);
  drawCracks(16);
  drawGlassShards(32);
  drawDust(180);
}

function mousePressed() {
  redraw();
}

function drawTextureBackground() {
  noStroke();

  for (let i = 0; i < 1800; i++) {
    let x = random(width);
    let y = random(height);
    let s = random(10, 40);

    fill(
      random(220, 245),
      random(220, 235),
      random(215, 230),
      random(10, 35)
    );

    ellipse(x, y, s, s * random(0.6, 1.4));
  }
}

function drawOilBlobs(count) {
  for (let i = 0; i < count; i++) {
    let x = random(width);
    let y = random(height);
    let baseSize = random(80, 220);

    let palette = [
      color(190, 60, 60, 42),
      color(60, 90, 170, 38),
      color(220, 140, 60, 38),
      color(70, 130, 110, 34),
      color(120, 70, 140, 32),
      color(240, 230, 220, 26)
    ];

    let c = random(palette);

    push();
    translate(x, y);
    rotate(random(TWO_PI));

    noStroke();

    for (let j = 0; j < 24; j++) {
      let ox = random(-baseSize * 0.25, baseSize * 0.25);
      let oy = random(-baseSize * 0.25, baseSize * 0.25);
      let w = baseSize * random(0.5, 1.1);
      let h = baseSize * random(0.18, 0.5);

      fill(
        red(c) + random(-15, 15),
        green(c) + random(-15, 15),
        blue(c) + random(-15, 15),
        alpha(c)
      );

      ellipse(ox, oy, w, h);
    }

    pop();
  }
}

function drawCracks(count) {
  stroke(70, 60, 60, 120);
  strokeWeight(1.1);
  noFill();

  for (let i = 0; i < count; i++) {
    let x = random(width);
    let y = random(height);
    let branches = int(random(4, 8));

    for (let j = 0; j < branches; j++) {
      let angle = random(TWO_PI);
      let len = random(80, 220);

      beginShape();
      let steps = int(random(4, 8));

      for (let k = 0; k < steps; k++) {
        let px = x + cos(angle) * (len / steps) * k + random(-8, 8);
        let py = y + sin(angle) * (len / steps) * k + random(-8, 8);
        vertex(px, py);
        angle += random(-0.25, 0.25);
      }

      endShape();
    }
  }
}

function drawGlassShards(count) {
  for (let i = 0; i < count; i++) {
    let cx = random(width);
    let cy = random(height);
    let radius = random(40, 140);
    let sides = int(random(3, 6));
    let angleOffset = random(TWO_PI);

    let pts = [];

    for (let j = 0; j < sides; j++) {
      let ang = angleOffset + map(j, 0, sides, 0, TWO_PI);
      let r = radius * random(0.5, 1);
      let px = cx + cos(ang) * r;
      let py = cy + sin(ang) * r;
      pts.push(createVector(px, py));
    }

    // 主碎片
    fill(
      random(180, 255),
      random(200, 255),
      random(220, 255),
      random(35, 80)
    );
    stroke(255, 255, 255, 120);
    strokeWeight(1.2);

    beginShape();
    for (let p of pts) {
      vertex(p.x, p.y);
    }
    endShape(CLOSE);

    // 內層高光
    fill(255, 255, 255, random(15, 45));
    noStroke();

    beginShape();
    for (let p of pts) {
      let ix = lerp(cx, p.x, 0.55);
      let iy = lerp(cy, p.y, 0.55);
      vertex(ix, iy);
    }
    endShape(CLOSE);

    // 邊緣亮線
    stroke(255, 255, 255, 90);
    strokeWeight(0.8);
    for (let k = 0; k < pts.length; k++) {
      let a = pts[k];
      let b = pts[(k + 1) % pts.length];
      line(a.x, a.y, b.x, b.y);
    }
  }
}

function drawDust(count) {
  noStroke();

  for (let i = 0; i < count; i++) {
    fill(255, 255, 255, random(20, 70));
    circle(random(width), random(height), random(1, 4));
  }
}