var font;
var clock;
var sampleFactor = 0.15;

function preload() {
    // font = loadFont("fonts/AvenirNextLTPro-Demi.otf");
    // font = loadFont("fonts/SpicyRice-Regular.ttf");
    // font = loadFont("fonts/PatrickHand-Regular.ttf");
    // font = loadFont("fonts/ArchivoBlack-Regular.ttf");
    font = loadFont("fonts/BreeSerif-Regular.ttf");
    // font = loadFont("fonts/FredokaOne-Regular.ttf");
    // font = loadFont("fonts/Rokkitt-Black.ttf");
    // font = loadFont("fonts/Rokkitt-Bold.ttf");
}

function setup() {
    var canvas = createCanvas(900, 180);
    canvas.parent("canvas-parent");
    
    background(153, 0, 102);
    colorMode(HSB);
    textAlign(LEFT, TOP);
    clock = new Clock();
    clock.init();
}

function draw() {
    colorMode(RGB);
    // background(153, 0, 102);
    background(0);
    colorMode(HSB);
    clock.update();
    clock.show();
}
