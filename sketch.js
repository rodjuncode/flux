let palette = {};
let S;

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

  S.draw(frameCount*2);
}

class Spiral {
  constructor() {
    this.x = scaler.width() / 2;
    this.y = scaler.height() / 2;
    this.radiusX = 0;
    this.radiusY = 0;
    this.angle = 0;
    this.delta = 3;
    this.stroke = [palette.fg]; // white
    this.strokeWeight = 1;

    this.reset();
  }

  draw(upTo = 1000) {
    push();
    translate(this.x, this.y);
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
        this.state.radiusX * cos(this.state.angle) + offsetX,
        this.state.radiusY * sin(this.state.angle) + offsetY
      );

      this.state.radiusX += 0.23;
      this.state.radiusY += 0.37;
      this.state.angle += TWO_PI / 25;
      this.state.delta += 0.5 * sin(this.state.angle);
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
      angle: this.angle,
      delta: this.delta,
    };
  }
}
