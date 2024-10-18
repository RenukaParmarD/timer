const timer = document.querySelector('.timer');
const minutesInput = document.querySelector('#minutes-input');
const startButton = document.querySelector('form button[type="submit"]');
const stopButton = document.querySelector('#stop-btn');
const pauseButton = document.querySelector('#pause-btn');
let countdownInterval;
let secondsRemaining;
let isPaused = false;

const formatTime = time => {
  return time < 10 ? `0${time}` : time;
};

const startCountdown = () => {
  const minutes = parseInt(minutesInput.value);
  if (isNaN(minutes) || minutes < 1 || minutes > 60) {
    alert('Please enter a valid number of minutes between 1 and 60.');
    return;
  }
  secondsRemaining  = minutes * 60;
  countdownInterval = setInterval(updateCountdown, 1000);
};

const updateCountdown = () => {
  if (!isPaused && secondsRemaining > 0) {
    secondsRemaining--;
    const formattedMinutes = formatTime(Math.floor(secondsRemaining / 60));
    const formattedSeconds = formatTime(secondsRemaining % 60);
    timer.textContent = `${formattedMinutes}:${formattedSeconds}`;
    if (secondsRemaining === 0) {
      clearInterval(countdownInterval);
      alert('Time is up!');
      timer.textContent = '00:00';
    }
  }
};

const stopCountdown = () => {
  if (countdownInterval) {
    clearInterval(countdownInterval);
    countdownInterval = null; 
  }

  timer.textContent = '00:00';
  
  if (minutesInput) {
    minutesInput.value = '';
  }

  alert('Countdown stopped.');
  isPaused = false;
};

const pauseCountdown = () => {
  isPaused = !isPaused;
  if (isPaused) {
    pauseButton.textContent = 'Resume';
  } else {
    pauseButton.textContent = 'Pause';
  }
};

startButton.addEventListener('click', event => {
  event.preventDefault();
  startCountdown();
});

stopButton.addEventListener('click', stopCountdown);

pauseButton.addEventListener('click', pauseCountdown);
