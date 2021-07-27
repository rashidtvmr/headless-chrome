// const puppeteer = require('puppeteer');
const port = process.env.PORT || 8116;
const express = require("express");
const app = express();
const __puppeteer = require('puppeteer');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth')
// const RecaptchaPlugin = require('puppeteer-extra-plugin-recaptcha')

puppeteer.use(StealthPlugin());
// puppeteer.use(RecaptchaPlugin())
runTasks();
runTasks();
runTasks();
runTasks();

setInterval(() => {
    console.log('looping started', new Date().toLocaleString());
    runTasks();
    runTasks();
    runTasks();
    runTasks();
}, 10 * 60 * 1000);

async function runTasks() {
    console.log("running task browser", new Date().toLocaleString());
    let browser = await puppeteer.launch({
        // headless: true,
        headless: false,
        // args: ['--proxy-server=socks5://127.0.0.1:9050']
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
        ],
    });
    const page = await browser.newPage();
    await page.goto('https://www.youtube.com/watch?v=F-lK1N0VWyk&list=PLGxDMC0jMjTf2ixuiGEhJGCA0rVW3bGp-');
    await page.waitForSelector('#movie_player');
    await page.evaluate(() => {
        // let isModalCont = document.evaluate('/html/body/ytd-app/ytd-consent-bump-v2-lightbox/tp-yt-paper-dialog/div[2]/div[2]/div[5]/div[2]/ytd-button-renderer[2]/a/tp-yt-paper-button', document, null, XPathResult.ANY_TYPE, null)
        // let isModal = isModalCont.iterateNext();
        // if (Boolean(isModal));
        //     isModal.click();
        const videoController = document.getElementsByTagName('video')[0];
        const videoElmnt = document.getElementById('movie_player');
        const loopButton = document.querySelectorAll('button[aria-label="Loop playlist"]');
        if (loopButton.length > 0)
            loopButton[0].click();

        // if (videoController)
        //     videoController.loop = true;
        if (videoElmnt) videoElmnt.playVideo();
    })
    setInterval(async () => {
        console.log('taking screenshot every minutes..', new Date().toLocaleString());
        await page.screenshot({ path: `./${new Date().toLocaleTimeString()}.png` })
    }, 8 * 60 * 1000)
    setTimeout(async () => {
        console.log('killing browser..', new Date().toLocaleString());
        await browser.close();
    }, 9 * 60 * 1000)
}


app.get('/', (req, res) => res.json({ status: 200, statusText: 'Running' }))
app.listen(port, () => {
    console.log(`Server started on ${port}`);
});