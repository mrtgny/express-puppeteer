import express from "express";
import puppeteer from "puppeteer";
import stream from "stream";

const PORT = 4000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const getPDF = async (path: string) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(path, {
        waitUntil: 'networkidle2',
    });
    const buffeer = await page.pdf({ format: 'a4' });
    await browser.close();
    return buffeer;
}

app.get('/', async (req, res) => {
    const url = req.query.url as string;
    const fileName = (req.query.fileName as string) || `${url}.pdf`;
    const fileContents = await getPDF(url);

    var readStream = new stream.PassThrough();
    readStream.end(fileContents);

    res.set('Content-disposition', `attachment; filename=${fileName}`);
    res.set('Content-Type', 'application/pdf');

    readStream.pipe(res);
});

app.listen(PORT)

console.log(
    `🚀 Query endpoint ready at http://localhost:${PORT}`
);