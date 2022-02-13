const nomPlayer1 = document.querySelector('.player1Name h2')
const nomPlayer2 = document.querySelector('.player2Name h2')
const divPlayer1 = document.querySelector('.player1')
const divPlayer2 = document.querySelector('.player2')
const roundPlayer1 = document.querySelector('.roundScore1')
const roundPlayer2 = document.querySelector('.roundScore2')
const roll = document.querySelector('.playerRoll ')
const hold = document.querySelector('.playerHold ')
const newGame = document.querySelector('.newGame button')
const printScorePlayer1 = document.querySelector('.scorePlayer1 p')
const printScorePlayer2 = document.querySelector('.scorePlayer2 p')

let turn = 1
let global = 0
let round = 0
let scorePlayer1 = 0
let scorePlayer2 = 0


// Création Noms des joueurs

function createPlayerName() {
    let player1 = "antoine"//prompt("veuillez rentrer le nom du joueur 2")
    let player2 = "arthur"//prompt('Veuillez rentrer le nom du joueur 1')
    
    nomPlayer1.innerText = player1[0].toUpperCase() + player1.slice(1)
    nomPlayer2.innerText = player2[0].toUpperCase() + player2.slice(1)
}

// ajout du résultat du dés a roundScore

function roundScore(dice) {
    if (parseInt(dice) !== 1){
        return round += parseInt(dice)
    } else {
        nextPlayer()
        return round
    }
}

// changement de joueur

function nextPlayer(dice, divPlayer, roundPlayer, scorePlayer, printScorePlayer) {
    if(dice == 1){
            divPlayer.classList.add('active');
            divPlayer.classList.remove('active');
            roundPlayer.textContent = '';
            turn === 1 ? turn = 2 : turn = 1
            printScore(scorePlayer, printScorePlayer)
            return round = 0
    }
}

// affichage du roundScore
function printRoundScore(roundPlayer) {
    roundPlayer.innerText = round
    return round
}

// affichage score du joueur

function printScore(scorePlayer, printScorePlayer){
    scorePlayer += round
    printScorePlayer.textContent = scorePlayer
    return scorePlayer
}

// animation du dé

function rollDice() {
    const dice = [...document.querySelectorAll(".dice-list")]
    dice.forEach(dice => {
        toggleClasses(dice)
        dice.dataset.roll = getRandomNumber(1, 6)
        roundScore(dice.dataset.roll)
        if (turn === 1) {
            printRoundScore(roundPlayer1)
            nextPlayer(dice.dataset.roll, divPlayer1,  roundPlayer1, scorePlayer1, printScorePlayer1)
        }  else if(turn === 2){
            printRoundScore(roundPlayer2)
            nextPlayer(dice.dataset.roll, divPlayer1,  roundPlayer1, scorePlayer2, printScorePlayer2)
        } 
        console.log(turn);
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


// Init

function init() {
    createPlayerName()
}

roll.addEventListener("click", rollDice);
newGame.addEventListener("click", init);
