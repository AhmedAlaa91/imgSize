import express from 'express';
import resize from '../utilities/resize';
import path from 'path';
import fs from 'fs';

const routes = express.Router();

routes.get('/images', async (req, res) => {
  let fileName = (req.query.filename )as string;
  let fileWidth =req.query.width
  let fileHeight =req.query.height

  const originalImagepath ='./src/original_imgs/'+fileName+'.jpg';
 

  if (fileName === undefined) {
    return res
      .status(400)
      .send('Bad request, query parameter (name) is required.');
  }

  if (fileWidth === undefined) {
    return res
      .status(400)
      .send('Bad request, query parameter (width) is required.');
  }

  if (fileHeight === undefined) {
    return res
      .status(400)
      .send('Bad request, query parameter (height) is required.');
  }

  if(fs.existsSync(originalImagepath) === false){
    return res
    .status(404)
    .send('Photo not found!');
  }

  if (isNaN(Number(String(req.query.width)))){
    return res
      .status(400)
      .send('Bad request, query parameter (width) should be number.');

  }

  if (isNaN(Number(String(req.query.height)))){
    return res
      .status(400)
      .send('Bad request, query parameter (height) should be number.');

  }

  if ((Number(String(req.query.height)))< 1){
    return res
      .status(400)
      .send('Bad request, query parameter (height) should be more than 0.');

  }

  if ((Number(String(req.query.width)))< 1){
    return res
      .status(400)
      .send('Bad request, query parameter (width) should be more than 0.');

  }


  fileName =
  fileName +
    '-' +
    fileWidth +
    '-' +
    fileHeight +
    '.jpg';

  if (fs.existsSync('./src/resized_imgs/' + fileName)) {
    console.log('The file exists');
    res.sendFile(fileName, { root: path.join('src/resized_imgs') });
  } else {
    console.log('The file does not exist');
    try {
      const x = await resize.resizeFun(
        Number(req.query.width),
        Number(req.query.height),
        (req.query.filename as string) + '.jpg',
        fileName
      );
      console.log(x);
      setTimeout(
        () => res.sendFile(fileName, { root: path.join('src/resized_imgs') }),
        1000
      );
    } catch (e) {
      return (e as Error).message;
    }
  }
});

export default routes;
