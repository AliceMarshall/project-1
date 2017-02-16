
//   ----- CONSTANT -- VARIABLES -----

const width = 10;       // width of the each board
const coordObj = {};    // calculates the coordinates of the boards - used in makeCoords function
// Constants for creating divs/cells within the boards
const div = '<div class="board1"></div>';
const div2 = '<div class="board2"></div>';
const allCells = 100;
// Object and arrays of battleships used in placing ships, hit/miss ships, and result arrays
const boats = {'Carrier': 5, 'Battleship': 4, 'Submarine': 3, 'Cruiser': 3, 'Destroyer': 2};
const boatsArray = [5,4,3,3,2];
const imgArray = ['images/hitler.jpg', 'images/kim.jpg', 'images/Saddam.jpg', 'images/stalin.jpg', 'images/mugabe.jpg'];
const resultArray = ['Adolf Hitler', 'Kim Il Sung', 'Saddam Hussein', 'Joesph Stalin', 'Robert Mugabe'];
// Object and array used for the attackGo function - Computer AI
const changeIndexObj = {'north': - width, 'east': 1, 'south': width, 'west': - 1};
const moves = ['north', 'east', 'south', 'west'];

//   ----- VARIABLES -----

let cellIndex = null;   // the index of the cell clicked
let orientation = 'x';  // initial orientation of ship being placed
let computer = true;    // computer set to true when placing the ships on the computers board false when placing players ships
let selection = null;   // the selected value of the form select set to null - used in $board1.on('click') function
let shipPositions = []; // shipPositions gets filled with the arrays on the ship's postions on the computers board.
let x;                  // the horizontal variable
let y;                  // the vertical variable
let attackMode = false; // attackMode is set to false until the computer finds a hit, then set to true.
let hitX = 1;           // is the x coordinate of cell that has a hit in computers turn
let hitY = 1;           // the y coordinate of cell that has a hit in computers turn
let hitIndex;           // the index of the cell that was hit within the board array
let newCell = null;     // the cell that was found in attackGo.
let countPlayer;        // the number of hits on board2
let countComp;          // the number of hits on board1

//   ---- FUNCTION ---

// check if you sunk a whole ship every time someone clicks - used in winLoseCheck
function add(a, b) {
  return a + b;
}

$(() => {
  //   ---- CONSTANT -- VARIABLES ----

  // Creates the 10x10 board grids
  const $boardOne = $('.boardOne');   // the div with class boardOne
  const $boardTwo = $('.boardTwo');   // the div with class boardTwo
  const $dictatorImg = $('#dictator');
//
  const $select = $('select');
  const $alertPlayer = $('.alert-player');
//
  const $midResult = $('.mid-result');
  // constants used in on click function $rotate
  const $rotate = $('.rotate');
  const $spanOrientation = $('span');
  //
  const $result = $('.result');
  const $playButton = $('.play-button');

  //   ---- ON LOAD FUNCTIONS ----

  // function to create board cells
  function createBoardCells() {
    for (let i = 0; i < allCells; i++) {
      $boardOne.append($(div));
      $boardTwo.append($(div2));
    }
  }

  // function to create coordinates for the boards to be used in attackMode = true and attackGo function
  function makeCoords() {
    for (let i = 0; i < allCells; i++) {
      if (i % width === 0) {
        x = (i % width) + 1;
        y = (i / 10) + 1;
        coordObj[i] = [x,y];
      } else if (i % width === 1 || i % width === 2 || i % width === 3 || i % width === 4 || i % width === 5 || i % width === 6 || i % width === 7 || i % width === 8 || i % width === 9) {
        x = (i % width) + 1;
        y = Math.ceil(i / 10);
        coordObj[i] = [x,y];
      }
    }
  }
  createBoardCells();
  makeCoords();

  //   ---- VARIABLES ----
  let $cellsBoard = $('.board1');
  let canPlaceShip = false;
  let $shipsCells = null;

  //   ---- CONSTANTS ----
  // board/assign div constants
  const $board1 = $('.board1');
  const $board2 = $('.board2');
  const $assign = $('.assign');
  const $cell = $cellsBoard.eq(cellIndex);

  //   ---- HIDE ON LOAD ----
  $assign.hide();
  $alertPlayer.hide();    // div that alerts player if the ship cannot be placed, if they make a hit or a miss.
  $result.hide();

  //   ---- FUNCTIONS ----
  // function to change which board is having ships placed on it - used in $playGame function
  function changeBoard() {
    if($cellsBoard.hasClass('board2')) {
      return $cellsBoard = $('.board1');
    } else {
      return $cellsBoard = $('.board2');
    }
  }

  // function that produces random number depending on the boards length - used in ComputerGo function
  function randomNumber() {
    return cellIndex = Math.floor(Math.random() * $cellsBoard.length);
  }

  // function $rotate to change orientation,
  function rotation() {
    if (orientation === 'x') {
      orientation = 'y';
      $spanOrientation.html('vertical');
    } else {
      orientation = 'x';
      $spanOrientation.html('horizontal');
    }
  }

  // function set $alertplayer to hidden unless the criteria are met
  function tryAgain() {
    $alertPlayer.fadeIn();
    $assign.hide();
    setTimeout(function() {
      $alertPlayer.hide();
      $assign.show();
    }, 1000);
  }

  // function to hide assignment of ships and initiate the player to click on the computers board.
  function hideAssignShips() {
    const $shipsOnBoard = $('.board1.ship');
    if ($shipsOnBoard.length === 17) {
      $assign.hide();
      $alertPlayer.text('Start Game !');
      $alertPlayer.show();
      $board2.on('click', playerPlays);
    }
  }

  // function used on click for the player to decide where to place their ships.
  function playerPlacesShips(e) {
    selection = $select.val();
    console.log(selection);
    const length = boats[selection];
    const cellIndex = $board1.index($(e.target));
    placeShips(length, orientation, cellIndex);
  }


  function placeShips(length, orientation, cellIndex) {
    if (computer) {
      orientation = parseInt(Math.random() * 2) === 0 ? 'x' : 'y';
      cellIndex = Math.floor(Math.random() * $cellsBoard.length);
    }
    if ($cell.hasClass('ship')) {
      if (computer) {
        return placeShips(length, orientation, cellIndex);
      } else {
        tryAgain();
        return false;
      }
    }
    if (orientation === 'x') {
      if ((cellIndex + length - 1) % width < length - 1) {
        if (computer) {
          return placeShips(length, orientation, cellIndex);
        } else {
          tryAgain();
          return false;
        }
      }
      $shipsCells = $cellsBoard.slice(cellIndex, cellIndex + length);
    } else {
      const cellIndices = [];
      for (let i = 0; i < length; i++) {
        cellIndices.push(cellIndex + (i * width));
      }
      if (cellIndices[cellIndices.length - 1] > (allCells - 1)) {
        if (computer) {
          return placeShips(length, orientation, cellIndex);
        } else {
          tryAgain();
          return false;
        }
      }
      $shipsCells = $cellsBoard.filter((i) => {
        return cellIndices.includes(i);
      });
    }
    canPlaceShip = $shipsCells.toArray().every((cell) => {
      return !$(cell).hasClass('ship');
    });
    if (!canPlaceShip) {
      if (computer) {
        return placeShips(length, orientation, cellIndex);
      } else {
        tryAgain();
        return false;
      }
    }
    $shipsCells.addClass('ship');
    if (!computer) {
      $('option:selected').prop('disabled', true);
      $('option').eq(0).prop('selected', true);
      hideAssignShips();
    } else {
      shipPositions.push($shipsCells.toArray().map((cell) => {
        return $(cell).index();
      }));
    }
  }

  // function to clears classes
  function clearClasses() {
    for (var i = 0; i < allCells; i++) {
      $board1.attr('class', 'board1');
      $board2.attr('class', 'board2');
    }
  }

  // Function for .on click Play Game
  function playGame() {
    shipPositions = [];
    $alertPlayer.hide();
    $assign.show();
    changeBoard();
    computer = true;
    clearClasses();
    $boardOne.show();
    $boardTwo.show();
    $result.hide();
    boatsArray.forEach((length, orientation, cellIndex) => placeShips(length, orientation, cellIndex));
    console.log('shipPositions', shipPositions);
    changeBoard();
    computer = false;
    $('option').prop('disabled', false);
    $('option:selected').prop('disabled', true);
    $playButton.html('Play Again ?');
    $board2.off('click');
    $alertPlayer.text('Try Again');
  }

  // Assign a 'miss'/'hit' background-color to the tile that has been clicked and runs computersGo
  function playerPlays(e) {
    const clicked = $(e.target);
    if(clicked.hasClass('hit') || clicked.hasClass('miss')) return false;
    if (clicked.hasClass('ship')) {
      clicked.addClass('hit');
      $alertPlayer.text('Hit !');
      computersGo();
    } else {
      clicked.addClass('miss');
      $alertPlayer.text('Miss !');
      computersGo();
    }
    hitAShip();
  }

  // function for computer to have a turn clicking on the players board. Runs winLoseCheck function to check if someone has won.
  function computersGo() {
    randomNumber();
    const gameBoard = $board1.eq(cellIndex);
    if (attackMode) {
      attackGo();
    } else {
      if (gameBoard.hasClass('ship')) {
        gameBoard.removeClass('ship');
        gameBoard.addClass('hit');
        attackMode = true;
        hitX = coordObj[cellIndex][0];
        hitY = coordObj[cellIndex][1];
        hitIndex = cellIndex;
      } else if (gameBoard.hasClass('hit')) {
        computersGo();
      } else if (gameBoard.hasClass('miss')) {
        computersGo();
      } else {
        gameBoard.addClass('miss');
      }
    }
    winLoseCheck();
  }

  // function that shuffles arrays - used in attackGo
  function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  // function that will randomly pick N/E/S/W cell in their next turn, if second hit will run stay in attack mode.
  function attackGo() {
    shuffle(moves);
    const coordCheckObj = {'north': hitY - 1 > 0, 'east': hitX + 1 <= width, 'south': hitY + 1 <= width, 'west': hitX - 1 > 0};
    let successfulMove = false;
    for (let i = 0; i < Object.keys(coordCheckObj).length; i++) {
      if (coordCheckObj[moves[i]]) {
        newCell = $board1.eq(hitIndex + changeIndexObj[moves[i]]);
        if (newCell.hasClass('ship')) {
          newCell.removeClass('ship');
          newCell.addClass('hit');
          successfulMove = true;
          break;
        } else if (newCell.hasClass('hit') || newCell.hasClass('miss')) {
          continue;
        } else {
          newCell.addClass('miss');
          successfulMove = true;
          attackMode = false;
          break;
        }
      }
    }
    if (!successfulMove) {
      attackMode = false;
      computersGo();
    }
  }

  // function that checks if a single ship has been hit.
  function hitAShip() {
    // let shipHit = 0;
    for (let i = 0; i < shipPositions.length; i++) {
      for (let j = 0; j < shipPositions[i].length; j++) {
        if ($board2.eq(shipPositions[i][j]).hasClass('hit')) {
          shipPositions[i].splice(j, 1);
          if (shipPositions[i].length === 0) {
            $midResult.text(`You sunk ${resultArray[i]}'s DictatorShip`);
            $dictatorImg.attr('src', imgArray[i]);
            scrollDown();
          }
        }
      }
    }
  }

  // function to scrollUp and ScrollDown to the result when you destroy a whole ship.
  function scrollUp() {
    $('html, body').animate({ scrollTop: '0%' }, 300);
  }
  function scrollDown() {
    $('html, body').animate({ scrollTop: '1000%' }, 300);
    setTimeout(scrollUp, 2000);
  }

  // function to hide whats on screen and shows final result.
  function hideBoardShowResult() {
    $boardOne.hide();
    $boardTwo.hide();
    $alertPlayer.hide();
    $result.show();
    $assign.hide();
  }

  // function to check if countPlayer/countComp have all ships hit
  function winnerResult() {
    if (countPlayer === boatsArray.reduce(add, 0)) {
      hideBoardShowResult();
      $result.html(`You sunk the DictatorShips!`);
    }
    if (countComp === boatsArray.reduce(add, 0)) {
      hideBoardShowResult();
      $result.html(`I sunk the DictatorShips!`);
    }
  }

  // function to check if all ships have been hit
  function winLoseCheck() {
    countPlayer = $('.board2.hit').length;
    countComp = $('.board1.hit').length;
    for (let i = 0; i < $board2.length; i++) {
      winnerResult();
    }
  }

  $rotate.on('click', rotation);
  $board1.on('click', playerPlacesShips);
  $playButton.on('click', playGame);
});

//to do:
  // - make instructions work
  // - refactor
  // - add namespacing
  // - add sass
  // - write a read me
  // - label all functions
