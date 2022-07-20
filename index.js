// start time
const start = new Date();

const fs = require("fs"),
  path = require("path"),
  filePath = path.join(__dirname, "/assets/corrupted-image"),
  sharp = require("sharp");

let pixels = [];

const readStream = fs.createReadStream(filePath);

const nineDigitRegex = /(?<!\d)(\d{9})(?!\d)/g;

readStream.on("data", function (chunk) {
  // extract all 9 digit numbers from data chunks
  let num = chunk.toString().match(nineDigitRegex);
  if (num && num.length > 0) {
    // feed pixels area with all 9 digit pixels
    pixels.push(...num);
  }
});

async function convertImage(pixelsArray) {
  const rgbData = [];
  for (let i = 0; i < pixelsArray.length; i++) {
    const e = pixelsArray[i];

    const r = e.substring(0, 3);
    const g = e.substring(3, 6);
    const b = e.substring(6, 9);
    // push the rgb numbers by seperating the 9 digit string to 3, 3 digit strings
    rgbData.push(r);
    rgbData.push(g);
    rgbData.push(b);
    // push the last 7 numbers again to get the missing 7 number which is missing due to either corruption of file
    // or due to developer missing them :)
    if (i > pixelsArray.length - 8) {
      rgbData.push(r);
      rgbData.push(g);
      rgbData.push(b);
    }
  }
  //build the input for sharp constructor
  const input = Uint8Array.from(rgbData);
  // lets calculate the dimension of the square image by squarerooting the number of pixels
  const dimension = Math.sqrt(rgbData.length / 3);
  const image = sharp(input, {
    raw: {
      width: dimension,
      height: dimension,
      channels: 3,
    },
  });
  // lets create the image file and build the image
  await image.toFile("pixtor-image.jpg");
}

readStream.on("end", function () {
  convertImage(pixels);
  //end time
  const stop = new Date();
  const diff = (stop - start) / 1000;
  // round time to the nearest 10th of millisecond (to 1 decimal place)
  const roundedDiff = Math.round(diff * 10) / 10;
  console.log(`Time Taken to execute = ${roundedDiff} seconds`);
});
