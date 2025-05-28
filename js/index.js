const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");
const button = document.getElementById("start");

let timerInterval;
let timeLeft = 25 * 60; // 25 minutes in seconds

var clickSound = new Audio("/resources/audio/button-click.mp3");
var alarmSound = new Audio("/resources/audio/alarm.mp3");

function pressButton(){
    if (button.textContent === "START") {
        clickSound.play();
        startTimer();
    } else {
        clickSound.play();
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
            alarmSound.play();
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

document.querySelector(".modes").addEventListener("click", function(event) {
    if (event.target.tagName === "BUTTON") {
        document.querySelectorAll(".modes button").forEach(btn => btn.classList.remove("active"));
        event.target.classList.add("active");

        clearInterval(timerInterval);
        timeLeft = 0; // Reset time left
        minutes.textContent = "00";
        seconds.textContent = "00";
        if (button.textContent === "PAUSE") {
            button.textContent = "START";
        }
        button.textContent = "START";
        const mode = event.target.dataset.mode;
        switch (mode) {
            case "pomodoro":
                document.documentElement.style.setProperty('--primary-color', 'rgb(199, 73, 73)');
                timeLeft = 25 * 60; // 25 minutes
                break;
            case "short-break":
                document.documentElement.style.setProperty('--primary-color', 'rgb(70, 145, 141)');
                timeLeft = 5 * 60; // 5 minutes
                break;
            case "long-break":
                document.documentElement.style.setProperty('--primary-color', 'rgb(75, 113, 145)');
                timeLeft = 15 * 60; // 15 minutes
                break;
        }
        minutes.textContent = String(Math.floor(timeLeft / 60)).padStart(2, '0');
        seconds.textContent = String(timeLeft % 60).padStart(2, '0');
    }
});
