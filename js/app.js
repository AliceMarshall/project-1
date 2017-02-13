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

  // Create an object of battleships
  const boatsArray = [5,4,3,3,2];
  console.log(boatsArray);

  // Create function that randomly assigns where battleship should be in an array
  const $board1 = $('.board1');
  console.log($board1);
  const $board2 = $('.board2');
  const width = 10;
  let cellIndex = null;
  let $board = $('.board1');
  console.log($board);
  let orientation = '';
  //
  // function chooseBoard() {
  //   if ($board === $('.board1')) {
  //     $board = $('.board2');
  //   } else {
  //     $board = $('.board1');
  //   }
  // }

  function randomNumber() {
    return cellIndex = Math.floor(Math.random() * $board.length);
  }

  // function decideOrientation() {
  //   orientation = parseInt(Math.random() * 2) === 0 ? 'x' : 'y';
  //   console.log(orientation);
  // }

  function placeShips(length) {
    orientation = parseInt(Math.random() * 2) === 0 ? 'x' : 'y';
    cellIndex = Math.floor(Math.random() * $board.length);
    const $cell = $board.eq(cellIndex);

    if ($cell.hasClass('ship')) {
      return placeShips(length);
    }

    let canPlaceShip = false;
    let $shipsCells = null;

    if (orientation === 'x') {
      if ((cellIndex + length - 1) % width < length - 1) {
        return placeShips(length);
      }

      $shipsCells = $board.slice(cellIndex, cellIndex + length);
    } else {
      const cellIndices = [];
      for (let i = 0; i < length; i++) {
        cellIndices.push(cellIndex + (i * width));
      }

      if (cellIndices[cellIndices.length - 1] > (allCells - 1)) {
        return placeShips(length);
      }

      $shipsCells = $board.filter((i) => {
        return cellIndices.includes(i);
      });
    }

    canPlaceShip = $shipsCells.toArray().every((cell) => {
      console.log($(cell), $(cell).hasClass('occupied'));
      return !$(cell).hasClass('occupied');
    });

    if (!canPlaceShip) {
      return placeShips(length);
    }
    $shipsCells.addClass('occupied').text(length);
  }

  // Assign a 'miss'/'hit' background-color/X to the tile that has been clicked
  $board2.on('click', (e) => {
    const clicked = $(e.target);
    if (clicked.hasClass('ship')) {
      clicked.addClass('hit');
      computersGo();
    } else {
      clicked.addClass('miss');
      computersGo();
    }
  });

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


  $playButton.on('click', () => {
    clearClasses();
    $boardOne.show();
    $boardTwo.show();
    $result.hide();
    boatsArray.forEach((length) => placeShips(length));
    $playButton.html('Play Again ?');
  });

  // Create function that checks if whole battleship has the background-color/X if yes, change all background-color to black


  // create a function that when you click on the board the computer also randomly clicks on the other board, and follow the same hit or miss principles
  let x;
  let y;
  let coordObj;
  // let attackMode = false;
  // let hitX = 1;
  // let hitY = 1;
  // let index;
  // let hitIndex;

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
    if (gameBoard.hasClass('ship')) {
      gameBoard.removeClass('ship');
      gameBoard.addClass('hit');
      // attackMode = true;
      // hitX = coordObj[num][0];
      // console.log(hitX);
      // hitY = coordObj[num][1];
      // console.log(hitY);
      // hitIndex = num;
    } else if (gameBoard.hasClass('hit')) {
      computersGo();
    } else if (gameBoard.hasClass('miss')) {
      computersGo();
    } else {
      gameBoard.addClass('miss');
    }
    winLoseCheck();
  }

  // inside function above it also needs to be smart and when a hit is made it checks all squares adjacent

  // let move = 1;
  // const ind1 = hitIndex + 1;
  // const index1 = $board1.eq(ind1);
  // const index2 = $board1.eq(index - 1);
  // const index3 = $board1.eq(index + width);
  // const index4 = $board1.eq(index - width);
  //
  //
  // function attackGo() {
  //   if (move === 1) {
  //     rightMove();
  //   } else if (move === 2) {
  //     leftMove();
  //   } else if (move === 3) {
  //     downMove();
  //   } else if (move === 4) {
  //     upMove();
  //   } else {
  //     attackMode = true;
  //     computersGo();
  //   }
  // }
  //
  // function rightMove() {
  //   if (hitX + 1 <= width) {
  //     console.log(index1);
  //     if (index1.hasClass('ship')) {
  //       index1.removeClass('ship');
  //       index1.addClass('hit');
  //     } else if (index1.hasClass('hit')) {
  //       leftMove();
  //     } else if (index1.hasClass('miss')) {
  //       leftMove();
  //     } else {
  //       index1.addClass('miss');
  //       move = 2;
  //     }
  //   } else {
  //     leftMove();
  //   }
  // }
  //
  // function leftMove() {
  //   if (hitX - 1 > 0) {
  //     if (index2.hasClass('ship')) {
  //       index2.removeClass('ship');
  //       index2.addClass('hit');
  //     } else if (index2.hasClass('hit')) {
  //       downMove();
  //     } else if (index2.hasClass('miss')) {
  //       downMove();
  //     } else {
  //       index2.addClass('miss');
  //       move = 3;
  //     }
  //   } else {
  //     downMove();
  //   }
  // }
  //
  // function downMove() {
  //   if (hitY + 1 <= width) {
  //     if (index3.hasClass('ship')) {
  //       index3.removeClass('ship');
  //       index3.addClass('hit');
  //     } else if (index3.hasClass('hit')) {
  //       upMove();
  //     } else if (index3.hasClass('miss')) {
  //       upMove();
  //     } else {
  //       index3.addClass('miss');
  //       move = 4;
  //     }
  //   } else {
  //     upMove();
  //   }
  // }
  //
  // function upMove() {
  //   if (hitY - 1 > 0) {
  //     if (index4.hasClass('ship')) {
  //       index4.removeClass('ship');
  //       index4.addClass('hit');
  //       move = 1;
  //     } else if (index4.hasClass('hit')) {
  //       attackMode = false;
  //       computersGo();
  //     } else if (index4.hasClass('miss')) {
  //       attackMode = false;
  //       move = 1;
  //       computersGo();
  //     } else {
  //       index4.addClass('miss');
  //       move = 1;
  //       attackMode = false;
  //     }
  //   } else {
  //     attackMode = false;
  //     move = 1;
  //     computersGo();
  //   }
  // }







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
        $result.html(`YOU SUNK MY BATTLESHIPS!`);
        $result.show();
      }
      if (countComp === boatsArray.reduce(add, 0)) {
        $boardOne.hide();
        $boardTwo.hide();
        $result.html(`I SUNK YOUR BATTLESHIPS!`);
        $result.show();
      }
    }
  }

  // create an animation for when you hit a ship

  // write instructions

  // create tally

  // change to play game to reset after first click.

  // create a function to add your own battleships to the grid.

  // make it look pretty

});
