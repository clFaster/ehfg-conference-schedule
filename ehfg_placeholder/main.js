let endTime = null;
let launchTime = null;
let array = null;
let i = 0;
let now = null;
fetch("./programme.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (session) {
    array = session;
    for (let k = 0; k < array.length; k++) {
      launchTime = new Date(`${array[k].date}, ${array[k].start}`);
      endTime = new Date(`${array[k].date}, ${array[k].end}`);
      now = new Date();
      document.getElementById("livebutton").style.display = "none";
      let t = launchTime - now;
      let g = endTime - now;

      if (t < 5000 && g > 0) {
        i = k;
        break;
      }
    }
    // eslint-disable-next-line no-unused-vars
    screen().then((r) => setInterval(screen, 1000));
  });
async function screen() {
  //event start time
  let eventend = new Date("2021-10-01; 18:00");
  //event end time
  let eventstart = new Date("2021-09-27; 09:00");

  if (now - eventstart <= 0) {
    document.getElementById("ongoing").style.display = "none";
    document.getElementById("comingup").style.width = "50%";
    document.getElementById("booth").style.width = "50%";
  }

  if (i >= array.length) {
    document.getElementById("comingup").style.display = "none";
    document.getElementById("ongoing").style.width = "50%";
    document.getElementById("booth").style.width = "50%";
  }

  if (now - eventend >= 0) {
    document.getElementById("ongoing").style.display = "none";
    document.getElementById("booth").style.display = "none";
    document.getElementById("comingup").style.display = "none";
    document.getElementById("header").innerHTML =
      "THANK YOU FOR TAKING PART IN EHFG21";
  }

  launchTime = new Date(`${array[i].date}, ${array[i].start}`);
  endTime = new Date(`${array[i].date}, ${array[i].end}`);

  let t = launchTime - now;

  if (t > 50000) {
    document.getElementById("cusessionname").innerHTML = array[i].eventname;
    document.getElementById("time").innerHTML =
      launchTime.getDate().toString() +
      "-" +
      (launchTime.getMonth() + 1) +
      "-" +
      launchTime.getFullYear().toString() +
      " " +
      launchTime.getHours().toString() +
      ":" +
      launchTime.getMinutes().toString() +
      " CEST";
  } else {
    document.getElementById("livesessionname").innerHTML = array[i].eventname;
    document.getElementById("livebutton").style.display = "inline";
    ++i;
  }
}
