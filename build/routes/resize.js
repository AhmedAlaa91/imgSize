"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const resize_1 = __importDefault(require("../utilities/resize"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const routes = express_1.default.Router();
routes.get('/images', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let fileName = (req.query.filename);
    let fileWidth = req.query.width;
    let fileHeight = req.query.height;
    const originalImagepath = './src/original_imgs/' + fileName + '.jpg';
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
    if (fs_1.default.existsSync(originalImagepath) === false) {
        return res
            .status(404)
            .send('Photo not found!');
    }
    if (isNaN(Number(String(req.query.width)))) {
        return res
            .status(400)
            .send('Bad request, query parameter (width) should be number.');
    }
    if (isNaN(Number(String(req.query.height)))) {
        return res
            .status(400)
            .send('Bad request, query parameter (height) should be number.');
    }
    if ((Number(String(req.query.height))) < 1) {
        return res
            .status(400)
            .send('Bad request, query parameter (height) should be more than 0.');
    }
    if ((Number(String(req.query.width))) < 1) {
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
    if (fs_1.default.existsSync('./src/resized_imgs/' + fileName)) {
        console.log('The file exists');
        res.sendFile(fileName, { root: path_1.default.join('src/resized_imgs') });
    }
    else {
        console.log('The file does not exist');
        try {
            const x = yield resize_1.default.resizeFun(Number(req.query.width), Number(req.query.height), req.query.filename + '.jpg', fileName);
            console.log(x);
            setTimeout(() => res.sendFile(fileName, { root: path_1.default.join('src/resized_imgs') }), 1000);
        }
        catch (e) {
            return e.message;
        }
    }
}));
exports.default = routes;
