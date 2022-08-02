let mic, fft;

let userReady = false;

window.setup = function() {
  createCanvas(800, 800);
  noFill();
}

window.draw = function() {
    if (!userReady) {
        return;
    }

    background(200);

    let spectrum = fft.analyze();

    beginShape();
    for (let i = 0; i < spectrum.length; i++) {
        vertex(i, map(spectrum[i], 0, 255, height, 0));
        //circle(i, map(spectrum[i], 0, 255, height, 0), 10);
    }
    endShape();
}

window.mousePressed = function () {
    userReady = true;
    getAudioContext().resume();
    mic = new p5.AudioIn();
    mic.start();
    fft = new p5.FFT();
    fft.setInput(mic);
};