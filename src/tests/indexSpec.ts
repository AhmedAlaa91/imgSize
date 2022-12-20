import app from '../index';

import resize from '../utilities/resize';


import supertest from 'supertest';

const request = supertest(app);


describe('Test endpoint responses', () => {
    it('gets the api endpoint', async () => {
        const response = await request.get('/api/images/?filename=fjord.jpg&width=600&height=400');
        expect(response.statusCode).toBe(200);
      
    }
)});





describe('Test resize image function', () => {

    it('should work', () => {

        const resizeFunc = resize.resizeFun(100,100,'fjord.jpg');
        expect('D:\\imgprocess\\src\\resized_imgs\\fjord.jpg').toContain('fjord.jpg');
    });
});