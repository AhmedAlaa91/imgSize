"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sharp_1 = __importDefault(require("sharp"));
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
function resizeFun(w, h, imgName, resultImgName) {
    let originalImage = 'src/original_imgs/';
    originalImage = originalImage + imgName;
    let outputImage = 'src/resized_imgs/';
    outputImage = outputImage + resultImgName;
    try {
        (0, sharp_1.default)(originalImage).resize(w, h).toFile(outputImage);
    }
    catch (e) {
        outputImage = e.message;
    }
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(outputImage);
        });
    });
}
exports.default = { resizeFun };
