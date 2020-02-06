var dialog = null;

var calendar, calendarEl;

// List of avaliable calendars
const calendars = [
  {
    googleCalendarId: "tech.cal.th@gmail.com",
    className: "thai-tech-cal"
  },
  {
    googleCalendarId: "c1k2p59qk20itvmtotvhktjso8@group.calendar.google.com",
    className: "thai-tech-cal-training"
  }
];

const caledarOptions = {
  plugins: ["dayGrid", "googleCalendar", "list"],
  googleCalendarApiKey: "AIzaSyBcerJ9_XsuT6AptHP5yg5PweyYzwJVP4U",
  height: 600,
  eventSources: calendars,
  firstDay: 1,
  header: {
    left: "prev,next today",
    center: "title",
    right: "dayGridMonth,dayGridWeek,listWeek"
  },
  eventClick: function(info) {
    history.pushState({}, '', `/event/${info.event.id}/${slugify(info.event.title)}`)
    openEventModal(info.event)
    info.jsEvent.preventDefault();
  }
};

function openEventModal(event) {
  document.getElementById("event-header").innerHTML = `<h1 id="event-header">${event.title}</h1>`;

  document.getElementById(
    "event-date"
  ).innerHTML = `<i class="fas fa-alarm-clock"></i> ${event.start} - ${
    event.end
  }`;
  
  document.title = `<thai-tech-calendar /> | รวม อัพเดท Tech event, Tech Meetup ในไทยไว้ในที่เดียว | ${event.title}`
  if(event._def) {
    if(event._def.extendedProps.location) {
      document.getElementById(
        "event-location"
      ).innerHTML = `<i class="fas fa-map-marker-alt"></i> <a href="https://www.google.com/maps/place/${event._def.extendedProps.location}" target="_blank">${
        event._def.extendedProps.location
      }</a>`;
    }
  }
  
  if(event._def.extendedProps.description) {
    document.getElementById("event-description").innerHTML = `${linkify(
      event._def.extendedProps.description
    )}`;
  }

  document.getElementById(
    "event-link"
  ).innerHTML = `<i class="fas fa-link"></i> <a href="${
    event.url
  }" target="_blank">${event.url}</a>`;

  dialog.showModal();
}

document.addEventListener("DOMContentLoaded", async function() {
  dialog = document.querySelector("dialog");
  dialogPolyfill.registerDialog(dialog);
  if(window.location.pathname.split('/')[2]) {
    let requestPrimary = await fetch(`https://www.googleapis.com/calendar/v3/calendars/tech.cal.th%40gmail.com/events/${window.location.pathname.split('/')[2]}?key=AIzaSyBcerJ9_XsuT6AptHP5yg5PweyYzwJVP4U`)
    let response = await requestPrimary.json() 
    if(response.error) {
      let requestTraining = await fetch(`https://www.googleapis.com/calendar/v3/calendars/c1k2p59qk20itvmtotvhktjso8%40group.calendar.google.com/events/${window.location.pathname.split('/')[2]}?key=AIzaSyBcerJ9_XsuT6AptHP5yg5PweyYzwJVP4U`)
      response = await requestTraining.json() 
    }
    response._def = {
      extendedProps: { description:response.description }
    }
    openEventModal(response)
  }
  loadCalendar();
  // loadServiceWorker();
  loadGoogleAnalytics();
});

document.getElementById("dialog-close").addEventListener("click", e => {
  history.pushState({}, '', `/`)

  dialog.close();
});

document.getElementById("how-to-add-link").addEventListener("click", e => {
  e.preventDefault();
  let instructionDisplay = document.getElementById("instruction").style.display;
  if (instructionDisplay === "block") {
    document.getElementById("instruction").style.display = "none";
  } else {
    document.getElementById("instruction").style.display = "block";
  }
});

const loadGoogleAnalytics = () => {
  window.dataLayer = window.dataLayer || [];
  function gtag() {
    dataLayer.push(arguments);
  }
  gtag("js", new Date());
  gtag("config", "UA-99894003-2");
};

const loadServiceWorker = () => {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/service-worker.js");
  }
};

const loadCalendar = () => {
  calendarEl = document.getElementById("calendar");
  calendar = new FullCalendar.Calendar(calendarEl, caledarOptions);
  calendar.render();
};

const linkify = inputText => {
  var replacedText, replacePattern1, replacePattern2, replacePattern3;

  //URLs starting with http://, https://, or ftp://
  replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
  replacedText = inputText.replace(
    replacePattern1,
    '<a href="$1" target="_blank">$1</a>'
  );

  //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
  replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
  replacedText = replacedText.replace(
    replacePattern2,
    '$1<a href="http://$2" target="_blank">$2</a>'
  );

  //Change email addresses to mailto:: links.
  replacePattern3 = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;
  replacedText = replacedText.replace(
    replacePattern3,
    '<a href="mailto:$1">$1</a>'
  );

  return replacedText;
};

const showMeetup = () => {};
