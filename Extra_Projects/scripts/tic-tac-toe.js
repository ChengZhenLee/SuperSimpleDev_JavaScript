// Declare the array that stores all moves made
const moveArray = ['', '', '', '', '', '', '', '', ''];

// Declare the scores
score = JSON.parse(localStorage.getItem('score')) || {ties: 0, player1: 0, player2: 0};

// Declare a flag to detect turn
let player1Turn;
let playWithComputer = 0;

// Declare the players
let player1;
let player2;

// Capture the HTML elements
const playerButton = document.querySelector('.js-player-button');
const computerButton = document.querySelector('.js-computer-button');
const message = document.querySelector('.js-message');
const resetButton = document.querySelector('.js-reset-button');
const scoreBoard = document.querySelector('.js-score');
const resetScoreButton = document.querySelector('.js-reset-score');

// Start a player-vs-player game
playerButton.addEventListener('click', () => {
  renderGame();
});

computerButton.addEventListener('click', () => {
  playWithComputer = 1;
  renderGame();
})

// Resets the game
resetButton.addEventListener('click', resetGame);

// Resets the score board
resetScoreButton.addEventListener('click', () => {
  score.ties = 0;
  score.player1 = 0;
  score.player2 = 0;
  localStorage.removeItem('score');
  renderScoreBoard();
})

// Renders the score board upon loading the page
renderScoreBoard();

// Picks a random symbol for the first and second player
function pickRandomSymbol() {
  const randomNum = Math.random();

  if (randomNum < 0.5) {
    player1 = 'X';
    player2 = 'O';
  } else {
    player1 = 'O';
    player2 = 'X';
  }
}



// Render each tiles
function renderGame() {
  pickRandomSymbol();
  player1Turn = true;
  playerButton.disabled = true;
  computerButton.disabled = true;

  for (let i = 0; i < 9; i++) {
    let tile = document.querySelector(`.js-${i}`);
    tile.innerHTML = `
    <button class="js-button-${i} select-button"></button>
    `;
    let button = document.querySelector(`.js-button-${i}`);
    button.addEventListener('click', () => {
      updateTile(i);
      checkWins();
      checkTie();
    });
  }
}

// Renders the score board
function renderScoreBoard() {
  scoreBoard.innerHTML = `
    Player1: ${score.player1} Player2: ${score.player2} Ties: ${score.ties}
  `;
}

// Update the Tile when it is clicked
function updateTile(index) {
  let tile = document.querySelector(`.js-${index}`);
  if (player1Turn) {
    moveArray[index] = player1;
    tile.innerHTML = player1;
    player1Turn = false;
    saveGameState(index);

    // If playing against computer
    // Allow computer to make move as player2 if not won / lost
    if (playWithComputer === 1 && checkWins() === false && checkTie() === false) {
      computerMakeMove();
      return;
    }
  } else {
    moveArray[index] = player2;
    tile.innerHTML = player2;
    player1Turn = true;
    saveGameState(index);

  } 
}

// Resets the game
function resetGame() {
  gameState = '';
  allGameStates.splice(0);
  computerScore = 0;
  availableMoves = '012345678';
  playWithComputer = 0;
  message.innerHTML = '';

  for (let i = 0; i < moveArray.length; i++) {
      moveArray[i] = '';
      tile = document.querySelector(`.js-${i}`);
      tile.innerHTML = '';
    }
  playerButton.disabled = false;
  computerButton.disabled = false;
}

// Stops the game
function stopGame() {
  for (let i = 0; i < 9; i++) {
    let tile = document.querySelector(`.js-${i}`);
    tile.innerHTML = '';
  }
  evaluateGameStates();
}

// Updates the score
function updateScore(player) {
  score[player]++;
  localStorage.setItem('score', JSON.stringify(score));
  renderScoreBoard();
}

// Check for Ties
function checkTie() {
  for (let i = 0; i < moveArray.length; i++) {
    if (moveArray[i] === '') {
      return false;
    }
  }
  if (checkWins() === false) {
    message.innerHTML = 'Tie!';
    updateScore('ties');
    stopGame();
    return true;
  }
}

// Check for any wins
// returns true if there is a win
function checkWins() {
  if ((checkColumns() || checkRows() || checkDiagonal()) && !player1Turn) {
    message.innerHTML = "Player 1 Wins!";
    computerScore = -5;
    updateScore('player1');
    stopGame();
    return true;
  } else if ((checkColumns() || checkRows() || checkDiagonal()) && player1Turn) {
    message.innerHTML = "Player 2 Wins!";
    computerScore = 10;
    updateScore('player2');
    stopGame();
    return true;
  }
  return false;
}

// Check for wins on the columns
function checkColumns() {
  for (let i = 0; i < 3; i++) {
    if (moveArray[i] === moveArray[i + 3] && moveArray[i] === moveArray[i + 6] && moveArray[i] != '') {
      return true;
    }
  }
  return false;
}

// Check for wins on the rows
function checkRows() {
  for (let i = 0; i < 7; i += 3) {
    if (moveArray[i] === moveArray[i + 1] && moveArray[i] === moveArray[i + 2] && moveArray[i] != '') {
      return true;
    }
  }
  return false;
}

// Check for wins on the diagonals
function checkDiagonal() {
  if (moveArray[0] === moveArray[4] && moveArray[0] === moveArray[8] && moveArray[0] != '') {
    return true;
  } else if (moveArray[2] === moveArray[4] && moveArray[2] === moveArray[6] && moveArray[2] != '') {
    return true;
  }
  return false;
}


// Code for computer AI

// Get the HTML Element to reset the computer
const computerReset = document.querySelector('.js-reset-computer');

// Declare the result at the end of the current game
// Tie: 0, Win: 10, Lose: -5
let computerScore = 0;

// Declare the current available moves
let availableMoves = '012345678';

// Declare the current state of the game
let gameState = '';

// Declare an object of all the states during this game
const allGameStates = [];

// Fetch or Declare all types of games that has been played
const allGames = JSON.parse(localStorage.getItem('allGames')) || [];

// Fetch or Declare all moves and their respective weightings
let moveSetScores = JSON.parse(localStorage.getItem('moveSetScores')) || {};


// Reset the computer
computerReset.addEventListener('click', () => {
  moveSetScores = {};
  localStorage.removeItem('allGames');
  localStorage.removeItem('moveSetScores');
});


// Save the current game state as well as reduce the current availableMoves
function saveGameState(move) {
  gameState = gameState + move;
  allGameStates.push(gameState);
  availableMoves = availableMoves.replace(move, '');
}


// Calculate the weightings of the current game states according to the results at the end of the game
function evaluateGameStates() {

  if (gameRepeated()) {
    return;
  } else {
    allGames.push(allGameStates);
    localStorage.setItem('allGames', JSON.stringify(allGames));
  }

  for (let i = 0; i < allGameStates.length; i++) {
    if (moveSetScores[allGameStates[i]] === undefined) {
      moveSetScores[allGameStates[i]] = computerScore;
    } else {
      moveSetScores[allGameStates[i]] += computerScore;
    }
  }
  localStorage.setItem('moveSetScores', JSON.stringify(moveSetScores));
  gameState = '';
  allGameStates.splice(0);
}


// Check if the game has been repeated before
function gameRepeated() {
  for (let i = 0; i < allGames.length; i++) {
    if (JSON.stringify(allGames[i]) === JSON.stringify(allGameStates)) {
      return true;
    }
  }
  return false;
}

// Decision making system of the computer
function computerChooseMove() {
  let nextMove;
  let topMoves = [];

  // Check if the gameState has already been recorded
  if (moveSetScores[gameState] != undefined) {
    // Get the top scoring next move
    let max = -Infinity;
    for (let i = 0; i < availableMoves.length; i++) {
      let temp = gameState + availableMoves[i];
      // If a move doesn't exist, allow it to be randomly picked by 
      // giving it a number 0
      if (moveSetScores[temp] === undefined) {
        moveSetScores[temp] = 0;
      }
      if (moveSetScores[temp] > max) {
        max = moveSetScores[temp];
        topMoves = [availableMoves[i]]; // Reset topMoves if a new max is found
      } else if (moveSetScores[temp] === max) {
        topMoves.push(availableMoves[i]); // Add to topMoves if score is tied with max
      }
    }

    let randomIndex = Math.floor(Math.random() * topMoves.length);
    nextMove = topMoves[randomIndex];
    return nextMove;
  }

  // Randomly choose one move
  if (nextMove === undefined) {
    let randomIndex = Math.floor(Math.random() * availableMoves.length);
    nextMove = availableMoves[randomIndex];
    return nextMove;
  }
}


// Allows the computer to make a move
function computerMakeMove() {
  let index = +computerChooseMove();
  tile = document.querySelector(`.js-${index}`);
  moveArray[index] = player2;
  tile.innerHTML = player2;
  player1Turn = true;
  saveGameState(index);
}
