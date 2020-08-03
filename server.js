const puppeteer = require('puppeteer')
const express = require('express')
const app = express()
app.get('/screen', async(req, res) => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.setViewport({
        width: 1200,
        height: 900
    })
    await page.goto('https://www.tradingview.com/markets/cryptocurrencies/ideas/')
    const screenshotBuffer = await page.screenshot()
    res.writeHead(200, {
        'Content-Type': 'image/png',
        'Content-Length': screenshotBuffer.length
    });
    res.end(screenshotBuffer);
    const data = await page.evaluate(() => {
        // document.getElementsByClassName('tv-widget-idea__description-row tv-widget-idea__description-row--clamped js-widget-idea__popup')[0].innerText

        // debugger;document.getElementsByClassName('tv-widget-idea__description-row tv-widget-idea__description-row--clamped js-widget-idea__popup')[0].innerText
        const text = document.getElementsByClassName('tv-widget-idea__description-row tv-widget-idea__description-row--clamped js-widget-idea__popup')
        const picture = document.getElementsByClassName('tv-widget-idea__cover')
        const res = []
        for (let i = 0; i < text.length; i ++){
            res.push({text: text[i].innerText, picture: picture[i].src})
        }
        return res
        // return urls 
    })
    // return data
    debugger;
    await browser.close(); 
});

app.listen(4000)
console.log('listening')