$(() => {

  // Creates the 10x10 board grids
  const div = '<div class="board1"></div>';
  const div2 = '<div class="board2"></div>';
  const $boardOne = $('.boardOne');
  const $boardTwo = $('.boardTwo');
  const allCells = 100;

  for (var i = 0; i < allCells; i++) {
    $boardOne.append($(div));
    $boardTwo.append($(div2));
  }

  // Create instructions toggle
  // const $instructionsButton = $('.instructions-button');
  const $instructions = $('.instructions');
  $instructions.hide();
  // let playing = 1;

  // $instructionsButton.on('click', () => {
  //   if (playing === 1) {
  //     $boardOne.toggle();
  //     $boardTwo.toggle();
  //     $instructions.toggle();
  //     $playButton.prop('disabled', true);
  //   } else if (playing === 2) {
  //     $boardOne.toggle();
  //     $boardTwo.toggle();
  //     $assign.toggle();
  //     $instructions.toggle();
  //   } else if (playing === 3) {
  //     $boardOne.toggle();
  //     $boardTwo.toggle();
  //     $alertPlayer.toggle();
  //     $instructions.toggle();
  //   } else {
  //     $result.toggle();
  //     $instructions.toggle();
  //   }
  // });

  // Creates an object and array of battleships
  const boats = {'Carrier': 5, 'Battleship': 4, 'Submarine': 3, 'Cruiser': 3, 'Destroyer': 2};
  const boatsArray = [5,4,3,3,2];

  // Create function that randomly assigns where battleship should be in an array
  const $board1 = $('.board1');
  const $board2 = $('.board2');
  const width = 10;
  let cellIndex = null;
  let $cellsBoard = $('.board1');
  let orientation = 'x';
  let computer = true;
  const $assign = $('.assign');
  $assign.hide();

  function changeBoard() {
    if($cellsBoard.hasClass('board2')) {
      return $cellsBoard = $('.board1');
    } else {
      return $cellsBoard = $('.board2');
    }
  }

  function randomNumber() {
    return cellIndex = Math.floor(Math.random() * $cellsBoard.length);
  }

  // Function on click of rotate changes orientation
  const $rotate = $('.rotate');
  const $spanOrientation = $('span');
  $rotate.on('click', () => {
    if (orientation === 'x') {
      orientation = 'y';
      $spanOrientation.html('vertical');
    } else {
      orientation = 'x';
      $spanOrientation.html('horizontal');
    }
  });

  // Function that links to what option is in the selection box

  const $select = $('select');
  let selection = null;
  const $alertPlayer = $('.alert-player');
  $alertPlayer.hide();

  function tryAgain() {
    $alertPlayer.fadeIn();
    $assign.hide();
    setTimeout(function() {
      $alertPlayer.hide();
      $assign.show();
    }, 1000);
  }

  function hideAssignShips() {
    const $shipsOnBoard = $('.board1.ship');
    if ($shipsOnBoard.length === 17) {
      $assign.hide();
      $alertPlayer.text('Start Game !');
      $alertPlayer.show();
      // playing = 3;
    }
  }

  $board1.on('click', (e) => {
    selection = $select.val();
    const length = boats[selection];
    const cellIndex = $board1.index($(e.target));
    placeShips(length, orientation, cellIndex);
  });

  function placeShips(length, orientation, cellIndex) {
    if (computer) {
      orientation = parseInt(Math.random() * 2) === 0 ? 'x' : 'y';
      cellIndex = Math.floor(Math.random() * $cellsBoard.length);
    }
    const $cell = $cellsBoard.eq(cellIndex);

    if ($cell.hasClass('ship')) {
      if (computer) {
        return placeShips(length, orientation, cellIndex);
      } else {
        tryAgain();
        return false;
      }
    }

    let canPlaceShip = false;
    let $shipsCells = null;

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
    }
  }

  // Create a click function that initiates boards and the game.

  const $result = $('.result');
  $result.hide();
  const $playButton = $('.play-button');

  function clearClasses() {
    for (var i = 0; i < allCells; i++) {
      $board1.attr('class', 'board1');
      $board2.attr('class', 'board2');
    }
  }
  // Function for .on click Play Game
  $playButton.on('click', () => {
    // playing = 2;
    $alertPlayer.hide();
    $assign.show();
    changeBoard();
    computer = true;
    clearClasses();
    $boardOne.show();
    $boardTwo.show();
    $result.hide();
    boatsArray.forEach((length, orientation, cellIndex) => placeShips(length, orientation, cellIndex));
    changeBoard();
    computer = false;
    $('option').prop('disabled', false);
    $('option:selected').prop('disabled', true);
    $playButton.html('Play Again ?');
  });

  // Assign a 'miss'/'hit' background-color/X to the tile that has been clicked
  $board2.on('click', (e) => {
    const clicked = $(e.target);
    if (clicked.hasClass('ship')) {
      clicked.addClass('hit');
      $alertPlayer.text('Hit !');
      computersGo();
    } else {
      clicked.addClass('miss');
      $alertPlayer.text('Miss !');
      computersGo();
    }
  });

  // create a function that when you click on the board the computer also randomly clicks on the other board, and follow the same hit or miss principles
  let x;
  let y;
  let coordObj;
  let attackMode = false;
  let hitX = 1;
  let hitY = 1;

  function makeCoords() {
    coordObj = {};
    for (i = 0; i < allCells; i++) {
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
  makeCoords();

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
        // console.log(hitX);
        hitY = coordObj[cellIndex][1];
        // console.log(hitY);
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

  // check if you sunk a whole ship every time someone clicks

  let countPlayer;
  let countComp;

  function add(a, b) {
    return a + b;
  }

  function winLoseCheck() {
    countPlayer = $('.board2.hit').length;
    countComp = $('.board1.hit').length;
    for (i = 0; i < $board2.length; i++) {
      if (countPlayer === boatsArray.reduce(add, 0)) {
        $boardOne.hide();
        $boardTwo.hide();
        $alertPlayer.hide();
        $result.html(`YOU SUNK MY BATTLESHIPS!`);
        $result.show();
        // playing = 4;
        $assign.hide();
      }
      if (countComp === boatsArray.reduce(add, 0)) {
        $boardOne.hide();
        $boardTwo.hide();
        $alertPlayer.hide();
        $result.html(`I SUNK YOUR BATTLESHIPS!`);
        $result.show();
        // playing = 4;
        $assign.hide();
      }
    }
  }

  // Function to shuffle an array.
  function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
  // While there remain elements to shuffle...
    while (0 !== currentIndex) {
    // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  // attackGo function checks cells around the hit randomly

  let newCell = null;
  const changeIndexObj = {'north': - width, 'east': 1, 'south': width, 'west': - 1};
  const moves = ['north', 'east', 'south', 'west'];

  function attackGo() {
    shuffle(moves);
    const coordCheckObj = {'north': hitY - 1 > 0, 'east': hitX + 1 <= width, 'south': hitY + 1 <= width, 'west': hitX - 1 > 0};
    let successfulMove = false;

    for (let i = 0; i < Object.keys(coordCheckObj).length; i++) {

      if (coordCheckObj[moves[i]]) {
        newCell = $board1.eq(cellIndex + changeIndexObj[moves[i]]);
        console.log(newCell);

        if (newCell.hasClass('ship')) {
          newCell.removeClass('ship');
          newCell.addClass('hit');
          successfulMove = true;
          cellIndex = cellIndex + changeIndexObj[moves[i]];
          hitX = coordObj[cellIndex][0];
          hitY = coordObj[cellIndex][1];
          break;
        } else if (newCell.hasClass('hit') || newCell.hasClass('miss')) {
          console.log('square was hit already or missed already');
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




  //   if (hitX + 1 <= width) {
  //     newCell = $board1.eq(cellIndex + 1);
  //     console.log(newCell);
  //     if (hasShip) {
  //       removeShip;
  //       addHit;
  //     } else if (hasHit) {
  //       leftMove();
  //     } else if (hasMiss) {
  //       leftMove();
  //     } else {
  //       addMiss;
  //       move = 2;
  //     }
  //   } else {
  //     leftMove();
  //   }
  //
  // function leftMove() {
  //   if (hitX - 1 > 0) {
  //     newCell = $board1.eq(cellIndex - 1);
  //     console.log(newCell);
  //     if (hasShip) {
  //       removeShip;
  //       addHit;
  //     } else if (hasHit) {
  //       downMove();
  //     } else if (hasMiss) {
  //       downMove();
  //     } else {
  //       addMiss;
  //       move = 3;
  //     }
  //   } else {
  //     downMove();
  //   }
  // }
  //
  // function downMove() {
  //   if (hitY + 1 <= width) {
  //     newCell = $board1.eq(cellIndex + width);
  //     console.log(newCell);
  //     if (hasShip) {
  //       removeShip;
  //       addHit;
  //     } else if (hasHit) {
  //       upMove();
  //     } else if (hasMiss) {
  //       upMove();
  //     } else {
  //       addMiss;
  //       move = 4;
  //     }
  //   } else {
  //     upMove();
  //   }
  // }
  //
  // function upMove() {
  //   if (hitY - 1 > 0) {
  //     newCell = $board1.eq(cellIndex - width);
  //     console.log(newCell);
  //     if (hasShip) {
  //       removeShip;
  //       addHit;
  //       move = 1;
  //     } else if (hasHit) {
  //       attackMode = false;
  //       computersGo();
  //     } else if (hasMiss) {
  //       attackMode = false;
  //       move = 1;
  //       computersGo();
  //     } else {
  //       addMiss;
  //       move = 1;
  //       attackMode = false;
  //     }
  //   } else {
  //     attackMode = false;
  //     move = 1;
  //     computersGo();
  //   }
  // }

  // create an animation for when you hit a ship

  // write instructions

  // create tally

  // create a function to add your own battleships to the grid.

  // make it look pretty

});
