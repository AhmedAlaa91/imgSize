'use strict';
import sharp from 'sharp';
// original image
let originalImage = 'fjord.jpg';
// file name of the resized image
let outputImage = 'resized_imgs/resized-image.jpg';
sharp(originalImage).resize({ height: 100, width: 100 }).toFile(outputImage) .then(function () {console.log("Image resized");}) .catch(function () { console.log("Got Error");});
