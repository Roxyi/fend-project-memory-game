/*
 * Create a list that holds all of your cards
 */
const cards = [];
const cardElements = document.querySelectorAll('.card');
for (cardElement of cardElements) {
  cards.push(cardElement.firstElementChild.className);
}

/*
 * Get elements from DOM
 * Initial an openCardList to store selected cards and matached cards
 * Initial timer, moves, and a toggleTimer flag for starting and ending timer
 */
const stars = document.querySelectorAll('.stars');
const modal = document.querySelector('.modal');
const secondsElement = document.querySelector('.seconds');
const movesElement = document.querySelector('.moves');
const finalSeconds = document.querySelector('#finalSeconds');
const finalMoves = document.querySelector('#finalMoves');
let openCardList = [];
let clickTimes = 0;
let seconds = 0;
let toggleTimer = false;

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 * Notes from Yi Xu: I don't call the shufflecards here in that there is HTML
 * code displaying the cards on the page. I don't want to waste it. The shuffleCards
 * function will be called when the game is restarted.
 */

function shuffleCards(cards) {
  const shuffledCards = shuffle(cards);
  for (let i = 0; i < cardElements.length; i++) {
    const cardChild = cardElements[i].firstElementChild;
    cardChild.className = `fa fa-${shuffledCards[i]}`;
  }
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
document.querySelector('.deck').addEventListener('click', clickCard);

function clickCard(e) {
  const clickedCard = e.target;
  if (clickedCard.className == 'card') {
    toggleTimer = true;
    clickedCard.classList.add('open', 'show');
    addToOpenCardList(clickedCard);
    incrementMoves();
    checkIfWin();
  }
}

function addToOpenCardList(obj) {
  // new cards are always added to the beginning of the array
  openCardList.unshift(obj);
  if (openCardList.length % 2 == 0) {
    const card1 = openCardList[0];
    const card2 = openCardList[1];
    if (card1.firstElementChild.className == card2.firstElementChild.className) {
      cardsAreMatched(card1, card2);
    } else {
      cardsAreNotMatched(card1, card2);
    }
  }
}

function cardsAreMatched(card1, card2) {
  card1.className = 'card match';
  card2.className = 'card match';
}

function cardsAreNotMatched(card1, card2) {
  openCardList.splice(0, 2);
  // use setTimeout to delay the change of class name
  setTimeout(() => {
    card1.className = 'card';
    card2.className = 'card';
  }, 500);
}

function incrementMoves() {
  clickTimes += 1;
  movesElement.textContent = clickTimes;
  if (clickTimes == 30) {
    for (star of stars) {
      star.childNodes[1].style.display = 'none';
    }
  }
  if (clickTimes == 40) {
    for (star of stars) {
      star.childNodes[3].style.display = 'none';
    }
  }
}

function checkIfWin() {
  if (openCardList.length == 16) {
    toggleTimer = false;
    finalSeconds.textContent = seconds;
    finalMoves.textContent = clickTimes;
    modal.style.display = "flex";
  }
}

/* a timer will be started if the toggleTimer flag is set to true */
const timer = setInterval(() => {
  if (toggleTimer) {
    seconds += 1;
    secondsElement.textContent = seconds;
  } else {
    // console.log(seconds);
  }
}, 1000);

/* when restart button is clicked, assign the initial values to timer, moves,
 * and openCardList. Flip all cards back and shuffle the cards.
 */
document.querySelector('.restart').addEventListener('click', restart);

function restart() {
  if (clickTimes >= 40) {
    for (star of stars) {
      star.childNodes[1].style.display = 'inline-block';
      star.childNodes[3].style.display = 'inline-block';
    }
  } else if (clickTimes >= 30) {
    for (star of stars) {
      star.childNodes[1].style.display = 'inline-block';
    }
  }
  toggleTimer = false;
  seconds = 0;
  secondsElement.textContent = seconds;
  clickTimes = 0;
  movesElement.textContent = clickTimes;
  for (cardElement of cardElements) {
    cardElement.className = 'card';
  }
  shuffleCards(cards);
  openCardList = [];
  quitModal();
}

function quitModal() {
  modal.style.display = 'none';
}