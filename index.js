let Player = function(name, marker) {
  let score = 0;
  let showScore = () => {
    return score
  };
  let winGame = () => {
    score++
  };
  let playerName = name;
  let playerMarker = marker;
  let showName = () => {
    return playerName
  };
  let showMarker = () => {
    return playerMarker
  };
  return {
    showScore,
    winGame,
    showName,
    showMarker
  };
}
let player1 = Player('Yegor', 'X');
let player2 = Player('Maayan', 'O');

let displayController = function() {
  let board = document.querySelector(".gameboard")
  let scores = document.querySelector(".scoreboard")
  let turnIndicator = document.querySelector(".turnIndicator")
  let createNewBoard = () => {
    while (board.firstChild) {
      board.removeChild(board.firstChild)
    }
    for (let i = 0; i < 9; i++) {
      let newCell = document.createElement('div');
      newCell.classList.add('gameCell')
      newCell.id = i
      board.appendChild(newCell)
    }
  };
 
  let displayScores = () => {
    scores.children[1].textContent = player1.showScore();
    scores.children[3].textContent = player2.showScore();
  }
  let render = (gameboard) => {
    let cells = board.children;
    for (let i = 0; i < cells.length; i++) {
      cells[i].innerText = gameboard[i];
    }
  }
  let congratulateWinner = (winnerName) => {
    turnIndicator.innerText = 'The game is over, ' + winnerName + ' has won! Congratulations!!!'
  }

  return {
    createNewBoard,
     displayScores,
    render,
    congratulateWinner
  }
}()



let gameController = function() {
  let activePlayer;
  let gameboard = ['', '', '', '', '', '', '', '', ''];
  let board = document.querySelector(".gameboard")
 let addListeners = () => {
        let cells = board.children;
    board.addEventListener('click', play)
    let newGameBtn = document.querySelector(".newgame");
    newGameBtn.addEventListener('click', () => {
      gameController.newGame()
    });
  };
  let newGame = function() {
    gameboard = ['', '', '', '', '', '', '', '', ''];
    displayController.createNewBoard()
    addListeners();
    displayController.displayScores()
    activePlayer = player1;
  };
   let winGame = () => {
    activePlayer.winGame()
    board.removeEventListener('click', play)
    displayController.congratulateWinner(activePlayer.showName())
  }
  let checkEndGame = (gameboard) => {
    let topRow = gameboard[0] + gameboard[1] + gameboard[2];
    let middleRow = gameboard[3] + gameboard[4] + gameboard[5];
    let bottomRow = gameboard[6] + gameboard[7] + gameboard[8];
    let leftColumn = gameboard[0] + gameboard[3] + gameboard[6];
    let middleColumn = gameboard[1] + gameboard[4] + gameboard[7];
    let rightColumn = gameboard[2] + gameboard[5] + gameboard[8];
    let leftDiagonal = gameboard[0] + gameboard[4] + gameboard[8];
    let rightDiagonal = gameboard[2] + gameboard[4] + gameboard[6];
    let winStreak = activePlayer.showMarker().repeat(3);
    if ((winStreak == topRow) || (winStreak == middleRow) || (winStreak == bottomRow) || (winStreak == leftColumn) || (winStreak == middleColumn) || (winStreak == rightColumn) || (winStreak == leftDiagonal) || (winStreak == rightDiagonal)) {
      winGame()
    }
  }
 
  let play = (event) => {
    if (gameboard[event.target.id] == '') {
      gameboard[event.target.id] = activePlayer.showMarker()

      console.log(event.target.id)
      displayController.render(gameboard)
    }
    checkEndGame(gameboard);
    activePlayer = (activePlayer.showName() == player1.showName()) ? player2 : player1
  }


  newGame()
  return {
    play,
    newGame
  }
}();
