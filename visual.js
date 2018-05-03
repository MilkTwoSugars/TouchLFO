function Visualiser(input, colour) {

    this.fft = new p5.FFT();
    this.fft.setInput(input);
    this.colour = colour;

    this.draw = function () {
        let waveform = this.fft.waveform();  // analyze the waveform
        beginShape();
        noFill();
        strokeWeight(2);
        stroke(this.colour)
        for (var i = 0; i < waveform.length; i++) {
            let x = map(i, 0, waveform.length, 0, width);
            let y = map(waveform[i], -1, 1, height, 0);
            vertex(x, y);
        }
        endShape();
        
    }
}