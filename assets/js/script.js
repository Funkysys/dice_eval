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
const dice = [...document.querySelectorAll(".dice-list")]
let turn = 1
let round = 0
let scorePlayer1 = 0
let scorePlayer2 = 0
let player1 = ""
let player2 = ""

// Animation d'ouverture

window.addEventListener('load', () => {
    const TLInit = gsap.timeline({
        default: {
            ease: 'power2',
            duration: 1.2
        }
    })
    TLInit
    .to(divPlayer1, {y: "+100", opacity : '1', duration: 1.2})
    .to(divPlayer2, {y: "-100", opacity : '1'}, '-=0.6')
    .to(namePlayer1, {opacity : '1'}, '-=0.6')
    .to(namePlayer2, {opacity : '1'}, '-=0.6')
    .to('.dice', {opacity: 1, y: -50})
    .to(".scorePlayer1", {opacity : "1", x: '+200'}, '-=0.6')
    .to(".scorePlayer2", {opacity : "1", x: '-200'}, '-=0.6')
    .to('.newGame', {opacity: 1, y: -40})
    .to('.player', {opacity: 1}, '-=0.5')
})

// création de la fonction win

function win(playerName, roundScore, divPlayer, divOtherPlayer, printScorePlayer, round, winner) {
    if ((parseInt(printScorePlayer.textContent) + round) >= 100) {
        divPlayer.classList.add('win')
        winner.innerText = `${playerName.textContent} \nVous avez gagnez !`
        gsap.to(winner, {opacity: "1", duration: 1.2})
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
            return scorePlayer
    }
}

function changePlayer(divPlayer, otherDivPlayer, roundPlayer) {
    divPlayer.classList.add('active');
    otherDivPlayer.classList.remove('active');
    roundPlayer.textContent = '';
    turn === 1 ? turn = 2 : turn = 1
}

// animation du dé

function rollDice() {
    dice.forEach(dice => {
        console.log(scorePlayer1);
        console.log(scorePlayer2);
        console.log(round);
        console.log(roundPlayer1);
        console.log(roundPlayer2);
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
            win(namePlayer2, roundPlayer2, divPlayer2,  divPlayer1, printScorePlayer2, round, winner2)
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
    
    const TLInit = gsap.timeline({
        default: {
            ease: 'power2',
            duration: 1.2
        }
    })
    TLInit
    .to(divPlayer1, {opacity : '1'})
    .to(divPlayer2, {opacity : '1'}, '-=0.6')
    .to(namePlayer1, {opacity : '1'}, '-=0.6')
    .to(namePlayer2, {opacity : '1'}, '-=0.6')
    .to(scores[0], {opacity : '1'}, '-=0.6')
    .to(scores[1], {opacity : '1'}, '-=0.6')
    .add(() => {
        round = 0
        divPlayer1.classList.remove('win')
        divPlayer2.classList.remove('win')
        divPlayer1.classList.add('active')
        divPlayer2.classList.remove('active')
        divPlayer1.style.width = "50vw"
        divPlayer2.style.width = "50vw"
        roll.style.display = 'block'
        hold.style.display = 'block'
        namePlayer1.style.display = 'block'
        namePlayer2.style.display = 'block'
        printScorePlayer1.textContent = 0
        printScorePlayer2.textContent = 0
        scorePlayer1 = 0
        scorePlayer2 = 0
        winner1.innerText = ""
        winner2.innerText = ""
    })
    .add(createPlayerName())
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