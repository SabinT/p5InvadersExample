let mic, fft;

let userReady = false;

window.setup = function() {
  createCanvas(800, 800);
  noFill();
  angleMode(DEGREES);
}


let angle = 0;
window.draw = function() {
    if (!userReady) {
        return;
    }

    translate(width / 2, height / 2);
    background(color(20,20,20,2));

    noStroke();
    let spectrum = fft.analyze();

    for (let i = 0; i < spectrum.length; i++) {
        const r = 100 + i /  spectrum.length * width * 0.3;
        const val = spectrum[i];
        const ival = 255- val;
        fill(color(ival, ival, ival));
        const dia = val / 255 * 10;
        circle(r * cos(angle), r * sin(angle), dia);
    }

    angle += 0.5;
}

window.mousePressed = function () {
    userReady = true;
    getAudioContext().resume();
    mic = new p5.AudioIn();
    mic.start();
    fft = new p5.FFT();
    fft.setInput(mic);
};