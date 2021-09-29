//GET function for parameter
function getParameter(parameterID) {
  let parameter = new URLSearchParams(window.location.search);
  return parameter.get(parameterID);
}

//fetching from .json and displaying the name of the session
fetch("./programme.json")
  .then((response) => response.json())
  .then((responseAsJson) => responseAsJson[getParameter("pos")])
  .then((event) => {
    document.getElementById("id").innerHTML += event.eventname;
  });

//fetching from .json and displaying the headline of the session on the bottom of the screen in a sliding div
fetch("./programme.json")
  .then((response) => response.json())
  .then((responseAsJson) => responseAsJson[getParameter("pos")])
  .then((sponsor) => {
    document.getElementById("link").target = sponsor.targetlink;
    document.getElementById("link").href = sponsor.link;
    document.getElementById("headline").innerHTML += sponsor.headline;
  });

fetch("./programme.json")
  .then((response) => response.json())
  .then((responseAsJson) => responseAsJson[getParameter("pos")])
  .then((session) => {
    let sessionDate = session.date.split("-");
    let sessionTime = session.start.split(":");
    let sessionEnd = session.end.split(":");

    let startDate = new Date(
      Date.UTC(
        sessionDate[0],
        sessionDate[1] - 1,
        sessionDate[2],
        sessionTime[0] - 2, // GMT to UTC
        sessionTime[1],
        0
      )
    );

    let endDate = new Date(
      Date.UTC(
        sessionDate[0],
        sessionDate[1] - 1,
        sessionDate[2],
        sessionEnd[0] - 2, // GMT to UTC
        sessionEnd[1],
        0
      )
    );

    setInterval(() => tick(startDate, endDate), 1000);
  });

async function tick(launchDate, endDate) {
  let difference = launchDate - new Date();

  if (difference >= 300000) {
    let days = Math.floor(difference / (1000 * 60 * 60 * 24));

    if (days < 10) {
      days = "0" + days;
    }

    let hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );

    if (hours < 10) {
      hours = "0" + hours;
    }

    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

    if (minutes < 10) {
      minutes = "0" + minutes;
    }

    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    // Visibility - Hide Button / Show Clock
    document.getElementById("clock").style.display = "flex";
    document.getElementById("button").style.display = "none";

    document.getElementById("comingsoon").innerText = "Coming Soon!";

    document.getElementById("days").innerHTML = days;
    document.getElementById("hours").innerHTML = hours;
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds;
  } else {
    if (endDate < new Date()) {
      document.getElementById("comingsoon").style.fontSize = "x-large";
      document.getElementById("comingsoon").innerText =
        "You just missed it! A recording of this session will be available after the conference.";
      document.getElementById("clock").style.display = "none";
    } else {
      document.getElementById("comingsoon").innerText = "Live Now!";

      // Visibility - Show Button / Hide Clock
      document.getElementById("clock").style.display = "none";
      document.getElementById("button").style.display = "inline";
    }
  }
}
