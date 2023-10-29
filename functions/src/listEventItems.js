// @ts-check

/**
 * @param {import('puppeteer').Page} page
 * @returns {Promise<string[]>}
 */
exports.listEventItems = async page => {
  let eventItems = await page.evaluate(() => {
    /**
     * @returns {HTMLAnchorElement[]}
     */
    const getAnchorElements = () =>
      Array.from(document.querySelectorAll('a.eventItem'))

    return getAnchorElements().map(e => {
      return e.href
    })
  })
  return eventItems
}
