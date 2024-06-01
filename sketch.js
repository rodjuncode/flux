let palette = {};
let S;
let P = 0;

function setup() {
  createAdaptiveCanvas(500, 800);

  // change color mode to HSB
  colorMode(HSB);

  // randomizes a int color hue value
  palette.fg = [Math.floor(Math.random() * 361), 57, 98];
  // background is the opposite of fg color in the color disc
  palette.bg = [(palette.fg[0] + 180) % 360, 57, 98];

  S = new Spiral();
}

function draw() {
  background(...palette.bg);

  S.draw(min(frameCount * 2, 2000));


  drawCharacter();

  P+=0.001;
  if (P > 1) {
    P = 0;
  }
}

function drawCharacter() {
  push();
  translate(125,480);
  fill(...palette.fg);
  let bodyPath = "M87.23,234.72C129.71,157.64,73.9.5,73.9.5h101.11s13.33,122,53.33,203.33,99.33,128.67,99.33,128.67H1.68s49.56-32.44,85.56-97.78Z";
  let body = new Path2D(bodyPath);
  drawingContext.fill(body);
  drawingContext.stroke(body);
  let dot = myInterpolation(bodyPath, P);
  fill(0);
  ellipse(dot.x, dot.y, 10, 10);
  pop();

  

  push();
  translate(190,390);
  let chinShadowPath = "M47.41.03c25.5.6,43.43,15.94,52.51,26.03,4.43,4.93,7.22,11.5,7.98,18.56,3.86,36.2,13.33,159.56-37.3,158.22C21.13,201.51,4.38,77.84.18,36.78-1.1,24.26,4.62,12.16,14.46,6.73,21.73,2.72,32.27-.33,47.41.03Z"
  let chinShadow = new Path2D(chinShadowPath);
  fill(0, 0, 0, 0.7);
  drawingContext.fill(chinShadow);
  pop();

  push();
  translate(177, 380);
  fill(...palette.fg);
  let face = new Path2D(
    "M121.04,49.93c13.33,191.17-95.55,171.29-120.64-.37C-3.58,22.33,23.1,1.25,50.6.23c34.15-2.95,68.55,22.65,70.44,49.7Z"
  );
  drawingContext.fill(face);
  pop();

  push();
  translate(177, 430);
  fill(...palette.fg);
  let chinPath = "M121.14.44c4.52,43.77,9.44,145.98-43.3,144.76C28.46,144.07,7.9,49.77.49.07";
  let chin = new Path2D(chinPath);
  drawingContext.fill(chin);
  drawingContext.stroke(chin);
  dot = myInterpolation(chinPath, P);
  fill(0);
  ellipse(dot.x, dot.y, 10, 10);  

  pop();
}

class Spiral {
  constructor() {
    this.x = scaler.width() / 2 - 10;
    this.y = scaler.height() / 2 + 20;
    this.radiusX = 0;
    this.radiusY = 0;
    this.angle = -1.4;
    this.curveAngle = 0;
    this.delta = 3;
    this.stroke = [0, 0, 100]; // white
    this.strokeWeight = 1;

    this.reset();
  }

  draw(upTo = 1000) {
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    fill(...palette.bg);
    noStroke();
    ellipse(0, 0, 10, 10); // draw a circle at the center of the canvas
    stroke(...this.stroke);
    strokeWeight(this.strokeWeight);
    noFill();
    beginShape();
    for (let i = 0; i < upTo; i++) {
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

function myInterpolation(pathString, p) {
  // Create an SVG path element
  var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  var path = document.createElementNS("http://www.w3.org/2000/svg", "path");

  // Set the path data
  path.setAttribute("d", pathString);

  // Append the path to the SVG (not appended to the document)
  svg.appendChild(path);

  // Get the total length of the path
  var pathLength = path.getTotalLength();

  // Get the point at 50% along the path
  return path.getPointAtLength(pathLength * p);

}
