import sharp from 'sharp';

import express from 'express';
const app = express();

function resizeFun(
  w: number,
  h: number,
  imgName: string,
  resultImgName: string
) : Promise<string>{
  let originalImage = 'src/original_imgs/';
  originalImage = originalImage + imgName;
  let outputImage = 'src/resized_imgs/';
  outputImage = outputImage + resultImgName;
  try {
    sharp(originalImage).resize(w, h).toFile(outputImage);
  } catch (e) {
    outputImage= (e as Error).message;
  }
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(outputImage);
    });
  });
}

export default { resizeFun };
