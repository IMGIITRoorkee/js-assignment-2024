function getRandomColor() {
    const values = [0, 51, 102, 153, 204, 255];
    const randomR = values[Math.floor(Math.random() * values.length)];
    const randomG = values[Math.floor(Math.random() * values.length)];
    const randomB = values[Math.floor(Math.random() * values.length)];
    return `rgb(${randomR}, ${randomG}, ${randomB})`;
}

function updateComputerColor() {
    const computerColor = getRandomColor();
    document.getElementById('computer-color').style.backgroundColor = computerColor;
    return computerColor;
}

function checkColor() {
    const red = parseInt(document.getElementById('red').value);
    const green = parseInt(document.getElementById('green').value);
    const blue = parseInt(document.getElementById('blue').value);

    const userColor = `rgb(${red}, ${green}, ${blue})`;
    document.getElementById('user-color').style.backgroundColor = userColor;

    const computerColor = document.getElementById('computer-color').style.backgroundColor;

    if (userColor === computerColor) {
        document.getElementById('result').textContent = 'Congratulations! You matched the color!';
        /*added code*/
    } else {
        document.getElementById('result').textContent = 'Try again! Colors do not match.';
    }
}

window.onload = updateComputerColor;
