let intervalId;
let isTimerRunning = false;
let breakLengthCount = 5;
let sessionLengthCount = 25;

const defaultTimeElement = document.getElementById("time-left");
const defaultBreakElement = document.getElementById("break-length");
const defaultSessionElement = document.getElementById("session-length");

function resetTimer() {
  clearInterval(intervalId);
  isTimerRunning = false;
  breakLengthCount = 5;
  sessionLengthCount = 25;
  updateElementValue("break-length", breakLengthCount);
  updateElementValue("session-length", sessionLengthCount);
  updateTimer(sessionLengthCount, 0);
  updateElementValue("timer", "Pomodoro");

  // Stop and rewind the audio element
  const audioElement = document.getElementById("beep");
  audioElement.pause();
  audioElement.currentTime = 0;
}

function updateElementValue(elementId, newValue) {
  document.getElementById(elementId).innerText = newValue;
}

function updateTimer(minutes, seconds) {
  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");
  defaultTimeElement.innerText = `${formattedMinutes}:${formattedSeconds}`;
}

function updateLengthAndCount(elementId, count, increment) {
  count += increment;
  count = Math.min(60, Math.max(1, count));
  updateElementValue(elementId, count);
  return count;
}

function breakIncrement() {
  if (!isTimerRunning) {
    breakLengthCount = updateLengthAndCount(
      "break-length",
      breakLengthCount,
      1
    );
  }
}

function breakDecrement() {
  if (!isTimerRunning) {
    breakLengthCount = updateLengthAndCount(
      "break-length",
      breakLengthCount,
      -1
    );
  }
}

function sessionIncrement() {
  if (!isTimerRunning) {
    sessionLengthCount = updateLengthAndCount(
      "session-length",
      sessionLengthCount,
      1
    );
    updateTimer(sessionLengthCount, 0);
  }
}

function sessionDecrement() {
  if (!isTimerRunning) {
    sessionLengthCount = updateLengthAndCount(
      "session-length",
      sessionLengthCount,
      -1
    );
    updateTimer(sessionLengthCount, 0);
  }
}

function startStopInterval() {
  isTimerRunning = !isTimerRunning;
  if (isTimerRunning) {
    intervalId = setInterval(startStopTimer, 1000);
  } else {
    clearInterval(intervalId);
  }
}

function playAudio() {
  const audioElement = document.getElementById("beep");
  audioElement.currentTime = 0;
  audioElement.play();
}

function startStopTimer() {
  let time = defaultTimeElement.innerText;
  let secondsTotal =
    parseInt(time.split(":")[0]) * 60 + parseInt(time.split(":")[1]);

  if (secondsTotal === 0) {
    playAudio();
    const timerLabel = document.getElementById("timer");
    const breakStarted = timerLabel.innerHTML === "Break";

    timerLabel.innerHTML = breakStarted ? "Pomodoro" : "Break";
    const count = breakStarted ? breakLengthCount : sessionLengthCount;

    if (breakStarted) {
      updateTimer(count, 0);
    } else {
      // Set the correct starting value for the break countdown
      updateLengthAndCount("break-length", count, 0);
      updateTimer(count, 0);
    }
  } else {
    let newSecondsTotal = secondsTotal - 1;
    let newMinutes = Math.floor(newSecondsTotal / 60);
    let newSeconds = newSecondsTotal % 60;
    updateTimer(newMinutes, newSeconds);
  }
}
