// Select elements from HTML
const minutesDisplay = document.querySelector('.js-minutes');
const secondsDisplay = document.querySelector('.js-seconds');
const millisecondsDisplay = document.querySelector('.js-milliseconds');
const startButton = document.querySelector('.js-start-button');
const resetButton = document.querySelector('.js-reset-button');

// Declare flags
let timerRunning = false;

// Declare setIntervalIds
let minutesIntervalId;
let secondsIntervalId;
let millisecondsIntervalId;

// Declare the time
let minutes = 0;
let seconds = 0;
let milliseconds = 0;

// Display the default values on the timer
minutesDisplay.innerHTML = 0;
secondsDisplay.innerHTML = 0;
millisecondsDisplay.innerHTML = 0;

startButton.addEventListener('click', setTimer);
resetButton.addEventListener('click', () => {
  stopTimer();
  resetTimer();
})

// Starts and Stops the timer and switches the button indicator
function setTimer() {
  if (!timerRunning) {
    startTimer();
    startButton.classList.add('stop-button');
    startButton.innerHTML = 'Stop';
    timerRunning = true;
  } else {
    stopTimer();
    startButton.classList.remove('stop-button');
    startButton.innerHTML = 'Start';
    timerRunning = false;
  }
}

// Starts the timer
function startTimer() {
  // Loop the time
  millisecondsIntervalId = setInterval(() => {
    milliseconds++;
    if (milliseconds === 100) {
      milliseconds = 0;
      seconds++;
    }
    if (seconds === 60) {
      seconds = 0;
      minutes++;
    }
    if (minutes === 60) {
      minutes = 0;
    }
    millisecondsDisplay.innerHTML = milliseconds;
    secondsDisplay.innerHTML = seconds;
    minutesDisplay.innerHTML = minutes;
  }, 10)
}

// Stops the timer
function stopTimer() {
  clearInterval(minutesIntervalId);
  clearInterval(secondsIntervalId);
  clearInterval(millisecondsIntervalId);
}

// Resets the timer
function resetTimer() {
  millisecondsDisplay.innerHTML = 0;
  secondsDisplay.innerHTML = 0;
  minutesDisplay.innerHTML = 0;
  minutes = 0;
  seconds = 0;
  milliseconds = 0;
  startButton.classList.remove('stop-button');
  startButton.innerHTML = 'Start';
  timerRunning = false;
}