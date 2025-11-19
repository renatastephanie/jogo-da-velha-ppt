// CONFIGURAÇÃO GERAL E SELETORES

// Elementos Comuns
const tictactoeSection = document.getElementById('tictactoe-game');
const rpsSection = document.getElementById('rockpaperscissors-game');
const navBtns = document.querySelectorAll('.nav-button');

// Jogo da Velha (Tic-Tac-Toe) Selectors
const tictactoeStatus = document.getElementById('tictactoe-status');
const tictactoeResetBtn = document.getElementById('tictactoe-reset-btn');
const tictactoeCells = document.querySelectorAll('.cell');

let boardState = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;

// Pedra, Papel e Tesoura (PPT) Selectors
const rpsResult = document.getElementById('rps-result');
const rpsChoices = document.querySelectorAll('.choice-btn');
const rpsResetBtn = document.getElementById('rps-reset-btn');
const playerScoreSpan = document.getElementById('player-score');
const cpuScoreSpan = document.getElementById('cpu-score');

let playerScore = 0;
let cpuScore = 0;
const rpsOptions = ['pedra', 'papel', 'tesoura'];

// CONSUMO DA API (FUNÇÕES COMUNS)

// Função base para buscar um conselho da API Advice Slip
const fetchAdvice = async (statusElement, resultMessage) => {
    try {
        const responde = await fetch('https://api.adviceslip.com/advice');
        const data = await responde.json();
        const advice = data.slip.advice;
        statusElement.innerHTML = `${resultMessage}<br><span style="font-size: 0.8em; color: #aaa; font-weight: normal;">(Conselho: ${advice})</span>`;
    } catch (error) {
        console.error(`Erro ao buscar conselho para ${statusElement.id}:`, error);
        statusElement.innerHTML = `${resultMessage}<br><span style="font-size: 0.8em; color: #aaa; font-weight: normal;">(Sem conselho disponível no momento.)</span>`;
    }
};

// LÓGICA DO JOGO DA VELHA
const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Linhas
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colunas
    [0, 4, 8], [2, 4, 6]             // Diagonais
];

const updateTictactoeStatus = (message, isWin = false) => {
    tictactoeStatus.textContent = message;
    tictactoeStatus.style.color = isWin ? 'var(--color-win)' : 'white';
    if (isWin) {
        tictactoeStatus.style.textShadow = '0 0 5px var(--color-win), 0 0 10px var(--color-win)';
    } else {
        tictactoeStatus.style.textShadow = 'none';
    }
};

const checkResult = () => {
    let roundWon = false;
    let winningLine = [];

    for (let i = 0; i < winningConditions.length; i++) {
        const condition = winningConditions[i];
        const a = boardState[condition[0]];
        const b = boardState[condition[1]];
        const c = boardState[condition[2]];

        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            winningLine = condition;
            break;
        }
    }

    if (roundWon) {
        gameActive = false;
        const resultMessage = `Jogador ${currentPlayer} Venceu!`;
        updateTictactoeStatus(resultMessage, true);
        winningLine.forEach(index => tictactoeCells[index].classList.add('win'));
        fetchAdvice(tictactoeStatus, resultMessage);
        return;
    }

    if (!boardState.includes('')) {
        gameActive = false;
        const resultMessage = 'Empate!';
        updateTictactoeStatus(resultMessage);
        fetchAdvice(tictactoeStatus, resultMessage);
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateTictactoeStatus(`Vez do Jogador ${currentPlayer}`);
};

const handleCellClick = (event) => {
    const cell = event.currentTarget;
    const clickedCellIndex = parseInt(cell.getAttribute('data-index'), 10);

    if (boardState[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    boardState[clickedCellIndex] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer.toLowerCase());
    checkResult();
};

const resetGame = () => {
    boardState = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    updateTictactoeStatus('Vez do Jogador X');
    tictactoeCells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o', 'win');
    });
};

// --- Adiciona os event listeners uma única vez ---
tictactoeResetBtn.addEventListener('click', resetGame);
tictactoeCells.forEach(cell => cell.addEventListener('click', handleCellClick));
updateTictactoeStatus('Vez do Jogador X'); // Status inicial

// LÓGICA DO PEDRA, PAPEL E TESOURA (PPT)
const getCpuChoice = () => {
    const randomIndex = Math.floor(Math.random() * rpsOptions.length);
    return rpsOptions[randomIndex];
};

const determineWinner = (playerChoice, cpuChoice) => {
    if (playerChoice === cpuChoice) {
        return 'empate';
    }
    if (
        (playerChoice === 'pedra' && cpuChoice === 'tesoura') ||
        (playerChoice === 'papel' && cpuChoice === 'pedra') ||
        (playerChoice === 'tesoura' && cpuChoice === 'papel')
    ) {
        return 'Jogador';
    }
    return 'CPU';
};

const updateRpsStatus = (message, color = 'white', subMessage = '') => {
    rpsResult.textContent = message;
    rpsResult.style.color = color;
    rpsResult.style.textShadow = 'none';

    if (subMessage) {
        // Usamos innerHTML para renderizar as tags <br> e <span>
        rpsResult.innerHTML = `${message}<br><span style="font-size: 0.9em; color: #ddd; font-weight: normal;">${subMessage}</span>`;
    }
};

const playRound = (event) => {
    const playerChoice = event.currentTarget.getAttribute('data-choice');
    const cpuChoice = getCpuChoice();
    const winner = determineWinner(playerChoice, cpuChoice);

    const subMessage = `Você jogou ${playerChoice.toUpperCase()} e a CPU jogou ${cpuChoice.toUpperCase()}.`;
    let resultMessage = '';
    let resultColor = 'white';

    if (winner === 'Jogador') {
        playerScore++;
        playerScoreSpan.textContent = playerScore;
        resultMessage = 'Você Venceu!';
        resultColor = 'var(--color-win)';
    } else if (winner === 'CPU') {
        cpuScore++;
        cpuScoreSpan.textContent = cpuScore;
        resultMessage = 'A CPU Venceu!';
        // Usando a cor branca para derrota, mas você pode adicionar uma --color-lose no seu CSS
        resultColor = 'white';
    } else {
        resultMessage = 'Empate!';
    }

    updateRpsStatus(resultMessage, resultColor, subMessage);
    // A API de conselhos será chamada por cima da mensagem de status
    fetchAdvice(rpsResult, resultMessage);
};

const resetRPS = () => {
    playerScore = 0;
    cpuScore = 0;
    playerScoreSpan.textContent = '0';
    cpuScoreSpan.textContent = '0';
    updateRpsStatus('Faça sua jogada!', 'white');
};

// --- Adiciona os event listeners uma única vez ---
rpsChoices.forEach(button => button.addEventListener('click', playRound));
rpsResetBtn.addEventListener('click', resetRPS);

// LÓGICA DE NAVEGAÇÃO ENTRE JOGOS
navBtns.forEach(button => {
    button.addEventListener('click', () =>{
        const isTicTacToe = button.id.includes('tictactoe');
        const gameToShow = isTicTacToe ? tictactoeSection : rpsSection;
        const gameToHide = isTicTacToe ? rpsSection : tictactoeSection;

        // Constrole do estado de navegação
        gameToShow.classList.remove('hidden');
        gameToHide.classList.add('hidden');

        navBtns.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        // Limpa mensagens de status ao trocar de jogo
        updateTictactoeStatus(`Vez do ${currentPlayer}`);
        updateRpsStatus('Faça sua jogada!');
    });
});