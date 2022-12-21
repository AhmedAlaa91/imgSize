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
const index_1 = __importDefault(require("../index"));
const resize_1 = __importDefault(require("../utilities/resize"));
const supertest_1 = __importDefault(require("supertest"));
const fs_1 = __importDefault(require("fs"));
const request = (0, supertest_1.default)(index_1.default);
describe('Test endpoint responses', () => {
    it('gets the api endpoint', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/images/?filename=fjord&width=600&height=400');
        expect(response.statusCode).toBe(200);
    }));
});
describe('Test resize image function', () => {
    it('gets the resize function', () => {
        if (fs_1.default.existsSync('./src/resized_imgs/' + 'fjord-100-100.jpg')) {
            fs_1.default.unlink('./src/resized_imgs/' + 'fjord-100-100.jpg', (err) => {
                if (err)
                    throw err;
            });
        }
        resize_1.default.resizeFun(100, 100, 'fjord.jpg', 'fjord-100-100.jpg');
        setTimeout(() => expect(fs_1.default.existsSync('./src/resized_imgs/' + 'fjord-100-100.jpg')).toBeTrue(), 1000);
    });
});
