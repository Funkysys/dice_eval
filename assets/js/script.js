const nomPlayer1 = document.querySelector('.player1Name h2')
const nomPlayer2 = document.querySelector('.player2Name h2')
const divPlayer1 = document.querySelector('.player1')
const divPlayer2 = document.querySelector('.player2')
const roundPlayer1 = document.querySelector('.roundScore1')
const roundPlayer2 = document.querySelector('.roundScore2')
const roll = document.querySelector('.playerRoll ')
const hold = document.querySelector('.playerHold ')
const newGame = document.querySelector('.newGame button')
const score = document.querySelector('.score')

let turn = 0
let round = 0
let global = 0
let scorePlayer1 = document.querySelector('scorePlayer1')
let scorePlayer2 = document.querySelector('scorePlayer2')


// Création Noms des joueurs

function createPlayerName() {
    let player1 = "antoine"//prompt("veuillez rentrer le nom du joueur 2")
    let player2 = "arthur"//prompt('Veuillez rentrer le nom du joueur 1')
    
    nomPlayer1.innerText = player1[0].toUpperCase() + player1.slice(1)
    nomPlayer2.innerText = player2[0].toUpperCase() + player2.slice(1)
}



function rollDice() {
    const dice = [...document.querySelectorAll(".dice-list")]
    console.log(dice)
    dice.forEach(dice => {
        toggleClasses(dice)
        dice.dataset.roll = getRandomNumber(1, 6)
    });
}

function toggleClasses(dice) {
    dice.classList.toggle("odd-roll")
    dice.classList.toggle("even-roll")
}

function getRandomNumber(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
}

function init() {
    createPlayerName()
}

roll.addEventListener("click", rollDice);
newGame.addEventListener("click", init);
