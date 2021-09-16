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
let data = null;
let time = null;
let launchDate = fetch("./programme.json")
    .then(function (response) {
        return response.json();
    })
    .then(function (zeit) {
        data = zeit[getParameter("pos")].date;
        time = zeit[getParameter("pos")].start;
        launchDate = new Date(`${data}, ${time}`);
        //launchDate = new Date(`09-16-2021, 11:04`);
        tick().then(r => setInterval(tick, 1000))

    });

async function tick() {
    let now = new Date();

    now.setMinutes(now.getMinutes()+now.getTimezoneOffset()+120);

    let t = launchDate - now;

    console.log(t);
    if (t >= 5*1000) {
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
        // Visibility - Hide Button / Show Clock
        document.getElementById("clock").style.display = "flex";
        document.getElementById("button").style.display = "none";

        document.getElementById("comingsoon").innerText = "Coming Soon!";

        document.getElementById("days").innerHTML = days;
        document.getElementById("hours").innerHTML = hours;
        document.getElementById("minutes").innerHTML = minutes;
        document.getElementById("seconds").innerHTML = seconds;

        // Not sure if we event want to make that dynamic?! Prob constant is good ;)
        // if (days === 1) {
        //     document.getElementById("daystext").innerHTML = "day";
        // } else {
        //     document.getElementById("daystext").innerHTML = "days";
        // }
        // if (hours === 1) {
        //   document.getElementById("hourstext").innerHTML = "hour";
        // } else {
        //   document.getElementById("hourstext").innerHTML = "hours";
        // }
        // if (minutes === 1) {
        //   document.getElementById("minutestext").innerHTML = "minute";
        // } else {
        //   document.getElementById("minutestext").innerHTML = "minutes";
        // }
        // if (seconds === 1) {
        //   document.getElementById("secondstext").innerHTML = "second";
        // } else {
        //   document.getElementById("secondstext").innerHTML = "seconds";
        // }
    } else {
        document.getElementById("comingsoon").innerText = "Live Now!";
        // Visibility - Show Button / Hide Clock
        document.getElementById("clock").style.display = "none";
        document.getElementById("button").style.display = "inline";
    }
}

