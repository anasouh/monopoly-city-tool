const timer_hours = document.getElementById("timer_hours");
const timer_minutes = document.getElementById("timer_minutes");
const timer_seconds = document.getElementById("timer_seconds");
const span = document.querySelector(".timer_time span");
let isStarted = false;

function stringifyValue(value) {
    if (value < 10) {
        return "0" + value;
    }

    return value;
}

function getValue(field) {
    try {
        return parseInt(field.value);
    } catch (error) {
        return 0;
    }
}

function setValue(field, value) {
    // value: integer

    field.value = stringifyValue(value);
    field.innerHTML = stringifyValue(value);

    localStorage.setItem(field.id, value);
}

function initTimer() {
    const hours = localStorage.getItem("timer_hours");
    const minutes = localStorage.getItem("timer_minutes");
    const seconds = localStorage.getItem("timer_seconds");

    if (hours != null) {
        setValue(timer_hours, hours);
    }
    
    if (minutes != null) {
        setValue(timer_minutes, minutes);
    }

    if (seconds != null) {
        setValue(timer_seconds, seconds);
    }

    if (hours == null && minutes == null && seconds == null) {
        span.style.display = "block";
        setValue(timer_hours, 1);
        setValue(timer_minutes, 0);
        setValue(timer_seconds, 0);
    }
}

function isNull() {
    if (getValue(timer_hours) == 0 && getValue(timer_minutes) == 0 && getValue(timer_seconds) == 0) {
        alert("Veuillez remplir tous les champs (minimum 1 seconde)");
        span.style.display = "block";
        return false;
    }

    return true;
}

function stopTimer() {
    isStarted = false;
    timer_hours.disabled = false;
    timer_minutes.disabled = false;
    timer_seconds.disabled = false;
    timer_start.disabled = false;
    timer_stop.disabled = true;
    timer_reset.disabled = true;
}

function startTimer() {

    if (!isNull()) {
        return;
    }

    isStarted = true;
    let audio = new Audio('sounds/victory.mp3');

    timer_hours.disabled = true;
    timer_minutes.disabled = true;
    timer_seconds.disabled = true;
    timer_start.disabled = true;
    timer_stop.disabled = false;
    timer_reset.disabled = false;

    let hours = parseInt(timer_hours.value);
    let minutes = parseInt(timer_minutes.value);
    let seconds = parseInt(timer_seconds.value);

    let total_seconds = hours * 3600 + minutes * 60 + seconds;

    let timer = setInterval(function () {
        if (!isStarted) {
            clearInterval(timer);
            return;
        }

        hours = Math.floor(total_seconds / 3600);
        minutes = Math.floor((total_seconds - (hours * 3600)) / 60);
        seconds = total_seconds - (hours * 3600) - (minutes * 60);

        setValue(timer_hours, hours);
        setValue(timer_minutes, minutes);
        setValue(timer_seconds, seconds);

        if (total_seconds == 0) {
            clearInterval(timer);
            audio.play();
            alert("La partie est terminée");
            stopTimer();
        }

        total_seconds--;
    }, 1000);
}

function resetTimer() {
    stopTimer();
    timer_hours.value = "00";
    timer_minutes.value = "00";
    timer_seconds.value = "00";
}

const timer_start = document.getElementById("timer_start");
const timer_stop = document.getElementById("timer_stop");
const timer_reset = document.getElementById("timer_reset");

timer_start.addEventListener("click", startTimer);
timer_stop.addEventListener("click", stopTimer);
timer_reset.addEventListener("click", resetTimer);

timer_hours.addEventListener("change", function () {
    span.style.display = "none";
    setValue(timer_hours, getValue(timer_hours));
});

timer_minutes.addEventListener("change", function () {
    span.style.display = "none";
    setValue(timer_minutes, getValue(timer_minutes));
});

timer_seconds.addEventListener("change", function () {
    span.style.display = "none";
    setValue(timer_seconds, getValue(timer_seconds));
});

initTimer();