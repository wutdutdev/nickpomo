let timeLeft = 25 * 60; // Default to 25 minutes in seconds
const workTime = 25 * 60;
const restTime = 5 * 60;
let timerId = null;
let isWorkTime = true;
let totalWorkSeconds = 0;

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');
const statusText = document.getElementById('status-text');
const totalWorkTimeDisplay = document.getElementById('total-work-time');
const modeToggle = document.getElementById('mode-toggle');
const modeIcon = modeToggle.querySelector('.material-icons');

modeToggle.addEventListener('click', () => {
    if (isWorkTime) {
        setMode('rest');
        modeIcon.textContent = 'coffee';
    } else {
        setMode('work');
        modeIcon.textContent = 'work';
    }
});

function setMode(mode) {
    // Reset timer state
    isWorkTime = mode === 'work';
    clearInterval(timerId);
    timerId = null;
    
    // Update button state
    modeToggle.classList.toggle('active', mode === 'rest');
    
    // Set appropriate time
    timeLeft = mode === 'work' ? workTime : restTime;
    
    // Update display
    updateDisplay();
    startButton.textContent = mode === 'work' ? 'Start Work' : 'Take a Break';
    statusText.textContent = mode === 'work' ? "Let's Get To Work!" : "Time for a Break!";
}

function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const timeString = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    
    minutesDisplay.textContent = String(minutes).padStart(2, '0');
    secondsDisplay.textContent = String(seconds).padStart(2, '0');
    
    document.title = `${timeString} - Pomodoro Timer`;
}

function startTimer() {
    if (timerId !== null) return;

    if (!timeLeft) {
        timeLeft = workTime;
    }

    timerId = setInterval(() => {
        timeLeft--;
        if (isWorkTime) {
            totalWorkSeconds++;
            updateTotalWorkTime();
        }
        updateDisplay();

        if (timeLeft === 0) {
            clearInterval(timerId);
            timerId = null;
            alert(isWorkTime ? 'Work time is over! Take a break!' : 'Break is over! Back to work!');
            setMode('work');
        }
    }, 1000);

    startButton.textContent = 'Pause';
}

function updateTotalWorkTime() {
    const minutes = Math.floor(totalWorkSeconds / 60);
    totalWorkTimeDisplay.textContent = `Total work time: ${minutes} minutes`;
}

function resetTimer() {
    clearInterval(timerId);
    timerId = null;
    isWorkTime = true;
    timeLeft = workTime;
    totalWorkSeconds = 0;
    updateTotalWorkTime();
    statusText.textContent = "Let's Get To Work!";
    updateDisplay();
    startButton.textContent = 'Start Work';
    document.title = '25:00 - Pomodoro Timer';
}

startButton.addEventListener('click', () => {
    if (timerId === null) {
        startTimer();
    } else {
        clearInterval(timerId);
        timerId = null;
        startButton.textContent = 'Start';
    }
});

resetButton.addEventListener('click', resetTimer);

// Initialize display
updateDisplay(); 