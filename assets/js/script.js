const namePlayer1 = document.querySelector('.player1Name h2')
const namePlayer2 = document.querySelector('.player2Name h2')
const divPlayer1 = document.querySelector('.player1')
const divPlayer2 = document.querySelector('.player2')
const roundPlayer1 = document.querySelector('.roundScore1')
const roundPlayer2 = document.querySelector('.roundScore2')
const roll = document.querySelector('.playerRoll ')
const hold = document.querySelector('.playerHold ')
const newGame = document.querySelector('.newGame button')
const printScorePlayer1 = document.querySelector('.scorePlayer1 p')
const printScorePlayer2 = document.querySelector('.scorePlayer2 p')
const scores = document.querySelectorAll('.score')
const winner1 = document.querySelector('.win1')
const winner2 = document.querySelector('.win2')
let turn = 1
let global = 0
let round = 0
let scorePlayer1 = 0
let scorePlayer2 = 0
let player1 = ""
let player2 = ""

// création de la fonction win

function win(playerName, roundScore, divPlayer, divOtherPlayer, printScorePlayer, round, winner) {
    if ((parseInt(printScorePlayer.textContent) + round) >= 100) {
        divPlayer.classList.add('win')
        console.log(winner)
        winner.innerText = `${playerName.textContent} Vous avez gagnez !`
        roundScore.innerText = ""
        playerName.style.display = 'none'
        scores[0].style.opacity = "0"
        scores[1].style.opacity = "0"
        roll.style.display = 'none'
        hold.style.display = 'none'
        divOtherPlayer.style.opacity = '0'
    }
}

// comportement du bouton hold

function holdScore(roundPlayer, printScorePlayer, round, divPlayer, otherDivPlayer) {
    printScorePlayer.textContent = (parseInt(printScorePlayer.textContent) + round)
    changePlayer(divPlayer, otherDivPlayer, roundPlayer)
    return round = 0
}

// Création Noms des joueurs

function createPlayerName() {
    player1 = prompt("veuillez rentrer le nom du joueur 1")
    player2 = prompt('Veuillez rentrer le nom du joueur 2')
    
    namePlayer1.innerText = player1[0].toUpperCase() + player1.slice(1)
    namePlayer2.innerText = player2[0].toUpperCase() + player2.slice(1)
}

// ajout du résultat du dés a roundScore

function roundScore(dice) {
    if (parseInt(dice) !== 1){
        return round += parseInt(dice)
    } else {
        return round = 0
    }
}

// changement de joueur

function nextPlayer(dice, divPlayer, otherDivPlayer, roundPlayer, scorePlayer, printScorePlayer) {
    if(dice == 1){
            changePlayer(divPlayer, otherDivPlayer, roundPlayer)
            // printScore(scorePlayer, printScorePlayer)
            return scorePlayer
    }
}

function changePlayer(divPlayer, otherDivPlayer, roundPlayer) {
    divPlayer.classList.add('active');
    otherDivPlayer.classList.remove('active');
    roundPlayer.textContent = '';
    turn === 1 ? turn = 2 : turn = 1
}
// affichage score du joueur

function printScore(scorePlayer, printScorePlayer){
    printScorePlayer.textContent = scorePlayer
    return scorePlayer + round
}

// animation du dé

function rollDice() {
    const dice = [...document.querySelectorAll(".dice-list")]
    dice.forEach(dice => {
        toggleClasses(dice)
        dice.dataset.roll = getRandomNumber(1, 6)
        if (turn === 1) {
            roundScore(dice.dataset.roll, scorePlayer1)
            scorePlayer1 += parseInt(dice.dataset.roll)
            roundPlayer1.innerText = round
            win(namePlayer1, roundPlayer1, divPlayer1, divPlayer2, printScorePlayer1, round, winner1)
            nextPlayer(dice.dataset.roll, divPlayer2, divPlayer1, roundPlayer1, scorePlayer1, printScorePlayer1)
            return turn
        }  else if(turn === 2){
            roundScore(dice.dataset.roll, scorePlayer2)
            scorePlayer2 += parseInt(dice.dataset.roll)
            roundPlayer2.innerText = round
            win(namePlayer2, roundPlayer1, divPlayer2,  divPlayer1, printScorePlayer2, round, winner2)
            nextPlayer(dice.dataset.roll,  divPlayer1, divPlayer2, roundPlayer2, scorePlayer2, printScorePlayer2)
            return turn
        } 
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
    divPlayer1.classList.add('active')
    divPlayer1.style.width = "50vw"
    divPlayer2.style.width = "50vw"
    roll.style.display = 'block'
    hold.style.display = 'block'
    divPlayer1.style.opacity = '1'
    divPlayer2.style.opacity = '1'
    namePlayer1.style.opqcity = '1'
    namePlayer2.style.opqcity = '1'
    scores[0].style.opacity = "1"
    scores[1].style.opacity = "1"
    createPlayerName()
}

roll.addEventListener("click", () => {
    if (namePlayer1.textContent !== "") {
        rollDice()
    } else {
        init()
    }
});

newGame.addEventListener("click", init);

hold.addEventListener('click', () => {
    if (roundPlayer1.textContent !== "" || roundPlayer2.textContent !== "") {
        if (turn === 1) {
            holdScore(roundPlayer1, printScorePlayer1, round, divPlayer2, divPlayer1)
        } else {
            holdScore(roundPlayer2, printScorePlayer2, round, divPlayer1, divPlayer2)
        }
    }
    return round = 0
})