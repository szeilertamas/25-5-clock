let intervalId;
let isTimerRunning = false;
let breakLengthCount = 0;
let sessionLengthCount = 0;

let defaultTime = document.getElementById("time-left").innerText;
let defaultBreak = document.getElementById("break-length").innerHTML;
let defaultSession = document.getElementById("session-length").innerHTML;

function resetTimer() {
  document.getElementById("break-length").innerHTML = defaultBreak;
  document.getElementById("session-length").innerHTML = defaultSession;
  document.getElementById("time-left").innerText = defaultTime;
  document.getElementById("timer").innerHTML = "Pomodoro";
  clearInterval(intervalId);
//   beepSound.currentTime = 0;
  breakLengthCount = 0;
  sessionLengthCount = 0;
}

function breakIncrement() {
  breakLengthCount += 1;
  let breakLenght = parseInt(document.getElementById("break-length").innerHTML);
  let newBreakLenght = breakLenght + 1;
  newBreakLenght > 60 ? (newBreakLenght = 60) : newBreakLenght;
  document.getElementById("break-length").innerHTML = newBreakLenght;
  breakLengthCount > 55 ? (breakLengthCount = 55) : breakLengthCount;
  // console.log(breakLengthCount);
}

function breakDecrement() {
  breakLengthCount -= 1;
  let breakLenght = parseInt(document.getElementById("break-length").innerHTML);
  let newBreakLenght = breakLenght - 1;
  newBreakLenght <= 1 ? (newBreakLenght = 1) : newBreakLenght;
  document.getElementById("break-length").innerHTML = newBreakLenght;
  breakLengthCount < -5 ? (breakLengthCount = -5) : breakLengthCount;
  // console.log(breakLengthCount);
}

function sessionIncrement() {
  sessionLengthCount += 1;
  let sessionLength = parseInt(
    document.getElementById("session-length").innerHTML
  );
  let newSessionLength = sessionLength + 1;
  newSessionLength > 60 ? (newSessionLength = 60) : newSessionLength;
  document.getElementById("session-length").innerHTML = newSessionLength;
  let timeLeft = parseInt(document.getElementById("time-left").innerText);
  let newTimeLeft = timeLeft + 1;
  newTimeLeft > 60 ? (newTimeLeft = 60) : newTimeLeft;
  document.getElementById("time-left").innerText =
    newTimeLeft.toString() + ":00";
  if (newSessionLength !== newTimeLeft) {
    newTimeLeft = newSessionLength;
    document.getElementById("time-left").innerText =
      newTimeLeft.toString() + ":00";
  }
  sessionLengthCount > 35 ? (sessionLengthCount = 35) : sessionLengthCount;
  //   console.log(sessionLengthCount);
}

function sessionDecrement() {
  sessionLengthCount -= 1;
  let sessionLength = parseInt(
    document.getElementById("session-length").innerHTML
  );
  let newSessionLength = sessionLength - 1;
  newSessionLength <= 1 ? (newSessionLength = 1) : newSessionLength;
  document.getElementById("session-length").innerHTML = newSessionLength;
  let timeLeft = parseInt(document.getElementById("time-left").innerText);
  let newTimeLeft = timeLeft - 1;
  //   console.log(newTimeLeft);
  newTimeLeft = newTimeLeft.toString();
  newSessionLength = newSessionLength.toString();
  //   console.log("newTimeLeft:" , newTimeLeft, "newSessionLength:", newSessionLength)
  if (newSessionLength !== newTimeLeft && newTimeLeft.length < 2) {
    newTimeLeft = newSessionLength;
    document.getElementById("time-left").innerText = "0" + newTimeLeft + ":00";
    newTimeLeft <= 1 ? (newTimeLeft = 1) : newTimeLeft;
    // console.log("newTimeLeft:" , newTimeLeft, "newSessionLength:", newSessionLength)
  } else if (newSessionLength == newTimeLeft && newTimeLeft.length < 2) {
    // console.log("2nd");
    document.getElementById("time-left").innerText = "0" + newTimeLeft + ":00";
    // console.log(document.getElementById("time-left").innerText);
  } else if (newSessionLength !== newTimeLeft && newTimeLeft.length >= 2) {
    // console.log("3rd")
    newTimeLeft = newSessionLength;
    document.getElementById("time-left").innerText = newTimeLeft + ":00";
    newTimeLeft <= 1 ? (newTimeLeft = 1) : newTimeLeft;
  } else if (newSessionLength == newTimeLeft && newTimeLeft.length >= 2) {
    // console.log("4th")
    document.getElementById("time-left").innerText = newTimeLeft + ":00";
  }
  //   document.getElementById("time-left").innerText = newTimeLeft + ":00";
  sessionLengthCount < -25 ? (sessionLengthCount = -25) : sessionLengthCount;
  //   console.log(sessionLengthCount);
}

function startStopInterval() {
  isTimerRunning = !isTimerRunning;

  if (isTimerRunning) {
    intervalId = setInterval(startStopTimer, 10);
  } else {
    clearInterval(intervalId);
  }
}

let breakStarted = true;
let newSessionStarted = false;
let beepSound;

function playAudio() {
  beepSound = document.getElementById("beep-sound");
  beepSound.play();
}

function startStopTimer() {
  let time = document.getElementById("time-left").innerText;
  document.getElementById("time-left").innerText = time;

  let secondsTotal =
    parseInt(time.split("")[0]) * 60 * 10 +
    parseInt(time.split("")[1]) * 60 +
    parseInt(time.split("")[3]) * 10 +
    parseInt(time.split("")[4]);
  let newTime = "";
  let breakLengthToAdd = parseInt(defaultBreak);
  let sessionLengthToAdd = parseInt(defaultSession);
  //   = document.getElementById("time-left").innerText
  if (secondsTotal === 0 && breakStarted) {
    playAudio();
    document.getElementById("time-left").innerText = "00:00";
    document.getElementById("timer").innerHTML = "Break";

    breakLengthToAdd += breakLengthCount;
    // console.log(breakLengthToAdd);
    breakLengthToAdd = breakLengthToAdd.toString();
    // console.log(breakLengthToAdd[0], breakLengthToAdd[1]);
    breakLengthToAdd.length < 2
      ? (newTime = ["0", breakLengthToAdd, ":", "0", "0"].join(""))
      : (newTime = [
          breakLengthToAdd[0],
          breakLengthToAdd[1],
          ":",
          "0",
          "0",
        ].join(""));
    breakStarted = !breakStarted;
    newSessionStarted = !newSessionStarted;
  } else if (secondsTotal === 0 && newSessionStarted) {
    playAudio();
    document.getElementById("time-left").innerText = "00:00";
    document.getElementById("timer").innerHTML = "Pomodoro";
    newSessionStarted = !newSessionStarted;
    sessionLengthToAdd += sessionLengthCount;
    sessionLengthToAdd = sessionLengthToAdd.toString();
    sessionLengthToAdd.length < 2
      ? (newTime = ["0", sessionLengthToAdd, ":", "0", "0"].join(""))
      : (newTime = [
          sessionLengthToAdd[0],
          sessionLengthToAdd[1],
          ":",
          "0",
          "0",
        ].join(""));
    breakStarted = !breakStarted;
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
    // isNaN(parseInt(newTime.split("")[4]))
    newTime.length < 5
      ? (newTime = [newTime[0], newTime[1], newTime[2], "0", newTime[3]].join(
          ""
        ))
      : newTime;
    document.getElementById("time-left").innerText = newTime;
    console.log(newTime);
  }
  document.getElementById("time-left").innerText = newTime;
}
