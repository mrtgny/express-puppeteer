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
const puppeteer_1 = __importDefault(require("puppeteer"));
const stream_1 = __importDefault(require("stream"));
const PORT = 4000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const getPDF = (path) => __awaiter(void 0, void 0, void 0, function* () {
    const browser = yield puppeteer_1.default.launch();
    const page = yield browser.newPage();
    yield page.goto(path, {
        waitUntil: 'networkidle2',
    });
    const buffeer = yield page.pdf({ format: 'a4' });
    yield browser.close();
    return buffeer;
});
app.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const url = req.query.url;
    const fileName = req.query.fileName || `${url}.pdf`;
    const fileContents = yield getPDF(url);
    var readStream = new stream_1.default.PassThrough();
    readStream.end(fileContents);
    res.set('Content-disposition', `attachment; filename=${fileName}`);
    res.set('Content-Type', 'application/pdf');
    readStream.pipe(res);
}));
app.listen(PORT);
console.log(`🚀 Query endpoint ready at http://localhost:${PORT}`);
//# sourceMappingURL=server.js.map