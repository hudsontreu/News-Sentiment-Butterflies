let img;

function preload() {
    img = loadImage('path_to_your_image.jpg'); // Replace with your image path
}

function setup() {
    createCanvas(640, 480);
    imageMode(CENTER);
    noStroke();
    img.loadPixels();
}

function draw() {
    background(220);

    // Adjust color strength based on mouse position
    let colorStrength = map(mouseX, 0, width, 0, 1);

    for (let y = 0; y < img.height; y += 4) {
        for (let x = 0; x < img.width; x += 4) {
            let col = img.get(x, y);
            let adjustedCol = adjustColor(col, colorStrength);
            let offset = floor(random(-10, 10));
            
            fill(adjustedCol);
            rect(x + offset, y, 4, 4);
        }
    }
}

function adjustColor(col, strength) {
    let gray = (col[0] + col[1] + col[2]) / 3;
    let r = lerp(gray, col[0], strength);
    let g = lerp(gray, col[1], strength);
    let b = lerp(gray, col[2], strength);
    return color(r, g, b);
}

