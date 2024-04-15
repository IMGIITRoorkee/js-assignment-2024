let intervalId;
let timeLeft;
let score = 0;
let highScore = localStorage.getItem('highScore') || 0;

document.addEventListener("DOMContentLoaded", function() {
    const problemElement = document.getElementById('problem');
    const inputElement = document.getElementById('input');
    const timeElement = document.getElementById('time');
    const pointsElement = document.getElementById('points');
    const startButton = document.getElementById('start');

    startButton.addEventListener('click', startGame);

    function startGame() {
        score = 0;
        timeLeft = 10;
        pointsElement.textContent = score;
        timeElement.textContent = timeLeft;
        startButton.disabled = true;
        generateProblem();
        intervalId = setInterval(updateTime, 1000);
    }

    function updateTime() {
        timeLeft--;
        timeElement.textContent = timeLeft;

        if (timeLeft === 0) {
            clearInterval(intervalId);
            startButton.disabled = false;
            alert('Time\'s up! Your final score is: ' + score);
            if (score > highScore) {
                highScore = score;
                localStorage.setItem('highScore', highScore);
            }
            return;
        }
    }

    function generateProblem() {
        const num1 = Math.floor(Math.random() * 10);
        const num2 = Math.floor(Math.random() * 10);
        const operator = Math.random() < 0.5 ? '+' : '-';

        let answer;
        if (operator === '+') {
            problemElement.textContent = `${num1} + ${num2}`;
            answer = num1 + num2;
        } else {
            problemElement.textContent = `${num1} - ${num2}`;
            answer = num1 - num2;
        }

        inputElement.value = '';
        inputElement.focus();

        inputElement.addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                checkAnswer(answer);
            }
        });
    }

    function checkAnswer(correctAnswer) {
        const userAnswer = parseInt(inputElement.value, 10);
        if (userAnswer === correctAnswer) {
            score++;
            pointsElement.textContent = score;
            generateProblem();
        }
    }
});
