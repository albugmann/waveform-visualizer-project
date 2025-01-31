
/*
	pitch detector in p5.js
	Listens to the microphone, displays the loudest pitch
	waveform drawing routine comes from the p5.FFT example.
	created 15 Nov 2018
	by Tom Igoe
  https://editor.p5js.org/icm4.0/sketches/v7lQl0NhH
*/




var mic; // an object for the microphone input
var fft; // an object for the FFT frequency analyzer
// a list of standard pitches:

var pitches = {
  NOTE_B0: 31,
  NOTE_C1: 33,
  NOTE_CS1: 35,
  NOTE_D1: 37,
  NOTE_DS1: 39,
  NOTE_E1: 41,
  NOTE_F1: 44,
  NOTE_FS1: 46,
  NOTE_G1: 49,
  NOTE_GS1: 52,
  NOTE_A1: 55,
  NOTE_AS1: 58,
  NOTE_B1: 62,
  NOTE_C2: 65,
  NOTE_CS2: 69,
  NOTE_D2: 73,
  NOTE_DS2: 78,
  NOTE_E2: 82,
  NOTE_F2: 87,
  NOTE_FS2: 93,
  NOTE_G2: 98,
  NOTE_GS2: 104,
  NOTE_A2: 110,
  NOTE_AS2: 117,
  NOTE_B2: 123,
  DO: 131,
  NOTE_CS3: 139,
  RE: 147,
  NOTE_DS3: 156,
  NOTE_E3: 165,
  NOTE_F3: 175,
  NOTE_FS3: 185,
  NOTE_G3: 196,
  NOTE_GS3: 208,
  NOTE_A3: 220,
  NOTE_AS3: 233,
  NOTE_B3: 247,
  NOTE_C4: 262,
  NOTE_CS4: 277,
  NOTE_D4: 294,
  NOTE_DS4: 311,
  NOTE_E4: 330,
  NOTE_F4: 349,
  NOTE_FS4: 370,
  NOTE_G4: 392,
  NOTE_GS4: 415,
  NOTE_A4: 440,
  NOTE_AS4: 466,
  NOTE_B4: 494,
  NOTE_C5: 523,
  NOTE_CS5: 554,
  NOTE_D5: 587,
  NOTE_DS5: 622,
  NOTE_E5: 659,
  NOTE_F5: 698,
  NOTE_FS5: 740,
  NOTE_G5: 784,
  NOTE_GS5: 831,
  NOTE_A5: 880,
  NOTE_AS5: 932,
  NOTE_B5: 988,
  NOTE_C6: 1047,
  NOTE_CS6: 1109,
  NOTE_D6: 1175,
  NOTE_DS6: 1245,
  NOTE_E6: 1319,
  NOTE_F6: 1397,
  NOTE_FS6: 1480,
  NOTE_G6: 1568,
  NOTE_GS6: 1661,
  NOTE_A6: 1760,
  NOTE_AS6: 1865,
  NOTE_B6: 1976,
  NOTE_C7: 2093,
  NOTE_CS7: 2217,
  NOTE_D7: 2349,
  NOTE_DS7: 2489,
  NOTE_E7: 2637,
  NOTE_F7: 2794,
  NOTE_FS7: 2960,
  NOTE_G7: 3136,
  NOTE_GS7: 3322,
  NOTE_A7: 3520,
  NOTE_AS7: 3729,
  NOTE_B7: 3951,
  NOTE_C8: 4186,
  NOTE_CS8: 4435,
  NOTE_D8: 4699,
  NOTE_DS8: 4978
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  // make a microphone object:
  mic = new p5.AudioIn()
  // make an FFT sound analyzer:
  fft = new p5.FFT();
  // start the mic:
  mic.start();
  // set the mic as the input to the analyzer:
  fft.setInput(mic);
  

}

function draw() {
  background(0);
  // get the mic level
  micLevel = mic.getLevel();
  // analyze the sound using FFT:
  let spectrum = fft.analyze();
  // variable to find the loudest pitch:

  let loudestPitch = 0;
  // variable for the note name of the loudest pitch:
  let note = '';
  // loop over the pitches array:

  let waveform = fft.waveform();
  // Calculate absolute amplitudes
      let amplitudes = waveform.map(abs);
  
      // Find the top 5 loudest sounds
      loudestSounds = amplitudes
      .map((amplitude, index) => ({ index, amplitude }))
      .sort((a, b) => b.amplitude - a.amplitude)
      .slice(0, 5);

      // Display the top 5 loudest sounds
  fill(0);
  textSize(20);
  for (let i = 0; i < loudestSounds.length; i++) {
    text(`Loudest ${i + 1}: ${nf(loudestSounds[i].amplitude, 1, 3)}`, 10, 20 + i * 20);
  }

  // Text size
  textAlign(LEFT, TOP);
  textSize(64);

  // create a canvas that's separated into quadrants 
   // Calculate the center of the canvas
   let centerX = width / 2;
   let centerY = height / 2;

   // Draw the vertical line
  stroke(255); // Set stroke color to black
  line(centerX, 0, centerX, height)

  // Draw the horizontal line
  line(0, centerY, width, centerY);

  // Optionally, you can add labels to each quadrant
  textSize(32);
  fill(0);
  textAlign(CENTER, CENTER);
  text("Q1", centerX / 2, centerY / 2); // Top-left quadrant
  text("Q2", 3 * centerX / 2, centerY / 2); // Top-right quadrant
  text("Q3", centerX / 2, 3 * centerY / 2); // Bottom-left quadrant
  text("Q4", 3 * centerX / 2, 3 * centerY / 2); // Bottom-right quadrant





//   for (let p in pitches) {
//     // get the sound energy/volume at the pitch of each element in the array:
//     let amplitude = fft.getEnergy(pitches[p]);
//     // console.log("amplitude: " + amplitude)
//     // if the sound energy is the loudest so far,
//     // save this as the current loudest:

//     // get the notes in a 100hz range of a pitch 

//     if (amplitude > loudestPitch) {
//       loudestPitch = amplitude;
//       note = p;
//     }
//     console.log("PITCH: ", p)

      

   

//   }

  // Display the top 5 loudest sounds
//   fill(0);
//   textSize(12);
//   for (let i = 0; i < loudestSounds.length; i++) {
//     text(`Loudest ${i + 1}: ${nf(loudestSounds[i].amplitude, 1, 3)}`, 10, 20 + i * 20);
//   }



  // Draws text to screen
  let freq = fft.getCentroid()
  text(floor(freq), 500, 20)
  // console.log(floor(freq))

  

  // console.log(spectrum)
  // print out the loudest note:
//   text(note, 20, 20);


  // draw the sound waveform:
//   let waveform = fft.waveform();
//   fft.waveform: 

   
    noFill();
    beginShape();
    // stroke('#0099FF'); // waveform is teal
    strokeWeight(1);

  
  
  for (var i = 0; i < waveform.length; i++) {
    

    let x = map(i, 0, waveform.length , 0, windowHeight);
    let y = map(waveform[i] , -1, 1, 0, windowHeight);
    // vertex(x * cos(i), y * sin(i));

    // let r = map(waveform.length, 0, 1, 10, 300);
    // let x = r * cos(i);
    // let y = r * sin(i);
    vertex(x, y);


    

    if (freq > 4000) {


   
      // text(floor(freq), 500, 20)
      stroke('#ff00ff'); // waveform  is magenta
      

    //   fill(100, 102, 0) 

      let x = map(i, 10, waveform.length, 0, 500);
      let y = map(waveform[i], -10, 1, 0, 500); 
    
      vertex(x, y);

    } else if (freq >  3000 && freq < 4000) {
      stroke('#800080'); //waveform is purple 
      fill("#0099FF"); // fill is purple

      let x = map(i, 10, waveform.length, 0, 500);
      let y = map(waveform[i], -10, 1, 0, 500);
      vertex(x + 1000, y - 1000);

    } else if (freq >  2000 && freq < 3000) {

      stroke('##F44336'); //waveform is red
      fill("#F44336"); // fill is red

      let x = map(i, 10, waveform.length, 0, 500);
      let y = map(waveform[i], -1000, 1, 0, 500);
      vertex(x - 1000, y + 1000);

    } else {

      
            
      fill(0, 0, 255) //fill is blue
      stroke('#0099FF');

      let x = map(i, 1000, waveform.length, 0, width);
      let y = map(waveform[i], -1000, 1, 0, height);
      vertex(x - 1000, y - 1000);

    }
  }
  endShape();

}
