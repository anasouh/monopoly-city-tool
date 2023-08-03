
const DICEIMG_PATH = "img/dices/dice?.png"

const diceBtn = document.getElementById("diceBtn");
const diceOne = document.getElementById("diceOne");
const diceTwo = document.getElementById("diceTwo");
const doubleSpan = document.querySelector(".dicing span");

function initDices() {
    const diceOneValue = localStorage.getItem("dice1");
    const diceTwoValue = localStorage.getItem("dice2");

    console.log(diceOneValue);

    if (diceOneValue != null) {
        diceOne.src = DICEIMG_PATH.replace("?", diceOneValue);
    } else {
        diceOne.src = DICEIMG_PATH.replace("?", 1);
    }

    if (diceTwoValue != null) {
        diceTwo.src = DICEIMG_PATH.replace("?", diceTwoValue);
    } else {
        diceTwo.src = DICEIMG_PATH.replace("?", 1);
    }
}

function randomDiceExclude(exclude) {
    let value = Math.floor(Math.random() * 6) + 1;
    while (value == exclude) {
        value = Math.floor(Math.random() * 6) + 1;
    }

    return value;
}

function throwDice(dice) {
    let value = Math.floor(Math.random() * 6) + 1;
    let id;

    if (dice.id == "diceOne") id = 1;
    else id = 2;

    dice.src = DICEIMG_PATH.replace("?", value);

    localStorage.setItem(`dice${id}`, value);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function throwDiceBound(dice) {
    let bounds = Math.floor(Math.random() * 10) + 1;

    for (let i = 0; i < bounds; i++) {
        sleep(500);
        throwDice(dice);
    }
}

function throwDices() {
    let audio = new Audio('sounds/dices.mp3');
    audio.play();
    throwDiceBound(diceOne);
    throwDiceBound(diceTwo);

    if (diceOne.src == diceTwo.src) {
        doubleSpan.style.display = "block";
    } else {
        doubleSpan.style.display = "none";
    }
}

diceBtn.addEventListener("click", function () {
    throwDices();
});

initDices();