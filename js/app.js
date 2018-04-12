let moves = 0; //initializing moves from 0
let decKOfCards = document.querySelector('.deck');
let allCards = decKOfCards.querySelectorAll('.card');
let numOfMoves = document.querySelector('.score-panel .moves');
let restartBoard = document.querySelector('.score-panel .restart');
let matched = document.getElementsByClassName('match');

let openCards = []; //an empty array to hold the open cards
let arrayOfCards = []; //an empty array to hold the shuffed array

/*
 * Create a list that holds all of the cards
 */
for (let i = 0; i < allCards.length; i++) {
    arrayOfCards[i] = allCards[i];
}

decKOfCards.addEventListener('click', openCard);   //a click event to open the cards
restartBoard.addEventListener('click', reset);   //an event to click on reset icon to restart the game


/*
A function which shuffle the array 
and return the shuffled array
*/
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/* A function that ckecks match and no-match conditions for the two opened cards.
*/
function openCard(e) {
    if ((openCards.length < 2) && (e.target.tagName == 'LI') && !(e.target.classList.contains('open', 'show')) && !(e.target.classList.contains('match'))) {
        e.target.classList.add('open', 'show');
        e.target.classList.add('click1');
        openCards.push(e.target);

        if (openCards.length == 2) {
            movesChecker();
            if (openCards[0].innerHTML === openCards[1].innerHTML) {
                setTimeout(makethemmach, 1000);
            } else {
                setTimeout(theydontmatch, 1000);
            }

            setTimeout(function () {
                if (matched.length === allCards.length) {
                    alert('You won!');
                }
            }, 1200)
        }
        console.log(moves);

    }

}


/*
A function to check if the two opened cards match then add the match 
 class and remove both show and open classes to keep the cards open. 
*/
function makethemmach() {
    openCards[0].classList.add("match");
    openCards[0].classList.remove("show", "open");
    openCards[1].classList.add("match");
    openCards[1].classList.remove("show", "open");
    openCards = []
}


/*
A function to check that if the cards does'nt match then add some 
animation and remove the other classes to disappear the cards.
*/
function theydontmatch() {
    openCards[0].classList.add('unmatch');
    openCards[1].classList.add('unmatch');
    setTimeout(removelastCLass, 1000);

}
/*
Remove the last clicked and match classes to check for
further moves.
*/
function removelastCLass() {

    openCards[0].classList.remove("show", "open", 'click1', 'unmatch');
    openCards[1].classList.remove("show", "open", 'click1', 'unmatch');

    openCards = [];
}


//Increments the no. of moves as the pair of cards is checked for match
function movesChecker() {
    moves = moves + 1;
    numOfMoves.textContent = moves;
}


/*
A reset function which resets the game and shuffle the position of cards everytime 
reload icon is clicked.
*/
function reset() {
    moves = 0;
    numOfMoves.textContent = moves;
    openCards = [];

    for (let i = 0; i < allCards.length; i++) {
        allCards[i].classList.remove('match', 'open', 'show', 'click1');
    }

    arrayOfCards = shuffle(arrayOfCards);
    decKOfCards.innerHTML = '';
    for (let i = 0; i < arrayOfCards.length; i++) {
        decKOfCards.appendChild(arrayOfCards[i]);

    }
}