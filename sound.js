var lfo, osc, filt;
var oscStarted = false;
var soundStarted = false;

function initialiseSound() {

    lfo = new p5.Oscillator();
    osc = new p5.Oscillator();
    filt = new p5.Filter();

    getWaves();

    lfo.disconnect();
    osc.disconnect();
    osc.connect(filt);

    lfo.start();
    osc.amp(0.1)
}

function updateSound(x1, y1, x2, y2) {

    let lfoFreq = map(x2, 0, windowWidth, 0.1, 30);
    let lfoAmp = map(y2, 0, windowHeight, 50, 600);

    let filterFreq = map(x1, 0, windowWidth, 410, 1100);
    let oscFreq = map(y1, 0, windowHeight, 400, 25);

    let filterRes = 12;

    if (soundStarted) {

        if (!oscStarted) {
            oscStarted = true;
            osc.start();
        }

        lfo.freq(lfoFreq);
        osc.freq(oscFreq);
        filt.freq(filterFreq);
        filt.res(filterRes);
        lfo.amp(lfoAmp);
        filt.freq(lfo);
    }
}

function getWaves() {
    console.log("Checking url for waves...")
    let lfoWave = getParameterByName('lfo'); // "lorem"
    let oscWave = getParameterByName('osc'); // "" (present with empty value)

    if(lfoWave === "sine" || lfoWave === "sawtooth" || lfoWave === "square" || lfoWave === "triangle"){
        console.log("Setting LFO wave to " + lfoWave);
        lfo.setType(lfoWave);
    } else {
        lfo.setType("sine");
    }

    if(oscWave === "sine" || oscWave === "sawtooth" || oscWave === "square" || oscWave === "triangle"){
        console.log("Setting OSC wave to " + oscWave);
        osc.setType(oscWave);
    } else {
        osc.setType("sawtooth");
    }
}

function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}