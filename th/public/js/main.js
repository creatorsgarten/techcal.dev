document.addEventListener("DOMContentLoaded", function() {
  var calendarEl = document.getElementById("calendar");
  var dialog = document.querySelector("dialog");
  dialogPolyfill.registerDialog(dialog);
  var calendar = new FullCalendar.Calendar(calendarEl, {
    plugins: ["dayGrid", "googleCalendar", "list"],
    googleCalendarApiKey: "AIzaSyBcerJ9_XsuT6AptHP5yg5PweyYzwJVP4U",
    height: 600,
    events: {
      googleCalendarId: "tech.cal.th@gmail.com"
    },
    header: {
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,listWeek"
    },
    eventClick: function(info) {
      console.log(info);
      dialog.showModal();
      info.jsEvent.preventDefault();
    }
  });

  calendar.render();
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

// Check that service workers are supported
if ("serviceWorker" in navigator) {
  // Use the window load event to keep the page load performant
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/service-worker.js");
  });
}

window.dataLayer = window.dataLayer || [];
function gtag() {
  dataLayer.push(arguments);
}
gtag("js", new Date());
gtag("config", "UA-99894003-2");

// Now dialog acts like a native <dialog>.
