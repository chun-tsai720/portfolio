let cellSize = 18;     // 小正方形大小
let pyramidRadius = 14; // 金字塔半徑（格數）
let lightAngle = 0;

function setup() {
  createCanvas(820, 820);
  rectMode(CENTER);
  noStroke();
}

function draw() {
  background(15);

  translate(width / 2, height / 2);

  // 光源位置（繞著金字塔移動）
  let lightX = cos(lightAngle) * 320;
  let lightY = sin(lightAngle) * 320;
  let lightZ = 260;

  // 畫背景淡淡的外圈光感
  drawLightGlow(lightX, lightY);

  // 先畫金字塔陰影
  drawShadow(lightX, lightY);

  // 畫由小正方形組成的金字塔
  for (let gy = -pyramidRadius; gy <= pyramidRadius; gy++) {
    for (let gx = -pyramidRadius; gx <= pyramidRadius; gx++) {

      let h = heightAt(gx, gy);

      if (h > 0) {
        let px = gx * cellSize;
        let py = gy * cellSize;

        // 讓中心更高，越外圍越低
        let z = h * 10;

        // 用鄰近高度差做簡單法線（normal）
        let hx1 = heightAt(gx + 1, gy);
        let hx0 = heightAt(gx - 1, gy);
        let hy1 = heightAt(gx, gy + 1);
        let hy0 = heightAt(gx, gy - 1);

        let nx = hx0 - hx1;
        let ny = hy0 - hy1;
        let nz = 2.2;

        let normal = createVector(nx, ny, nz).normalize();

        // 光線方向
        let lightDir = createVector(
          lightX - px,
          lightY - py,
          lightZ - z
        ).normalize();

        // 明暗
        let diffuse = normal.dot(lightDir);
        diffuse = constrain(diffuse, 0, 1);

        let ambient = 0.18;
        let brightness = ambient + diffuse * 0.82;

        let gray = map(brightness, 0, 1, 35, 255);

        // 略微讓高處更亮
        gray += map(h, 1, pyramidRadius + 1, 0, 22);
        gray = constrain(gray, 0, 255);

        // 畫小方塊
        fill(gray);
        rect(px, py, cellSize - 1, cellSize - 1);

        // 細邊線，增加格子感
        stroke(255, 22);
        strokeWeight(0.6);
        noFill();
        rect(px, py, cellSize - 1, cellSize - 1);
        noStroke();
      }
    }
  }

  // 最上層中心亮點
  fill(255, 220);
  rect(0, 0, cellSize - 2, cellSize - 2);

  // 光源可視化
  fill(255, 180);
  circle(lightX, lightY, 12);

  fill(255, 28);
  circle(lightX, lightY, 38);

  lightAngle += 0.01;
}

// 金字塔高度：用曼哈頓距離做階梯式菱形
function heightAt(gx, gy) {
  let d = abs(gx) + abs(gy);
  let h = pyramidRadius - d + 1;

  if (h < 0) {
    return 0;
  }

  return h;
}

// 陰影
function drawShadow(lightX, lightY) {
  let dir = createVector(lightX, lightY).normalize();
  let offset = p5.Vector.mult(dir, -42);

  fill(0, 80);
  noStroke();

  beginShape();
  vertex(0 + offset.x, -(pyramidRadius + 1) * cellSize + offset.y);
  vertex((pyramidRadius + 1) * cellSize + offset.x, 0 + offset.y);
  vertex(0 + offset.x, (pyramidRadius + 1) * cellSize + offset.y);
  vertex(-(pyramidRadius + 1) * cellSize + offset.x, 0 + offset.y);
  endShape(CLOSE);
}

// 背景暈光
function drawLightGlow(x, y) {
  noStroke();
  fill(255, 10);
  circle(x, y, 160);
  fill(255, 6);
  circle(x, y, 250);
}