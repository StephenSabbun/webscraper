"use strict";
const puppeteer = require('puppeteer')

async function scrapeProduct(url) {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(url)

    const [getOrg] = await page.$x('//*[@id="block-summary"]/div/table/tbody/tr[4]/td[2]')
    const orgTxt = await getOrg.getProperty('textContent')
    const organization = await orgTxt.jsonValue()

    console.log('Organization: ' + organization)

    browser.close()
}

const prompt = require("prompt-sync")({ sigint: true })
let link = prompt("IPInfo.io Link: ")
scrapeProduct(`${link}`)