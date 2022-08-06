let img;

const unitsPerPixel = 10;

// Note: strings are enclosed in quotes "". If you need to include the quote character inside the string, use \".
// There are 70 characters here.
// On a white background, the first character corresponds to a black pixel (darkest), and the last character corresponds to a white pixel (brightest).
// Source: http://paulbourke.net/dataformats/asciiart/
const characterRamp = "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\|()1{}[]?-_+~<>i!lI;:,\"^`'. ";

window.preload = function() {
  // 80x80 pixels image
  img = loadImage("assets/redpanda.png");
}

window.setup = function() {
  // Create a canvas where every pixel from the original image can "occupy" 10 units.
  createCanvas(img.width * unitsPerPixel, img.height * unitsPerPixel);

  // Load all pixels into memory so we can read them back
  img.loadPixels();
}

/**
 * Gets the average intensity (a value from 0 to 255) of R,G,B channels of a desired pixel
 * @param {*} img The image to sample from
 * @param {*} x The x-position of the pixel to sample
 * @param {*} y The y-position of the pixel to sample
 */
function getPixelBrightness(img, x, y) {
  // Start position for the bytes of a pixel in the pixels array
  let pos = (y * img.width + x) * 4;

  let pixels = img.pixels;
  let r = pixels[pos];
  let g = pixels[pos + 1];
  let b = pixels[pos + 2];
  // let a = pixels[pos + 3];  // Alpha channel (transparency) is unused here

  return (r + g + b) / 3;
}

window.draw = function() {
  noLoop();

  // You may reverse the bg/fg colors
  background("white");
  fill("black");
  stroke("black");

  // ASCII art looks best with monospace fonts (fonts where the width/height of characters is fixed.)
  textAlign(CENTER, CENTER); 
  textFont('monospace', 10);
  textStyle(NORMAL);

  // TODO: add your code here!

  // To draw a character at position 'pos' in the characterRamp on the screen, use:
  //   let char = characterRamp[pos];
  //   text(, xCenter, yCenter);
  // Note: strings can be indexed like an array to retrieve characters.

  // To get the brightness of a pixel, use:
  //   let brightness = getPixelBrightness(img, x, y);

  // Hint: Use for-loops to go through all pixels in the image.
  // Hint: Use getPixelBrightness to get the brightness of a pixel.
  // You may draw a circle, rectangle, line, etc, and control the color, size, etc using the brightness.
  // For ASCII art, use the `text` function (example above), after selecting an appropriate character from the characterRamp,
  // based on brightness.

}

window.keyPressed = function() {
  if (key == 's' || key == 'S') {
    save('imageArt.png');
  }
}