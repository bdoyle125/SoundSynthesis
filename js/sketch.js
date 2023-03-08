let initTone = false;
let polarExpress;

// Instruments
const train = new Tone.NoiseSynth({
  "noise": {
    "type": "pink",
    "playbackRate": 0.2
  },
  "envelope": {
    "attackCurve": "ripple",
    "releaseCurve": "ripple",
    "attack": 1,
    "decay": 0.3,
    "sustain": 1,
    "release": 1
  }
});

// Effects
const pitchShift = new Tone.PitchShift({
  "pitch": 7,
  "windowSize": 0.1,
  "delayTime": 0,
  "feedback": 0,
  "wet": 0.5
});

function preload() {
  polarExpress = loadImage("train.jpg");
}

function setup() {
  createCanvas(600, 400);

  // Connections
  train.connect(pitchShift);
  pitchShift.toDestination();

}

function draw() {
  background(220);
  textSize(15);
  text('Click to summon the train! The more times you click, the slower it goes', 65, 100);
  text('Hold your click to guess what train the picture is!', 65, 150);
  if (mouseIsPressed) {
    image(polarExpress, 0, 0, 600, 400);
  }
}

function keyPressed() {
  if (keyCode === 32 && initTone === false) {
    console.log('spacebar pressed')
    Tone.start();
    initTone = true;
  }
}

function mousePressed() {
  console.log('pressed');
  // First number is how long the attack lasts in second. The number after it describes delay until it happens
  train.triggerAttackRelease('1n');
  Tone.Transport.bpm.value -= 5;
  
}