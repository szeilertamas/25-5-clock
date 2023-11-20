let defaultTime = document.getElementById("time-left").innerText;
let defaultBreak = document.getElementById("break-length").innerHTML;
let defaultSession = document.getElementById("session-length").innerHTML;

function resetTimer() {
  document.getElementById("break-length").innerHTML = defaultBreak;
  document.getElementById("session-length").innerHTML = defaultSession;
  document.getElementById("time-left").innerText = defaultTime;
  clearInterval(intervalId);
}

function breakIncrement() {
  let breakLenght = parseInt(document.getElementById("break-length").innerHTML);
  let newBreakLenght = breakLenght + 1;
  newBreakLenght >= 60 ? (newBreakLenght = 60) : newBreakLenght;
  document.getElementById("break-length").innerHTML = newBreakLenght;
}

function breakDecrement() {
  let breakLenght = parseInt(document.getElementById("break-length").innerHTML);
  let newBreakLenght = breakLenght - 1;
  newBreakLenght <= 1 ? (newBreakLenght = 1) : newBreakLenght;
  document.getElementById("break-length").innerHTML = newBreakLenght;
}

function sessionIncrement() {
  document.getElementById("time-left").innerText = defaultTime;
  let sessionLength = parseInt(
    document.getElementById("session-length").innerHTML
  );
  let newSessionLength = sessionLength + 1;
  newSessionLength >= 60 ? (newSessionLength = 60) : newSessionLength;
  document.getElementById("session-length").innerHTML = newSessionLength;
  let timeLeft = parseInt(document.getElementById("time-left").innerText);
  let newTimeLeft = timeLeft + 1;
  document.getElementById("time-left").innerText =
    newTimeLeft.toString() + ":00";
}

function sessionDecrement() {
  document.getElementById("time-left").innerText = defaultTime;
  let sessionLength = parseInt(
    document.getElementById("session-length").innerHTML
  );
  let newSessionLength = sessionLength - 1;
  newSessionLength <= 0 ? (newSessionLength = 0) : newSessionLength;
  document.getElementById("session-length").innerHTML = newSessionLength;
  let timeLeft = parseInt(document.getElementById("time-left").innerText);
  let newTimeLeft = timeLeft - 1;
  document.getElementById("time-left").innerText =
    newTimeLeft.toString() + ":00";
}

let intervalId;

function startStopInterval() {
  let count = parseInt(
    document.getElementById("start_stop").attributes[1].value
  );
  count += 1;
  document.getElementById("start_stop").attributes[1].value = count;

  if (count % 2 !== 0) {
    intervalId = setInterval(startStopTimer, 1);
  } else {
    clearInterval(intervalId);
  }
}

function startStopTimer() {
  let time = document.getElementById("time-left").innerText;

  let secondsTotal =
    parseInt(time.split("")[0]) * 60 * 10 +
    parseInt(time.split("")[1]) * 60 +
    parseInt(time.split("")[3]) * 10 +
    parseInt(time.split("")[4]);
  let newTime = document.getElementById("time-left").innerText;
  if (secondsTotal === 0) {
    newTime = "00:00";
  } else {
    let newSecondsTotal = secondsTotal - 1;
    let newMinutes = Math.floor(newSecondsTotal / 60);
    let newSeconds = newSecondsTotal % 60;
    newTime = newMinutes.toString() + ":" + newSeconds.toString();
    isNaN(parseInt(newTime.split("")[1]))
      ? (newTime = ["0", newTime[0], newTime[1], newTime[2], newTime[3]].join(
          ""
        ))
      : newTime;
    newTime.length < 5
      ? (newTime = [newTime[0], newTime[1], newTime[2], "0", newTime[3]].join(
          ""
        ))
      : newTime;
    document.getElementById("time-left").innerText = newTime;
  }
  document.getElementById("time-left").innerText = newTime;
}
