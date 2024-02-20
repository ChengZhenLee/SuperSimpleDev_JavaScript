// Declare the array that stores all moves made
const moveArray = ['', '', '', '', '', '', '', '', ''];

// Declare a flag to detect turn
let player1Turn;

// Declare the players
let player1;
let player2;

// Capture the HTML elements
const playerButton = document.querySelector('.js-player-button');
const computerButton = document.querySelector('.js-computer-button');
const message = document.querySelector('.js-message');
const resetButton = document.querySelector('.js-reset-button');

// Start a player-vs-player game
playerButton.addEventListener('click', () => {
  renderGame();
});

resetButton.addEventListener('click', resetGame);

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
    let button = document.querySelector(`.js-button-${i}`)
    button.addEventListener('click', () => {
      updateTile(i);
      checkWins();
      checkTie();
    });
  }
}

// Update the Tile when it is clicked
function updateTile(index) {
  let tile = document.querySelector(`.js-${index}`);
  if (player1Turn) {
    moveArray[index] = player1;
    tile.innerHTML = player1;
    player1Turn = false;
  } else {
    moveArray[index] = player2;
    tile.innerHTML = player2;
    player1Turn = true;
  }
  console.log(moveArray);
}

// Resets the game
function resetGame() {
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
}


// Check for Ties
function checkTie() {
    for (let i = 0; i < moveArray.length; i++) {
      if (moveArray[i] === '') {
        return false;
      }
    }
    message.innerHTML = 'Tie!';
}

// Check for any wins
function checkWins() {
  if ((checkColumns() || checkRows() || checkDiagonal()) && !player1Turn) {
    message.innerHTML = "Player 1 Wins!";
    stopGame();
  } else if ((checkColumns() || checkRows() || checkDiagonal()) && player1Turn) {
    message.innerHTML = "Player 2 Wins!";
    stopGame();
  }
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
