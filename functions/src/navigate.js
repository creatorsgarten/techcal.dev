// @ts-check

const { wait } = require('./wait')

/**
 * @param {number} round 
 * @param {import('puppeteer').Page} page 
 */
exports.next = async (round, page) => {
  for (let index = 0; index < round; index++) {
    await page.click('#month-prev')
    await wait(500)
  }
}

/**
 * @param {number} round 
 * @param {import('puppeteer').Page} page 
 */
exports.back = async (round, page) => {
  for (let index = 0; index < round; index++) {
    await page.click('#month-next')
    await wait(500)
  }
}