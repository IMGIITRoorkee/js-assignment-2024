const cards = document.querySelectorAll('.memorycard');
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let matchedPairs = 0;
const totalPairs = cards.length / 2;
const resetButton = document.getElementById('resetButton');

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.toggle('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    hasFlippedCard = false;
    secondCard = this;

    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    matchedPairs++;
    if (matchedPairs === totalPairs) {
        setTimeout(() => {
            alert("You win!");
        }, 500); // Delay the alert to allow the last match to be visible
    }
    resetBoard();
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');
        resetBoard();
    }, 1500);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function resetGame() {
    cards.forEach(card => {
        card.classList.remove('flip');
        card.addEventListener('click', flipCard);
    });
    shuffleCards();
    matchedPairs = 0;
}

function shuffleCards() {
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * totalPairs);
        card.style.order = randomPos;
    });
}

resetButton.addEventListener('click', resetGame);

shuffleCards();
cards.forEach(card => card.addEventListener('click', flipCard));
