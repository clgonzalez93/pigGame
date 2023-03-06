'use strict';

//Selecting elements. hash is selector for ID. These are the 2 methods
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const currentPlay0El = document.getElementById('current--0');
const currentPlay1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const allTotalScores = document.querySelectorAll('.score');
const allCurrentScores = document.querySelectorAll('.current-score')
//starting conditions
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

//keeping tab on scores
/*why are we using const here??
This is a source of confusion. Because we usually say that a variable declared as const means the contents cannot be changed.

But that is not exactly true. When a const holds an array, we cannot change it to point to another array. So the reference has to remain the same. But as long as we point to the same array, then we can change what's inside the array, because const only worries about the reference (the address in memory where it finds the array) being the same.

Or to use an analogy: If you move from your house to another house, then your address changes. But if you redecorate you old hose, then the address stays the same. Using const you can redecorate, but you cannot move. */

//Declaring empty variables. they need to "live" outside the function so they can be reused, but we want to assign the value IN the function
let scores, currentScore, activePlayer, playing;

const init = function () {
scores = [0, 0];
currentScore = 0;
activePlayer = 0;
playing = true;

score0El.textContent = 0;
score1El.textContent = 0;
currentPlay0El.textContent = 0;
currentPlay1El.textContent = 0;

player0El.classList.remove('player--winner');
player1El.classList.remove('player--winner');
player0El.classList.add('player--active');
player1El.classList.remove('player--active');
diceEl.classList.add('hidden');
};

init();

//creating a function for switching players
const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
};


btnRoll.addEventListener('click', function () {
    if (playing) {
    //math.random creates a number between 0 and 0.9999, thats why we need to both truncate and multiply it to get the options we want (this case number from 1-6). This specific formula gives a number between 0 and 5 (bc we always count from 0), so we add +1 to make sure its never 0
    const currentDice = Math.trunc(Math.random() * 6) + 1;
    diceEl.src = `dice-${currentDice}.png`;
    diceEl.classList.remove('hidden');

    if(currentDice !== 1) {
        currentScore += currentDice;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    } else {
       switchPlayer();
    }

}});

btnHold.addEventListener('click', function () {
if (playing) {
//add current score to active players total score
// ^scores[1] = scores[1] + currentScore
scores[activePlayer] += currentScore;

//switching player after current player has decided to hold points/
document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];

//check if score is 100 = win
if (scores[activePlayer] >= 100) {
playing = false;
diceEl.classList.add('hidden');
document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');

} else {
//switching to next player
switchPlayer();
}
}});

btnNew.addEventListener('click', init);
