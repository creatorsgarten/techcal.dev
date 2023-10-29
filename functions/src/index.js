// @ts-check

const puppeteer = require('puppeteer')
const { onRequest } = require('firebase-functions/v2/https')

const { listEventItems } = require('./listEventItems')
const { back, next } = require('./navigate')

exports.siteMap = onRequest(async (req, res) => {
  let events = []
  let output = ''
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })
  const page = await browser.newPage()
  await page.goto('https://th.techcal.dev/', {
    waitUntil: 'networkidle2',
  })

  await back(2, page)
  events = [...events, ...(await listEventItems(page))]

  await next(1, page)
  events = [...events, ...(await listEventItems(page))]

  await next(1, page)
  events = [...events, ...(await listEventItems(page))]

  await next(1, page)
  events = [...events, ...(await listEventItems(page))]

  await next(1, page)
  events = [...events, ...(await listEventItems(page))]

  await next(1, page)
  events = [...events, ...(await listEventItems(page))]

  // dedupe events
  events = [...new Set(events)]

  output = 'https://th.techcal.dev/\n'
  for (const event of events) {
    output = output + event + '\n'
  }
  res.send(output)
})
