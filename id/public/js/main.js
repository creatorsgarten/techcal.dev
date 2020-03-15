var dialog = null;

var calendar, calendarEl;

// List of avaliable calendars
const calendars = [
  {
    googleCalendarId: "tech.cal.id@gmail.com",
    className: "indonesia-tech-cal"
  }
];

const API_KEY = "AIzaSyCZDMXYGshyr-XNNTq-jkF5x9HJKhGBcpE";
const calendarOptions = {
  plugins: ["dayGrid", "googleCalendar", "list"],
  googleCalendarApiKey: API_KEY,
  height: 600,
  eventSources: calendars,
  firstDay: 1,
  header: {
    left: "prev,next today",
    center: "title",
    right: "dayGridMonth,dayGridWeek,listWeek"
  },
  eventRender: function(eventObj) {
    eventObj.el.href = `/event/${eventObj.event.id}/${slugify(
      eventObj.event.title
    )}`;
  },
  eventClick: function(info) {
    history.pushState(
      {},
      "",
      `/event/${info.event.id}/${slugify(info.event.title)}`
    );
    openEventModal(info.event);
    info.jsEvent.preventDefault();
  }
};

const defaultTitle = document.title;

function openEventModal(event) {
  document.getElementById(
    "event-header"
  ).innerHTML = `<h1 id="event-header">${event.title}</h1>`;

  document.getElementById(
    "event-date"
  ).innerHTML = `<i class="fas fa-alarm-clock"></i> ${event.start} - ${event.end}`;

  document.title = `${event.title} | ${defaultTitle}` ;
  if (event._def) {
    if (event._def.extendedProps.location) {
      document.getElementById(
        "event-location"
      ).innerHTML = `<i class="fas fa-map-marker-alt"></i> <a href="https://www.google.com/maps/place/${event._def.extendedProps.location}" target="_blank">${event._def.extendedProps.location}</a>`;
    }
  }

  if (event._def.extendedProps.description) {
    document.getElementById("event-description").innerHTML = `${linkify(
      event._def.extendedProps.description
    )}`;
  }

  document.getElementById(
    "event-link"
  ).innerHTML = `<i class="fas fa-link"></i> <a href="${event.url}" target="_blank">${event.url}</a>`;

  dialog.showModal();
}

document.addEventListener("DOMContentLoaded", async function() {
  dialog = document.querySelector("dialog");
  dialogPolyfill.registerDialog(dialog);
  if (window.location.pathname.split("/")[2]) {
    let requestPrimary = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/tech.cal.id@gmail.com/events/${
        window.location.pathname.split("/")[2]
      }?key=${API_KEY}`
    );
    let response = await requestPrimary.json();
    if (response.error) {
      window.alert("Sorry something went wrong");
      // let requestTraining = await fetch(
      //   `https://www.googleapis.com/calendar/v3/calendars/tech.cal.id@gmail.com/events/${window.location.pathname.split(
      //     "/"
      //   )[2]}?key=${API_KEY}`, {
      //     referrer: "http://id.techcal.dev/"
      //   }
      // );
      // response = await requestTraining.json();
    }
    response.title = response.summary;
    response.start = response.start.dateTime;
    response.end = response.end.dateTime;
    response.url = response.htmlLink;

    response._def = {
      extendedProps: {
        description: response.description || "",
        location: response.location || ""
      }
    };
    openEventModal(response);
  }
  loadCalendar();
  loadServiceWorker();
  loadGoogleAnalytics();
});

document.getElementById("dialog-close").addEventListener("click", e => {
  history.pushState({}, "", `/`);

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
  calendar = new FullCalendar.Calendar(calendarEl, calendarOptions);
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
