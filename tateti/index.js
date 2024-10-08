const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');
const restartButton = document.getElementById('restartButton');
const backgroundMusic = document.getElementById('backgroundMusic');
const winSound = document.getElementById('winSound');
const drawSound = document.getElementById('drawSound');

let currentPlayer = 'X';
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

/////////////////////////////////
const playerImages = {
    'X': 'imagenes/margarita.png', // jugador uno
    'O': 'imagenes/flor.png'  // jugador dos
};

//////////////////
function playBackgroundMusic() {
    backgroundMusic.play();
}

////////////////////
function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = Array.from(cells).indexOf(clickedCell);

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    gameState[clickedCellIndex] = currentPlayer;
    
    const img = document.createElement('img');
    img.src = playerImages[currentPlayer];
    img.alt = currentPlayer;
    img.style.width = '80px'; 
    img.style.height = '80px'; 
    clickedCell.appendChild(img);

    checkResult();
}

function checkResult() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] === "" || gameState[b] === "" || gameState[c] === "") {
            continue;
        }
        if (gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        backgroundMusic.pause();
        backgroundMusic.currentTime = 0; 
        winSound.play(); 
        statusDisplay.textContent = `¡El jugador ${currentPlayer === 'X' ? 'margarita' : 'pinky'} ha ganado!`;
        gameActive = false;
        return;
    }

    if (!gameState.includes("")) {
        backgroundMusic.pause();
        backgroundMusic.currentTime = 0; 
        drawSound.play(); 
        statusDisplay.textContent = "¡EMPATE!";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function restartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.textContent = "";
    cells.forEach(cell => {
        cell.innerHTML = ""; 
    });
    backgroundMusic.currentTime = 0; 
    backgroundMusic.play(); 
    /////////
    winSound.pause();
    winSound.currentTime = 0; 
    drawSound.pause();
    drawSound.currentTime = 0; 
}

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

restartButton.addEventListener('click', restartGame);

window.onload = playBackgroundMusic;
