/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/




/*--------- FUNCTIONS -----------*/
const nextPlayer = function () {
    // if(activePlayer === 0) {
    //     activePlayer = 1
    // } else {
    //     activePlayer= 0
    // }

    // better this way
    prev = 0
    diceDom.style.display = 'none'
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0

    document.querySelector('.player-0-panel').classList.toggle('active') // toggle is to add class 'active' if it is not there and remove if it is there
    document.querySelector('.player-1-panel').classList.toggle('active')
    // document.querySelector('.player-0-panel').classList.remove('active') this is to remove class 'active'
    // document.querySelector('.player-1-panel').classList.add('active')  this is to add class 'active'
}

const init = function () {
    score = [0, 0]
    roundScore = 0
    activePlayer = 0
    gamePlaying = true
    prev = 0
    finalScore = 100
    diceDom.style.display = 'none'
    document.querySelector('.input-number').value = null
    document.getElementById('score-0').textContent = 0
    document.getElementById('score-1').textContent = 0
    document.getElementById('current-0').textContent = 0
    document.getElementById('current-1').textContent = 0
    document.getElementById('name-0').textContent = 'player 1'
    document.getElementById('name-1').textContent = 'player 2'
    document.querySelector('.player-0-panel').classList.remove('active')
    document.querySelector('.player-1-panel').classList.remove('active')
    document.querySelector('.player-0-panel').classList.add('active')
    document.querySelector('.player-0-panel').classList.remove('winner')
    document.querySelector('.player-1-panel').classList.remove('winner')
}


let score, roundScore, activePlayer, gamePlaying, prev, finalScore
const diceDom = document.querySelector('.dice')

// initializing game to new game

init()

// document.querySelector(`#current-${activePlayer}`).textContent = dice
// document.querySelector(`#current-${activePlayer}`).innerHTML = '<b>' + dice + '</b>'

document.querySelector(".btn-roll").addEventListener('click', function () {
    if (gamePlaying) {
        //bring back the hidden image
        diceDom.style.display = "block"

        //get a random number from 1 to 6 and show the image with number equal to dice
        let dice = Math.floor(Math.random() * 6) + 1
        diceDom.src = `dice-${dice}.png`

        // update value the score if number is not 1
        if (dice > 1) {
            if (prev === 6 && dice === 6) {
                score[activePlayer] = 0
                document.getElementById(`score-${activePlayer}`).textContent = score[activePlayer]
                roundScore = 0
                document.getElementById(`current-${activePlayer}`).textContent = roundScore

                // next player's turn
                nextPlayer()
            } else {
                roundScore += dice
                document.getElementById(`current-${activePlayer}`).textContent = roundScore
            }
            prev = dice
        } else {
            roundScore = 0
            document.getElementById(`current-${activePlayer}`).textContent = roundScore

            // next player's turn
            nextPlayer()
        }
    }
})
document.querySelector('.btn-hold').addEventListener('click', function () {
    if (gamePlaying) {
        // firstly we need to add the current score in round score
        score[activePlayer] += roundScore
        roundScore = 0

        //show the round score
        document.getElementById(`score-${activePlayer}`).textContent = score[activePlayer]



        // check whether the player has won or not
        if (score[activePlayer] >= finalScore) {
            // hide the dice after winning
            gamePlaying = false
            // diceDom.style.display = 'none'
            document.getElementById(`name-${activePlayer}`).textContent = 'Winner!'
            diceDom.style.display = 'none'
            document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active')
            document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner')
        }
        else {
            // next player's turn
            nextPlayer()
        }
    }
})

document.querySelector('.btn-new').addEventListener('click', init)

document.querySelector('.input-number').addEventListener('change', function (e) {
    finalScore = e.target.value
})
// getElementById can run 15 million operations per second
// querySelector can run 7 million operations per second
