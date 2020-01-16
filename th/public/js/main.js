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
    document.getElementById("event-header").innerHTML = info.event.title;
    document.getElementById("event-header").classList.add("mystyle");
    document.getElementById(
      "event-date"
    ).innerHTML = `<i class="fas fa-alarm-clock"></i> ${info.event.start} - ${
      info.event.end
    }`;
    document.getElementById(
      "event-location"
    ).innerHTML = `<i class="fas fa-map-marker-alt"></i> ${
      info.event._def.extendedProps.location
    }`;
    document.getElementById("event-description").innerHTML = `${linkify(
      info.event._def.extendedProps.description
    )}`;

    document.getElementById(
      "event-link"
    ).innerHTML = `<i class="fas fa-link"></i> <a href="${
      info.event.url
    }" target="_blank">${info.event.url}</a>`;

    dialog.showModal();
    info.jsEvent.preventDefault();
  }
};

document.addEventListener("DOMContentLoaded", function() {
  dialog = document.querySelector("dialog");
  dialogPolyfill.registerDialog(dialog);
  loadCalendar();
  loadServiceWorker();
  loadGoogleAnalytics();
});

document.getElementById("dialog-close").addEventListener("click", e => {
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
