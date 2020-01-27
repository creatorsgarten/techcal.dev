const functions = require("firebase-functions");
const puppeteer = require("puppeteer");
const admin = require("firebase-admin");
const serviceAccount = require("./service_accoun_key.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "techcal-th.appspot.com"
});

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.scheduledFunction = functions.pubsub
  .schedule("every 5 minutes")
  .onRun(async context => {
    let imageData = await screenshotDOMElement({
      path: "element.png",
      selector: ".fc-list-table",
      padding: 0,
      url: "https://th.techcal.dev/forCapture.html"
    });
    let imageBuffer = new Buffer(imageData, "base64");
    let mimeType = "image/jpeg";
    let bucket = admin.storage().bucket();
    let file = bucket.file("capture/th.jpg");

    await bucket.file("capture/th.jpg").delete();

    file.save(
      imageBuffer,
      {
        metadata: { contentType: mimeType }
      },
      error => {}
    );
  });

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

async function screenshotDOMElement(opts = {}) {
  const padding = "padding" in opts ? opts.padding : 0;
  const url = "url" in opts ? opts.url : null;
  const selector = opts.selector;

  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"]
  });
  const page = await browser.newPage();
  // Adjustments particular to this page to ensure we hit desktop breakpoint.
  page.setViewport({ width: 740, height: 768, deviceScaleFactor: 1 });

  await page.goto(url, {
    waitUntil: "networkidle2"
  });

  if (!selector) throw Error("Please provide a selector.");

  const rect = await page.evaluate(selector => {
    const element = document.querySelector(selector);
    if (!element) return null;
    const { x, y, width, height } = element.getBoundingClientRect();
    return { left: x, top: y, width, height, id: element.id };
  }, selector);

  if (!rect)
    throw Error(`Could not find element that matches selector: ${selector}.`);

  return await page.screenshot({
    clip: {
      x: rect.left - padding,
      y: rect.top - padding,
      width: rect.width + padding * 2,
      height: rect.height + padding * 2
    },
    encoding: "base64"
  });
}

async function listEventItems (page) {
  let eventItems = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('a.fc-day-grid-event.fc-h-event.fc-event.fc-start.fc-end.thai-tech-cal')).map(e => {
          return e.href
      })
  });
  return eventItems
}

async function goNext(round, page) {
  for (let index = 0; index < round; index++) {
      await page.click('.fc-next-button')
      await page.waitFor(500)
  }
}

async function goBack(round, page) {
  for (let index = 0; index < round; index++) {
      await page.click('.fc-prev-button')
      await page.waitFor(500)
  }
}
