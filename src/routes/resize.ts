import express from 'express';
import resize from '../utilities/resize';
import path from 'path';
import fs from 'fs';

const routes = express.Router();

routes.get('/images', async (req, res) => {
  const fileName =
    (req.query.filename as string) +
    '-' +
    req.query.width +
    '-' +
    req.query.height +
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
