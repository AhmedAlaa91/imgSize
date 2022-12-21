import app from '../index';
import resize from '../utilities/resize';
import supertest from 'supertest';
import fs from 'fs';
const request = supertest(app);

describe('Test endpoint responses', () => {
  it('gets the api endpoint', async () => {
    const response = await request.get(
      '/api/images/?filename=fjord&width=600&height=400'
    );
    expect(response.statusCode).toBe(200);
  });
});

describe('Test resize image function', () => {
  it('gets the resize function', () => {
    if (fs.existsSync('./src/resized_imgs/' + 'fjord-100-100.jpg')) {
      fs.unlink('./src/resized_imgs/' + 'fjord-100-100.jpg', (err) => {
        if (err) throw err;
      });
    }
    resize.resizeFun(100, 100, 'fjord.jpg', 'fjord-100-100.jpg');
    setTimeout(
      () =>
        expect(
          fs.existsSync('./src/resized_imgs/' + 'fjord-100-100.jpg')
        ).toBeTrue(),
      1000
    );
  });
});
