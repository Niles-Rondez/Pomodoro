const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");
const button = document.getElementById("start");
let timerInterval;
let timeLeft = 25 * 60; // 25 minutes in seconds

function pressButton(){
    if (button.textContent === "START") {
        startTimer();
    } else {
        pauseTimer();
    }
}

function startTimer() {
    button.textContent = "PAUSE";
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        const minutesLeft = Math.floor(timeLeft / 60);
        const secondsLeft = timeLeft % 60;

        minutes.textContent = String(minutesLeft).padStart(2, '0');
        seconds.textContent = String(secondsLeft).padStart(2, '0');

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert("Time's up!");
        } else {
            timeLeft--;
        }
    }, 1000);
}

function pauseTimer() {
    clearInterval(timerInterval);
    button.textContent = "START";
}