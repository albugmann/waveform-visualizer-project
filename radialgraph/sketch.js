let amp;
let volHistory = [];

function preload() {
//   song = loadSound('audio/the-alphabeat.mp3'); 
//   getAudioContext().resume();
 // make a microphone object:
 mic = new p5.AudioIn()
 // make an FFT sound analyzer:
 fft = new p5.FFT();
 // start the mic:
 mic.start();
 // set the mic as the input to the analyzer:
 fft.setInput(mic);
}

function setup() {
  createCanvas(600, 600)
  amp = new p5.Amplitude();
}

function draw() {
  background(0);
  let vol = amp.getLevel();
  volHistory.push(vol);
  for (let x = 0; x < volHistory.length; x++) {
    stroke(255)
    let y = map(volHistory[x], 0, 1, height, 0);
    point(x, y);
  }
  // ellipse(300, 300, vol*300, vol*300);
  console.log(vol)
}

// Chrome 70 will require user gestures required to enable web audio api
// Click on the web page to start audio
// function touchStarted() {
//   getAudioContext().resume();
// }
