//GET function for parameter
function getParameter(parameterID) {
  let parameter = new URLSearchParams(window.location.search);
  return parameter.get(parameterID);
}

//fetching from .json and displaying the name of the session
fetch("./programme.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (name) {
    document.getElementById("id").innerHTML +=
      name[getParameter("pos")].eventname;
  });

//fetching from .json and displaying the headline of the session on the bottom of the screen in a sliding div
fetch("./programme.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (sponsor) {
    document.getElementById("headline").innerHTML +=
      sponsor[getParameter("pos")].headline;
  });

//initialization of the launchDate
let launchDate = new Date().getTime();
var data = null;
var time = null;

fetch("./programme.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (zeit) {
    data = zeit[getParameter("pos")].date;
    time = zeit[getParameter("pos")].start;
    launchDate = new Date(`${data}, ${time}`);
  });

// eslint-disable-next-line no-unused-vars
let timer = setInterval(tick, 1000);

function tick() {
  let now = new Date().getTime();
  let t = launchDate - now;
  
  if (t) {

    if (t > 1) {
      let days = Math.floor(t / (1000 * 60 * 60 * 24));
  
      if (days < 10) {
        days = "0" + days;
      }
  
      let hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  
      if (hours < 10) {
        hours = "0" + hours;
      }
  
      let minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
  
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
  
      let seconds = Math.floor((t % (1000 * 60)) / 1000);
      if (seconds < 10) {
        seconds = "0" + seconds;
      }

      document.getElementById("comingsoon").innerText = "Coming Soon!";
      document.getElementById("days").innerHTML = days;
      document.getElementById("hours").innerHTML = hours;
      document.getElementById("minutes").innerHTML = minutes;
      document.getElementById("seconds").innerHTML = seconds;

      if(days<10){
        document.getElementById("daystext").innerHTML = "Day";
      }
      else{
        document.getElementById("daystext").innerHTML = "Days";
      }

      document.getElementById("hourstext").innerHTML = "Hours";
      document.getElementById("minutestext").innerHTML = "Minutes";
      document.getElementById("secondstext").innerHTML = "Seconds";

   }
   else if(timer != 0){
    document.getElementById("comingsoon").innerText = "Live Now!";
    document.getElementById("clock").style.display = "none";
    document.getElementById("button").style.visibility = "visible";
   }

  }  
}
