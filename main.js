const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetButton = document.getElementById('reset');
const playerSetup = document.getElementById('player-setup');
const gameBoard = document.getElementById('game-board');
const startButton = document.getElementById('start-game');

let currentPlayer = "X";
let gameState = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;
let player1Name = '';
let player2Name = '';

const clickSound = document.getElementById('click-sound');
const winSound = document.getElementById('win-sound');
const drawSound = document.getElementById('draw-sound');

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

startButton.addEventListener('click', () => {
    player1Name = document.getElementById('player1').value || "اللاعب 1";
    player2Name = document.getElementById('player2').value || "اللاعب 2";
    statusText.textContent = `دور ${player1Name} (X)`;
    currentPlayer = "X";
    playerSetup.style.display = 'none';
    gameBoard.style.display = 'block';
    resetButton.style.display = 'block'; 
});

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = clickedCell.getAttribute('data-index');

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    clickedCell.classList.add('clicked');
    clickSound.play();

    checkWinner();
}

function checkWinner() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];

        if (a === "" || b === "" || c === "") {
            continue;
        }

        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `اللاعب ${currentPlayer === "X" ? player1Name : player2Name} فاز!`;
        gameActive = false;
        winSound.play(); 
        return;
    }

    if (!gameState.includes("")) {
        statusText.textContent = "تعادل!";
        gameActive = false;
        drawSound.play();
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `دور ${currentPlayer === "X" ? player1Name : player2Name}`;
}

function resetGame() {
    gameState = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = "X";
    statusText.textContent = `دور ${player1Name} (X)`;
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove('clicked');
    });
    resetButton.style.display = 'block'; 
}

document.addEventListener('DOMContentLoaded', function() {
    const themeToggleBtn = document.getElementById('toggle-theme');
    
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', function() {
            const currentTheme = document.body.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.body.setAttribute('data-theme', newTheme);
        });
    }
});


