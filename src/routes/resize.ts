import express from 'express';
import resize from '../utilities/resize';
import path from 'path';
import fs from 'fs';

const routes = express.Router();



routes.get('/images', async (req, res) => {

    if (fs.existsSync("./src/resized_imgs/" + (req.query.filename) as string)) {
        console.log("The file exists");
        res.sendFile((req.query.filename) as string, { root: path.join("src/resized_imgs") })
    } 
    else {
        console.log("The file does not exist");
        try {
            const x = await resize.resizeFun(Number(req.query.width), Number(req.query.height), req.query.filename as unknown as string);
            console.log(x)
            setTimeout(() => res.sendFile((req.query.filename) as string, { root: path.join("src/resized_imgs") }), 1000);

        }
        catch (e) {
            return ((e as Error).message);
            

        }

    }



})


export default routes;