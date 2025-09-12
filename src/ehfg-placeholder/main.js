const END_DATE = new Date(Date.UTC(2021, 9, 1, 16, 0));

let now = null;

fetch("./programme.json")
  .then((response) => response.json())
  .then((sessions) => {
    screen(sessions);
    setInterval(() => screen(sessions), 60_000);
  });

async function screen(sessions) {
  now = new Date();

  //display live now
  let liveSession = findLiveSession(sessions);

  if (liveSession != null) {
    document.getElementById("livesessionname").innerHTML =
      liveSession.eventname;
  }

  //display comingup
  let upcomingSession = findUpcomingSession(sessions);
  //launchTime = new Date(`${session_upcoming.date}, ${session_upcoming.start}`);
  if (upcomingSession !== null) {
    document.getElementById("cusessionname").innerHTML =
      upcomingSession.eventname;
    document.getElementById(
      "time"
    ).innerHTML = `${upcomingSession.date} ${upcomingSession.start} CEST`;
  }
}

function findLiveSession(sessions) {
  if (now > END_DATE) {
    document.getElementById("content").style.display = "none";
    document.getElementById("header").innerHTML =
      "Thank you for joining #EHFG2021!";
  }

  for (let i = 0; i < sessions.length; i++) {
    let sessionDate = sessions[i].date.split("-");
    let sessionStartTime = sessions[i].start.split(":");
    let sessionEndTime = sessions[i].end.split(":");

    let currentSessionStart = convertUTC(sessionDate, sessionStartTime);
    let currentSessionEnd = convertUTC(sessionDate, sessionEndTime);

    console.log(
      `${
        sessions[i].event
      } ${currentSessionStart.getTime()} ${currentSessionStart} ${currentSessionEnd}`
    );
    if (currentSessionStart <= now && now <= currentSessionEnd) {
      document.getElementById("booth").style.width = "25%";
      document.getElementById("livebutton").href = sessions[i].link;
      document.getElementById("livebutton").target = sessions[i].linktarget;
      return sessions[i];
    }
  }

  document.getElementById("ongoing").style.display = "none";
  document.getElementById("booth").style.width = "50%";
  //document.getElementById("upcoming").style.width = "50%";
  return null;
}

function findUpcomingSession(sessions) {
  for (let i = 0; i < sessions.length; i++) {
    let upcomingSessionDate = sessions[i].date.split("-");
    let upcomingSessionTime = sessions[i].start.split(":");

    let sessionStartDate = convertUTC(upcomingSessionDate, upcomingSessionTime);
    if (sessionStartDate >= now) {
      document.getElementById("cusessionname").href = sessions[i].brellalink;
      return sessions[i];
    }
  }

  return null;
}

function convertUTC(date, time) {
  return new Date(
    Date.UTC(
      date[0],
      date[1] - 1,
      date[2],
      time[0] - 2, // convert to UTC
      time[1],
      0
    )
  );
}
