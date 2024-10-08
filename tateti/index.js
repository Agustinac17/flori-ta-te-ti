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

// Cambia las imágenes según el jugador
const playerImages = {
    'X': 'imagenes/margarita.png', // Imagen para el jugador 1
    'O': 'imagenes/flor.png'  // Imagen para el jugador 2
};

// Reproducir música de fondo
function playBackgroundMusic() {
    backgroundMusic.play();
}

// Función que maneja el clic en las celdas
function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = Array.from(cells).indexOf(clickedCell);

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    gameState[clickedCellIndex] = currentPlayer;
    
    // Crear una imagen y establecerla como contenido de la celda
    const img = document.createElement('img');
    img.src = playerImages[currentPlayer];
    img.alt = currentPlayer;
    img.style.width = '80px'; // Ajusta el tamaño según necesites
    img.style.height = '80px'; // Ajusta el tamaño según necesites
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
        // Detener música de fondo antes de reproducir el sonido de victoria
        backgroundMusic.pause();
        backgroundMusic.currentTime = 0; // Reiniciar música de fondo
        winSound.play(); // Reproduce sonido de victoria
        statusDisplay.textContent = `¡El jugador ${currentPlayer === 'X' ? 'margarita' : 'pinky'} ha ganado!`;
        gameActive = false;
        return;
    }

    if (!gameState.includes("")) {
        // Detener música de fondo antes de reproducir el sonido de empate
        backgroundMusic.pause();
        backgroundMusic.currentTime = 0; // Reiniciar música de fondo
        drawSound.play(); // Reproduce sonido de empate
        statusDisplay.textContent = "¡EMPATE!";
        gameActive = false;
        return;
    }

    // Cambiamos el jugador actual de 'X' a 'O' por 'margaritas' a 'pink'
    currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function restartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.textContent = "";
    cells.forEach(cell => {
        cell.innerHTML = ""; // Limpiar el contenido de la celda
    });
    backgroundMusic.currentTime = 0; // Reiniciar música de fondo
    backgroundMusic.play(); // Reproducir música de fondo al reiniciar
    // Detener los sonidos de victoria y empate
    winSound.pause();
    winSound.currentTime = 0; // Reiniciar sonido de victoria
    drawSound.pause();
    drawSound.currentTime = 0; // Reiniciar sonido de empate
}

cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

restartButton.addEventListener('click', restartGame);

// Reproducir música de fondo al cargar la página
window.onload = playBackgroundMusic;
