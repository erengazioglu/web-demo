function randomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function handleSubmit(event) {
    event.preventDefault();
}

function ruleEdit() {
    alert("game modes TBD")
}

function convertName() {
    let name = nameInput.value;
    nameInput.value = "";
    if (name == "") {
        alert("please enter something, anything")
    } else if (!isNaN(Number(name))) {
        alert("i am no number, i'm a free man!")
    } else {
        setGameStart(name)
    }
}

function convertGuess() {
    let guess = Number(guessInput.value);
    if (isNaN(guess)) {
        alert("NaN")
    } else if ((guess < rules.min) || (guess > rules.max)) {
        alert("Out of range")
    } else if (guessesCurrent.includes(guess)) {
        alert("You already tried that.")
    } else {
    checkGuess(guess)
    } 
}

function checkGuess(guess) {
    guessesCurrent.push(guess);
    guessInput.value = "";
    if (guess == randomNumber) {
        gameHeader.textContent = "That's it!!!";
        setGameOver()
    } else if (guessesCurrent.length == rules.guesses) {
        gameHeader.textContent = "Too bad...";
        setGameOver()
    } else {
        guessesLeft.textContent = "You have " + String(rules.guesses - 
            guessesCurrent.length) + " guesses left."
        gameHeader.textContent = "Try again!"
        switch (rules.tip) {
            case "loHi":
                if (guess > randomNumber) {
                    currentTip.textContent = "You went too far."
                } else {
                    currentTip.textContent = "Aim higher."
                } break
            default:
                currentTip.textContent = "rules went brr"
        }
        if (previousGuesses.textContent == "") {
            previousGuesses.textContent = String(guess)
        } else {
            previousGuesses.textContent += ", " + String(guess)}
    }
}

function setGameOver() {
    console.log("game over");
    guessInput.disabled = true;
    guessSubmit.disabled = true;
}

function setGameStart(name) {
    console.log("game start");
    gameBox.style.visibility = "visible";
    guessesCurrent = [];
    randomNumber = randomInt(rules.min, rules.max);
    playerName = name;
    nameInput.disabled = true;
    nameSubmit.disabled = true;
    changeRules.disabled = true;
    gameHeader.textContent = String(playerName) + ", I've picked a number. Take a guess!";
    guessInput.focus();
}

const gameBox = document.querySelector("#gameBox");

const gameHeader = document.querySelector("#gameHeader");
const guessesLeft = document.querySelector("#guessesLeft");
const currentTip = document.querySelector("#currentTip");
const previousGuesses = document.querySelector("#previousGuesses");

const nameInput = document.querySelector("#nameInput");
const nameSubmit = document.querySelector("#nameSubmit");
const guessInput = document.querySelector("#guessInput");
const guessSubmit = document.querySelector("#guessSubmit");
const changeRules = document.querySelector("#changeRules");

const gameForm = document.querySelector("#gameForm");

const rules = {
    min: 1,
    max: 100,
    guesses: 10,
    tip: "loHi"
}

let randomNumber = randomInt(rules.min, rules.max);
let guessesCurrent = [];
let playerName = "";

nameForm.addEventListener("submit", convertName);
gameForm.addEventListener("submit", convertGuess);
changeRules.addEventListener("click", ruleEdit);
gameForm.addEventListener("submit", handleSubmit);
nameForm.addEventListener("submit", handleSubmit);

nameInput.focus();