const functions = require("firebase-functions");
const puppeteer = require("puppeteer");

exports.siteMap = functions.https.onRequest(async (req, res) => {
  let events = [];
  let output = ""
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });
  const page = await browser.newPage();
  await page.goto('https://th.techcal.dev/', {
      waitUntil: "networkidle2"
  });

  await goBack(2, page)
  events = [...events, ...await listEventItems(page)]
  await goNext(1, page)
  events = [...events, ...await listEventItems(page)]
  await goNext(1, page)
  events = [...events, ...await listEventItems(page)]
  await goNext(1, page)
  events = [...events, ...await listEventItems(page)]
  await goNext(1, page)
  events = [...events, ...await listEventItems(page)]
  await goNext(1, page)
  events = [...events, ...await listEventItems(page)]
  events = [...new Set(events)]
  output = 'https://th.techcal.dev/\n'
  for (const event of events) {
    output = output + event + '\n'
  }
  res.send(output)
})

async function listEventItems (page) {
  let eventItems = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('a.eventItem')).map(e => {
          return e.href
      })
  });
  return eventItems
}

async function goNext(round, page) {
  for (let index = 0; index < round; index++) {
      await page.click('#month-prev')
      await page.waitFor(500)
  }
}

async function goBack(round, page) {
  for (let index = 0; index < round; index++) {
      await page.click('#month-next')
      await page.waitFor(500)
  }
}
