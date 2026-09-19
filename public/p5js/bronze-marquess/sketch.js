let currentHour = 12;
let targetOpen = 1;
let openAmount = 1;
let hasMoved = false;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  pixelDensity(1);
  angleMode(RADIANS);
}

function draw() {
  updateTimeFromMouse();

  let sunlight = getSunlight(currentHour);

  targetOpen = getFlowerOpenAmount(currentHour);

  openAmount = lerp(
    openAmount,
    targetOpen,
    0.06
  );

  drawSky(sunlight);

  setupSceneLights(sunlight);

  drawSunOrMoon(sunlight);

  push();

  let viewTilt = map(
    constrain(mouseY, 0, height),
    0,
    height,
    -0.28,
    0.18
  );

  rotateX(viewTilt);

  rotateY(
    -0.15 +
    sin(frameCount * 0.004) * 0.04
  );

  drawStem();

  drawLeaves();

  push();

  translate(
    0,
    -110,
    0
  );

  drawRose(openAmount);

  pop();

  pop();

  drawHUD(sunlight);
}



function updateTimeFromMouse() {
  if (hasMoved) {
    currentHour = map(
      constrain(mouseX, 0, width),
      0,
      width,
      0,
      24
    );
  }
}



function mouseMoved() {
  hasMoved = true;
}



function touchMoved() {
  hasMoved = true;
  return false;
}



function getSunlight(t) {
  if (
    t < 6 ||
    t > 18
  ) {
    return 0;
  }

  let x = map(
    t,
    6,
    18,
    0,
    PI
  );

  return constrain(
    sin(x),
    0,
    1
  );
}



function getFlowerOpenAmount(t) {
  if (
    t < 5.5 ||
    t >= 19
  ) {
    return 0;
  }

  if (t < 8) {
    return ease01(
      map(
        t,
        5.5,
        8,
        0,
        1
      )
    );
  }

  if (t < 17) {
    return 1;
  }

  return ease01(
    map(
      t,
      19,
      17,
      0,
      1
    )
  );
}



function ease01(x) {
  x = constrain(
    x,
    0,
    1
  );

  return (
    x *
    x *
    (3 - 2 * x)
  );
}



function drawSky(sunlight) {
  push();

  resetMatrix();

  let topNight = [
    7,
    10,
    28
  ];

  let bottomNight = [
    24,
    19,
    48
  ];

  let topDay = [
    82,
    163,
    224
  ];

  let bottomDay = [
    236,
    190,
    137
  ];

  let topR = lerp(
    topNight[0],
    topDay[0],
    sunlight
  );

  let topG = lerp(
    topNight[1],
    topDay[1],
    sunlight
  );

  let topB = lerp(
    topNight[2],
    topDay[2],
    sunlight
  );

  let bottomR = lerp(
    bottomNight[0],
    bottomDay[0],
    sunlight
  );

  let bottomG = lerp(
    bottomNight[1],
    bottomDay[1],
    sunlight
  );

  let bottomB = lerp(
    bottomNight[2],
    bottomDay[2],
    sunlight
  );

  translate(
    -width / 2,
    -height / 2,
    -600
  );

  noStroke();

  for (
    let y = 0;
    y <= height;
    y += 8
  ) {
    let a =
      y / height;

    fill(
      lerp(
        topR,
        bottomR,
        a
      ),
      lerp(
        topG,
        bottomG,
        a
      ),
      lerp(
        topB,
        bottomB,
        a
      )
    );

    rect(
      0,
      y,
      width,
      10
    );
  }

  if (sunlight < 0.35) {
    drawStars(
      1 -
      sunlight / 0.35
    );
  }

  pop();
}



function drawStars(alphaAmount) {
  randomSeed(42);

  noStroke();

  for (
    let i = 0;
    i < 90;
    i++
  ) {
    let x = random(
      20,
      width - 20
    );

    let y = random(
      20,
      height * 0.7
    );

    let s = random(
      1,
      3
    );

    fill(
      255,
      245,
      220,
      180 * alphaAmount
    );

    circle(
      x,
      y,
      s
    );
  }
}



function setupSceneLights(sunlight) {
  ambientLight(
    lerp(
      22,
      80,
      sunlight
    ),
    lerp(
      24,
      78,
      sunlight
    ),
    lerp(
      42,
      72,
      sunlight
    )
  );

  directionalLight(
    lerp(
      70,
      255,
      sunlight
    ),
    lerp(
      80,
      230,
      sunlight
    ),
    lerp(
      120,
      190,
      sunlight
    ),
    -0.5,
    0.8,
    -1
  );

  pointLight(
    255 * sunlight,
    190 * sunlight,
    145 * sunlight,
    -260,
    -280,
    320
  );
}



function drawSunOrMoon(sunlight) {
  push();

  let isDay =
    currentHour >= 6 &&
    currentHour <= 18;

  if (isDay) {
    let progress = map(
      currentHour,
      6,
      18,
      0,
      1
    );

    let x = lerp(
      -width * 0.38,
      width * 0.38,
      progress
    );

    let y =
      -height * 0.15 -
      sin(progress * PI) *
      height *
      0.24;

    translate(
      x,
      y,
      -420
    );

    noStroke();

    emissiveMaterial(
      255,
      210,
      120
    );

    sphere(
      28,
      24,
      16
    );

  } else {

    let nightProgress;

    if (currentHour > 18) {
      nightProgress = map(
        currentHour,
        18,
        24,
        0,
        0.5
      );
    } else {
      nightProgress = map(
        currentHour,
        0,
        6,
        0.5,
        1
      );
    }

    let x = lerp(
      -width * 0.38,
      width * 0.38,
      nightProgress
    );

    let y =
      -height * 0.12 -
      sin(
        nightProgress * PI
      ) *
      height *
      0.18;

    translate(
      x,
      y,
      -420
    );

    noStroke();

    emissiveMaterial(
      205,
      220,
      255
    );

    sphere(
      20,
      20,
      14
    );
  }

  pop();
}



function drawStem() {
  push();

  noStroke();

  ambientMaterial(
    34,
    105,
    51
  );

  translate(
    0,
    70,
    0
  );

  cylinder(
    7,
    360,
    16,
    1
  );

  pop();
}



function drawLeaves() {
  drawLeaf(
    -2,
    40,
    0,
    -0.75,
    1
  );

  drawLeaf(
    2,
    135,
    0,
    PI + 0.65,
    0.9
  );
}



function drawLeaf(
  x,
  y,
  z,
  rotationYValue,
  scaleValue
) {
  push();

  translate(
    x,
    y,
    z
  );

  rotateY(
    rotationYValue
  );

  rotateZ(
    -0.35
  );

  scale(
    scaleValue
  );

  noStroke();

  ambientMaterial(
    38,
    118,
    60
  );

  beginShape();

  vertex(
    0,
    0,
    0
  );

  vertex(
    22,
    -16,
    4
  );

  vertex(
    54,
    -13,
    7
  );

  vertex(
    88,
    0,
    0
  );

  vertex(
    54,
    13,
    7
  );

  vertex(
    22,
    16,
    4
  );

  endShape(CLOSE);

  pop();
}



function drawRose(openness) {
  push();

  drawSepals(
    openness
  );

  drawPetalLayer(
    5,
    7,
    34,
    0,
    openness,
    0.05
  );

  drawPetalLayer(
    7,
    13,
    44,
    PI / 7,
    openness,
    0.18
  );

  drawPetalLayer(
    9,
    21,
    56,
    0,
    openness,
    0.34
  );

  drawPetalLayer(
    11,
    30,
    70,
    PI / 11,
    openness,
    0.52
  );

  drawPetalLayer(
    13,
    41,
    84,
    0,
    openness,
    0.72
  );

  drawPetalLayer(
    15,
    53,
    98,
    PI / 15,
    openness,
    0.92
  );

  drawRoseCenter(
    openness
  );

  pop();
}



function drawPetalLayer(
  count,
  radius,
  petalLength,
  rotationOffset,
  openness,
  layerAmount
) {
  for (
    let i = 0;
    i < count;
    i++
  ) {

    let angle =
      TWO_PI *
      i /
      count +
      rotationOffset;

    push();

    rotateY(
      angle
    );

    translate(
      radius,
      0,
      0
    );

    let closedTilt =
      lerp(
        0.04,
        0.18,
        layerAmount
      );

    let openTilt =
      lerp(
        0.45,
        1.15,
        layerAmount
      );

    let individualVariation =
      sin(
        i * 2.71 +
        layerAmount * 11.3
      ) *
      0.045;

    let tilt =
      lerp(
        closedTilt,
        openTilt,
        openness
      ) +
      individualVariation;

    rotateZ(
      tilt
    );

    let widthValue =
      petalLength *
      lerp(
        0.42,
        0.72,
        layerAmount
      );

    drawPetal(
      petalLength,
      widthValue,
      openness,
      layerAmount,
      i
    );

    pop();
  }
}



function drawPetal(
  lengthValue,
  widthValue,
  openness,
  layerAmount,
  seedValue
) {
  let segments = 16;

  noStroke();

  let r = lerp(
    118,
    205,
    layerAmount
  );

  let g = lerp(
    8,
    32,
    layerAmount
  );

  let b = lerp(
    35,
    68,
    layerAmount
  );

  ambientMaterial(
    r,
    g,
    b
  );

  beginShape(
    TRIANGLE_STRIP
  );

  for (
    let i = 0;
    i <= segments;
    i++
  ) {
    let t =
      i / segments;

    let y =
      -lengthValue * t;

    let shape =
      pow(
        sin(t * PI),
        0.72
      );

    let halfWidth =
      widthValue *
      shape *
      0.5;

    let bowl =
      sin(t * PI) *
      lerp(
        12,
        4,
        openness
      ) *
      (
        1 -
        layerAmount * 0.35
      );

    let tipCurl =
      pow(
        t,
        2.8
      ) *
      lerp(
        -8,
        18 +
        layerAmount * 10,
        openness
      );

    let organic =
      sin(
        seedValue * 1.83 +
        t * 4.5
      ) *
      1.2 *
      layerAmount;

    let z =
      bowl +
      tipCurl +
      organic;

    vertex(
      -halfWidth,
      y,
      z
    );

    vertex(
      halfWidth,
      y,
      z
    );
  }

  endShape();
}



function drawRoseCenter(openness) {
  for (
    let i = 0;
    i < 12;
    i++
  ) {
    push();

    let angle =
      i * 1.55;

    let radius =
      2 +
      i * 0.75;

    rotateY(
      angle
    );

    translate(
      radius,
      -i * 0.55,
      0
    );

    rotateZ(
      0.15 +
      openness * 0.1
    );

    drawPetal(
      20 +
      i * 0.8,
      13 +
      i * 0.25,
      openness * 0.25,
      0.02,
      i + 100
    );

    pop();
  }
}



function drawSepals(openness) {
  for (
    let i = 0;
    i < 5;
    i++
  ) {
    push();

    rotateY(
      TWO_PI *
      i /
      5
    );

    rotateZ(
      0.55 +
      openness * 0.2
    );

    translate(
      12,
      12,
      0
    );

    noStroke();

    ambientMaterial(
      38,
      112,
      52
    );

    cone(
      6,
      55,
      6,
      1
    );

    pop();
  }
}



function drawHUD(sunlight) {
  push();

  resetMatrix();

  translate(
    -width / 2,
    -height / 2,
    500
  );

  let left = 70;

  let right =
    width - 70;

  let timelineY =
    height - 62;

  noStroke();

  fill(
    255,
    235
  );

  textAlign(
    CENTER,
    CENTER
  );

  textSize(22);

  let h =
    floor(
      currentHour
    );

  let m =
    floor(
      (
        currentHour -
        h
      ) *
      60
    );

  if (h >= 24) {
    h = 23;
    m = 59;
  }

  text(
    nf(h, 2) +
    ":" +
    nf(m, 2),
    width / 2,
    42
  );

  textSize(13);

  fill(
    255,
    180
  );

  let stateText;

  if (
    currentHour < 5.5 ||
    currentHour >= 19
  ) {

    stateText =
      "夜晚・玫瑰闔上";

  } else if (
    currentHour < 8
  ) {

    stateText =
      "清晨・玫瑰正在打開";

  } else if (
    currentHour < 17
  ) {

    stateText =
      "日照・玫瑰盛開";

  } else {

    stateText =
      "黃昏・玫瑰正在闔上";
  }

  text(
    stateText,
    width / 2,
    68
  );

  stroke(
    255,
    100
  );

  strokeWeight(1);

  line(
    left,
    timelineY,
    right,
    timelineY
  );

  let tickHours = [
    0,
    6,
    12,
    18,
    24
  ];

  for (
    let t of tickHours
  ) {

    let x = map(
      t,
      0,
      24,
      left,
      right
    );

    noStroke();

    fill(
      255,
      155
    );

    circle(
      x,
      timelineY,
      4
    );

    textSize(11);

    textAlign(
      CENTER,
      TOP
    );

    text(
      nf(t, 2) + ":00",
      x,
      timelineY + 12
    );
  }

  let indicatorX = map(
    currentHour,
    0,
    24,
    left,
    right
  );

  noStroke();

  fill(255);

  circle(
    indicatorX,
    timelineY,
    12
  );

  textAlign(
    CENTER,
    BOTTOM
  );

  textSize(12);

  fill(
    255,
    170
  );

  if (!hasMoved) {

    text(
      "移動滑鼠左右，控制一天 24 小時",
      width / 2,
      height - 18
    );

  } else {

    text(
      "← 00:00　移動滑鼠控制時間　24:00 →",
      width / 2,
      height - 18
    );
  }

  pop();
}



function windowResized() {
  resizeCanvas(
    windowWidth,
    windowHeight
  );
}