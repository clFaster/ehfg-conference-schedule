let endTime = null;
let launchTime = null;
let array = null;
let i = 0;

fetch("./programme.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (session) {
    array = session;
    for (let k = 0; k < array.length; k++) {
      launchTime = new Date(`${array[k].date}, ${array[k].start}`);
      endTime = new Date(`${array[k].date}, ${array[k].end}`);
      let now = new Date("2021-09-28, 10:00");
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
  let now = new Date("2021-09-28, 10:00");

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
      " CET";
  } else {
    document.getElementById("livesessionname").innerHTML = array[i].eventname;
    i++;
  }
}
