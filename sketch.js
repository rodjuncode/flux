let palette = {};
let S;
let bodyStroke, chinStroke, chinShadowStroke, faceStroke;

// read 'f' parameter from URL
const urlParams = new URLSearchParams(window.location.search);
const f = urlParams.get("f");

const UPTO = 2100;
const FRAMES_QTY = 200;

const bodyPath =
  "M1.63,334.28s58-39.56,90.79-110.63S73.86.5,73.86.5h101.11s20.52,109.81,44.14,182.88,108.52,149.12,108.52,149.12l-326,1.78Z";
const chinShadowPath =
  "M47.41.03c25.5.6,43.43,15.94,52.51,26.03,4.43,4.93,7.22,11.5,7.98,18.56,3.86,36.2,13.33,159.56-37.3,158.22C21.13,201.51,4.38,77.84.18,36.78-1.1,24.26,4.62,12.16,14.46,6.73,21.73,2.72,32.27-.33,47.41.03Z";
const facePath =
  "M121.04,49.93c13.33,191.17-95.55,171.29-120.64-.37C-3.58,22.33,23.1,1.25,50.6.23c34.15-2.95,68.55,22.65,70.44,49.7Z";
const chinPath =
  "M121.14.44c4.52,43.77,9.44,145.98-43.3,144.76C28.46,144.07,7.9,49.77.49.07";
const faceShadowPath =
  "M80.42,74.9c-6.66-10.53,10.36-35.64,10.36-35.64M47.38,70.97s10.65-16.45,0-8c-11.55,9.17-18,2.17-18,2.17M65.34,103.72c-7-4.07-21.19,2.34-21.19,2.34M6.84,16.97c3.63,2.25,6.41,5.65,8.11,9.57l11.27,25.99s-5.33-23.11-11.56-33.33S0,16.38,0,16.38c1.71-1.78,4.37-.94,6.84.59ZM78.77,1.17c-19.18-5.53-43.37,10.33-43.37,10.33M64.23,85.26c-11.31-1.84-28.14,3.54-28.14,3.54M108.31,3.88s-5.22,18.32-1.53,23.7";
const faceGlowPath =
  "M.96,56.71c12.17,68.68,54.13,139.43,81.77,127.15s37.19-68.33,25.02-137.02C95.59-21.84-11.2-11.97.96,56.71Z";
const bodyGlowPath =
  "M76.04,41.52C94.45,65.86,116.99,0,116.99,0c0,0,55.77,147.34,72.23,171.34,16,23.33,51.33,49.33,51.33,49.33.5-1.93-253.78,5.46-240.01,0,14.85-5.89,41.81-40.52,50.33-62.9,8.52-22.38,21.61-140.5,21.61-140.5,0,0-18.86-5.39,3.56,24.24Z";

function setup() {
  createAdaptiveCanvas(500, 800);

  // change color mode to HSB
  colorMode(HSB);

  // randomizes a int color hue value
  palette.fg = [Math.floor(Math.random() * 361), 57, 98];
  // background is the opposite of fg color in the color disc
  palette.bg = [(palette.fg[0] + 180) % 360, 57, 98];

  S = new Spiral();

  bodyStroke = interpolateStroke(bodyPath, 1000);
  chinStroke = interpolateStroke(chinPath, 300);

  // frameRate(10);
}

function draw() {
  background(...palette.bg);

  S.draw(min(((f ? f : frameCount) * UPTO) / FRAMES_QTY, UPTO));

  drawCharacter();

  // balloon
  push();
  fill(255);
  stroke(255);
  rectMode(CENTER);
  translate(scaler.width() / 2 - 5, scaler.height() / 2 - 220);
  rotate(-0.025);
  rect(0, 0, 100, 100, 10);
  pop();

  // draws a white frame with rounded corner
  noFill();
  stroke(255);
  strokeWeight(30);
  rect(0, 0, scaler.width(), scaler.height(), 25);
}

function drawCharacter() {
  // body
  push();
  translate(125, 480);
  noStroke();
  fill(...palette.fg);
  let body = new Path2D(bodyPath);
  drawingContext.fill(body);
  fill(0);
  for (let i = 0; i < bodyStroke.length; i++) {
    let radius = map(bodyStroke[i].strokeWeight, 0, 1, 1, 5);
    ellipse(bodyStroke[i].x, bodyStroke[i].y, radius, radius);
  }
  pop();

  // chin shadow
  push();
  translate(190, 388);
  let chinShadow = new Path2D(chinShadowPath);
  fill(0, 0, 0, 0.6);
  drawingContext.fill(chinShadow);
  pop();

  // face
  push();
  translate(177, 380);
  fill(...palette.fg);
  let face = new Path2D(facePath);
  drawingContext.fill(face);
  pop();

  // chin
  push();
  translate(177, 430);
  fill(...palette.fg);
  let chin = new Path2D(chinPath);
  drawingContext.fill(chin);
  noStroke();
  fill(0);
  for (let i = 0; i < chinStroke.length; i++) {
    let radius = map(chinStroke[i].strokeWeight, 0, 1, 1, 5);
    ellipse(chinStroke[i].x, chinStroke[i].y, radius, radius);
  }
  pop();

  // face glow
  push();
  translate(180, 388);
  fill(0, 0, 100, 0.4);
  let faceGlow = new Path2D(faceGlowPath);
  drawingContext.fill(faceGlow);
  pop();

  // body glow
  push();
  translate(175, 575);
  fill(0, 0, 100, 0.4);
  let bodyGlow = new Path2D(bodyGlowPath);
  drawingContext.fill(bodyGlow);
  pop();

  // faceshadow
  push();
  translate(198, 448);
  fill(0, 0, 0, 0.8);
  let faceShadow = new Path2D(faceShadowPath);
  drawingContext.fill(faceShadow);
  pop();
}

class Spiral {
  constructor() {
    this.x = scaler.width() / 2 - 10;
    this.y = scaler.height() / 2 + 22;
    this.radiusX = 0;
    this.radiusY = 0;
    this.angle = -1.4;
    this.curveAngle = 0;
    this.delta = 3;
    this.stroke = [0, 0, 100]; // white
    // this.stroke = palette.fg; // fg
    this.strokeWeight = 1;

    this.reset();
  }

  draw(upTo = 1000) {
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    stroke(...this.stroke);
    strokeWeight(this.strokeWeight);
    noFill();
    beginShape();
    for (let i = 0; i < upTo + 150; i++) {
      let noiseValX = noise(frameCount * 0.02 + i) * 1.5;
      let noiseValY = noise(frameCount * 0.05 + i) * 1.5; // offset the noise value for y to create a more dynamic movement

      let offsetX = map(noiseValX, 0, 1, -this.state.delta, this.state.delta);
      let offsetY = map(noiseValY, 0, 1, -this.state.delta, this.state.delta);

      curveVertex(
        this.state.radiusX * cos(this.state.curveAngle) + offsetX,
        this.state.radiusY * sin(this.state.curveAngle) + offsetY
      );

      this.state.radiusX += 0.23;
      this.state.radiusY += 0.37;
      this.state.curveAngle += TWO_PI / 25;
      this.state.delta += 0.5 * sin(this.state.curveAngle);
    }
    endShape();
    pop();

    this.reset();
  }

  reset() {
    this.state = {
      x: this.x,
      y: this.y,
      radiusX: this.radiusX,
      radiusY: this.radiusY,
      curveAngle: this.curveAngle,
      delta: this.delta,
    };
  }
}

function interpolateStroke(pathString, howManyPoints) {
  // Create an SVG path element
  let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  let path = document.createElementNS("http://www.w3.org/2000/svg", "path");

  // Set the path data
  path.setAttribute("d", pathString);

  // Append the path to the SVG (not appended to the document)
  svg.appendChild(path);

  var pathLength = path.getTotalLength();

  let points = [];
  for (let i = 0; i < howManyPoints; i++) {
    let p = i / howManyPoints;
    let point = path.getPointAtLength(pathLength * p);
    let strokeWeight = noise(i * 0.025);
    points.push({ x: point.x, y: point.y, strokeWeight: strokeWeight });
  }
  return points;
}
