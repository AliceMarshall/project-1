$(() => {

  // Creates the 10x10 grids
  const div = '<div class="board1"></div>';
  const div2 = '<div class="board2"></div>';
  const $boardOne = $('.boardOne');
  const $boardTwo = $('.boardTwo');
  const tiles = 100;

  for (var i = 0; i < tiles; i++) {
    $boardOne.append($(div));
    $boardTwo.append($(div2));
  }

  // Create an object of battleships
  // const boats = {'Carrier': 5, 'Battleship': 4, 'Cruiser': 3, 'Submarine': 3, 'Destroyer': 2};
  const boatArray = [5,4,3,3,2];
  console.log(boatArray);


  // Create function that randomly assigns where battleship should be in an array
  const $board1 = $('.board1');
  const $board2 = $('.board2');
  let num;
  let first = true;
  const width = 10;

  function randomNumber() {
    return num = parseInt(Math.random() * $board1.length);
  }

  function direction() {
    // const direction = parseInt(Math.random() * 2);
    const directionArray = [parseInt(Math.random() * 2), parseInt(Math.random() * 2), parseInt(Math.random() * 2), parseInt(Math.random() * 2), parseInt(Math.random() * 2), parseInt(Math.random() * 2), parseInt(Math.random() * 2), parseInt(Math.random() * 2), parseInt(Math.random() * 2), parseInt(Math.random() * 2)];
    console.log(directionArray);
    directionArray[0] === 0 ? assignCarrierX() : assignCarrierY(); // board 1
    if (directionArray[1] === 0) { // board 2
      assignCarrierX();
      first = true;
    } else {
      assignCarrierY();
      first = true;
    }
    directionArray[2] === 0 ? assignBattleshipX() : assignBattleshipY(); // board 1
    if (directionArray[3] === 0) { // board 2
      assignBattleshipX();
      first = true;
    } else {
      assignBattleshipY();
      first = true;
    }
    directionArray[4] === 0 ? assignSubCruiseX() : assignSubCruiseY(); // board 1
    if (directionArray[5] === 0) { // board 2
      assignSubCruiseX();
      first = true;
    } else {
      assignSubCruiseY();
      first = true;
    }
    directionArray[6] === 0 ? assignSubCruiseX() : assignSubCruiseY(); // board 1
    if (directionArray[7] === 0) { // board 2
      assignSubCruiseX();
      first = true;
    } else {
      assignSubCruiseY();
      first = true;
    }
    directionArray[8] === 0 ? assignDestroyerX() : assignDestroyerY(); // board 1
    if (directionArray[9] === 0) { // board 2
      assignDestroyerX();
      first = true;
    } else {
      assignDestroyerY();
      first = true;
    }
  }

  // create variable for either board 1 or board 2
  let tile;
  let tile1x;
  let tile2x;
  let tile3x;
  let tile4x;
  let tile1y;
  let tile2y;
  let tile3y;
  let tile4y;
  let $board;

  function chooseBoard() {
    $board = first ? $board1 : $board2;
    tile = $board.eq(num);
    tile1x = $board.eq(num + 1);
    tile2x = $board.eq(num + 2);
    tile3x = $board.eq(num + 3);
    tile4x = $board.eq(num + 4);
    tile1y = $board.eq(num + width);
    tile2y = $board.eq(num + (width * 2));
    tile3y = $board.eq(num + (width * 3));
    tile4y = $board.eq(num + (width * 4));
  }

  function ship() {
    $board1.hasClass('ship');
  }

  let orientation;

  function decideOrientation() {
    const direction = parseInt(Math.random() * 2);
    if (direction === 0) {
      orientation = 'x';
    } else {
      orientation = 'y';
    }
  }

  function assignCarrier(orientation) {
    decideOrientation();
    randomNumber();
    const checkLeftTileHitEdge = (num + 1) % width;
    chooseBoard();
    if(orientation === 'x') {
      if ($board.splice(num, boatArray[0]).filter(ship).length !== 0) {
        if (checkLeftTileHitEdge === 0 || checkLeftTileHitEdge === width - 1 || checkLeftTileHitEdge === width - 2 || checkLeftTileHitEdge === width - 3) {
          return assignCarrier();
        } else {
          tile.addClass('ship');
          tile1x.addClass('ship');
          tile2x.addClass('ship');
          tile3x.addClass('ship');
          tile4x.addClass('ship');
        }
      } else {
        return assignCarrier();
      }
    } else {
      if ($board.splice(num, boatArray[0]).filter(ship).length !== 0) {
        if (tile1y.length === 0 || tile2y.length === 0 || tile3y.length === 0 || tile4y.length === 0) {
          return assignCarrier();
        } else {
          tile.addClass('ship');
          tile1y.addClass('ship');
          tile2y.addClass('ship');
          tile3y.addClass('ship');
          tile4y.addClass('ship');
        }
      } else {
        return assignCarrier();
      }
    }
  }

  // Function to assign CARRIER HORIZONTALLY
  function assignCarrierX() {
    randomNumber();
    const indexPlus = (num + 1) % width;
    chooseBoard();
    if (!tile.hasClass('ship')) {
      if (indexPlus === 0 || indexPlus === width - 1 || indexPlus === width - 2 || indexPlus === width - 3) {
        return assignCarrierX();
      } else if (!(tile1x.hasClass('ship') || tile2x.hasClass('ship') || tile3x.hasClass('ship') || tile4x.hasClass('ship'))) {
        tile.addClass('ship');
        tile1x.addClass('ship');
        tile2x.addClass('ship');
        tile3x.addClass('ship');
        tile4x.addClass('ship');
        first = false;
      } else {
        return assignCarrierX();
      }
    } else {
      return assignCarrierX();
    }
  }

  // Function to assign CARRIER VERTICALLY
  function assignCarrierY() {
    randomNumber();
    chooseBoard();
    if (!tile.hasClass('ship')) {
      if (tile1y.length === 0 || tile2y.length === 0 || tile3y.length === 0 || tile4y.length === 0) {
        return assignCarrierY();
      } else if (!(tile1y.hasClass('ship') || tile2y.hasClass('ship') || tile3y.hasClass('ship') || tile4y.hasClass('ship'))) {
        tile.addClass('ship');
        tile1y.addClass('ship');
        tile2y.addClass('ship');
        tile3y.addClass('ship');
        tile4y.addClass('ship');
        first = false;
      } else {
        return assignCarrierY();
      }
    } else {
      return assignCarrierY();
    }
  }

  // Function to assign BATTLESHIPS HORIZONTALLY
  function assignBattleshipX() {
    randomNumber();
    const indexPlus = (num + 1) % width;
    chooseBoard();
    if (!tile.hasClass('ship')) {
      if (indexPlus === 0 || indexPlus === width - 1 || indexPlus === width - 2) {
        return assignBattleshipX();
      } else if (!(tile1x.hasClass('ship') || tile2x.hasClass('ship') || tile3x.hasClass('ship'))) {
        tile.addClass('ship');
        tile1x.addClass('ship');
        tile2x.addClass('ship');
        tile3x.addClass('ship');
        first = false;
      } else {
        return assignBattleshipX();
      }
    } else {
      return assignBattleshipX();
    }
  }

  // Function to assign BATTLESHIPS VERTICALLY
  function assignBattleshipY() {
    randomNumber();
    chooseBoard();
    if (!tile.hasClass('ship')) {
      if (tile1y.length === 0 || tile2y.length === 0 || tile3y.length === 0) {
        return assignBattleshipY();
      } else if (!(tile1y.hasClass('ship') || tile2y.hasClass('ship') || tile3y.hasClass('ship'))) {
        tile.addClass('ship');
        tile1y.addClass('ship');
        tile2y.addClass('ship');
        tile3y.addClass('ship');
        first = false;
      } else {
        return assignBattleshipY();
      }
    } else {
      return assignBattleshipY();
    }
  }

  // Function to assign SUB/CRUISER HORIZONTALLY
  function assignSubCruiseX() {
    randomNumber();
    const indexPlus = (num + 1) % width;
    chooseBoard();
    if (!tile.hasClass('ship')) {
      if (indexPlus === 0 || indexPlus === width - 1) {
        return assignSubCruiseX();
      } else if (!(tile1x.hasClass('ship') || tile2x.hasClass('ship'))) {
        console.log('subCruiseX', tile.attr('class'), tile1x.attr('class'), tile2x.attr('class'));
        tile.addClass('ship');
        tile1x.addClass('ship');
        tile2x.addClass('ship');
        first = false;
      } else {
        return assignSubCruiseX();
      }
    } else {
      return assignSubCruiseX();
    }
  }

  // Function to assign SUB/CRUISER VERTICALLY
  function assignSubCruiseY() {
    randomNumber();
    chooseBoard();
    if (!tile.hasClass('ship')) {
      if (tile1y.length === 0 || tile2y.length === 0) {
        return assignSubCruiseY();
      } else if (!(tile1y.hasClass('ship') || tile2y.hasClass('ship'))) {
        console.log('subCruiseY', tile.attr('class'), tile1y.attr('class'), tile2y.attr('class'));
        tile.addClass('ship');
        tile1y.addClass('ship');
        tile2y.addClass('ship');
        first = false;
      } else {
        return assignSubCruiseY();
      }
    } else {
      return assignSubCruiseY();
    }
  }

  // Function to assign DESTROYER HORIZONTALLY
  function assignDestroyerX() {
    randomNumber();
    const indexPlus = (num + 1) % width;
    chooseBoard();
    if (!tile.hasClass('ship')) {
      if (indexPlus === 0) {
        return assignDestroyerX();
      } else if (!(tile1x.hasClass('ship'))) {
        tile.addClass('ship');
        tile1x.addClass('ship');
        first = false;
      } else {
        return assignDestroyerX();
      }
    } else {
      return assignDestroyerX();
    }
  }

  // Function to assign DESTROYER VERTICALLY
  function assignDestroyerY() {
    randomNumber();
    chooseBoard();
    if (!tile.hasClass('ship')) {
      if (tile1y.length === 0) {
        return assignDestroyerY();
      } else if (!(tile1y.hasClass('ship'))) {
        tile.addClass('ship');
        tile1y.addClass('ship');
        first = false;
      } else {
        return assignDestroyerY();
      }
    } else {
      return assignDestroyerY();
    }
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
    for (var i = 0; i < tiles; i++) {
      $board1.attr('class', 'board1');
      $board2.attr('class', 'board2');
    }
  }


  $playButton.on('click', () => {
    clearClasses();
    $boardOne.show();
    $boardTwo.show();
    $result.hide();
    assignCarrier();
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
    for (i = 0; i < 100; i++) {
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
    const gameBoard = $board1.eq(num);
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
      if (countPlayer === boatArray.reduce(add, 0)) {
        $boardOne.hide();
        $boardTwo.hide();
        $result.html(`YOU SUNK MY BATTLESHIPS!`);
        $result.show();
      }
      if (countComp === boatArray.reduce(add, 0)) {
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
