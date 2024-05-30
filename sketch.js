let palette = {};

function setup() {
  createAdaptiveCanvas(500, 800);

  // change color mode to HSB
  colorMode(HSB);

  // randomizes a int color hue value
  palette.fg = [Math.floor(Math.random() * 361), 57, 98];
  palette.bg = [Math.floor(Math.random() * 361), 57, 98];
}

function draw() {
  background(...palette.bg);

  // draw a rectangle with the fg color
  fill(...palette.fg);
  rectMode(CENTER);
  rect(
    scaler.width() / 2,
    scaler.height() / 2,
    scaler.width() / 2,
    scaler.height() / 2
  );
}
