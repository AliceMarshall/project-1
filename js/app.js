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
  const boats = {'Carrier': 5, 'Battleship': 4, 'Cruiser': 3, 'Submarine': 3, 'Destroyer': 2};
  const boatArray = [5,4,3,2];
  console.log(boatArray);

  // Create function that randomly assigns where battleship should be in an array

  const $board1 = $('.board1');
  const $board2 = $('.board2');
  let randNum;
  const width = 10;

  function randomTile() {
    return randNum = parseInt(Math.random() * $board1.length);
  }

  function direction() {
    // const direction = parseInt(Math.random() * 2);
    const directionArray = [parseInt(Math.random() * 2), parseInt(Math.random() * 2)];
    console.log(directionArray);
    if (directionArray[0] === 0) {
      assignBattleshipX();
    } else {
      assignBattleshipY();
    }
    if (directionArray[1] === 0) {
      assignBattleshipX();
    } else {
      assignBattleshipY();
    }
  }

  // create variable for either board 1 or board 2
  let tile = $board1.eq(randNum);
  let tile1x = $board1.eq(randNum);
  let tile2x = $board1.eq(randNum);
  let tile3x = $board1.eq(randNum);
  // let tile4x = $board1.eq(randNum);
  let tile1y = $board1.eq(randNum);
  let tile2y = $board1.eq(randNum);
  let tile3y = $board1.eq(randNum);
  let tile4y = $board1.eq(randNum);
  let first = true;

  function chooseBoard() {
    if (first === true) {
      tile = $board1.eq(randNum);
      tile1x = $board1.eq(randNum + 1);
      tile2x = $board1.eq(randNum + 2);
      tile3x = $board1.eq(randNum + 3);
      // tile4x = $board1.eq(randNum + 4);
      tile1y = $board1.eq(randNum + width);
      tile2y = $board1.eq(randNum + (width * 2));
      tile3y = $board1.eq(randNum + (width * 3));
      tile4y = $board1.eq(randNum + (width * 4));
    } else {
      tile = $board2.eq(randNum);
      tile1x = $board2.eq(randNum + 1);
      tile2x = $board2.eq(randNum + 2);
      tile3x = $board2.eq(randNum + 3);
      // tile4x = $board2.eq(randNum + 4);
      tile1y = $board2.eq(randNum + width);
      tile2y = $board2.eq(randNum + (width * 2));
      tile3y = $board2.eq(randNum + (width * 3));
      tile4y = $board2.eq(randNum + (width * 4));
    }
  }

  // Function to assign Battleships horizontally
  function assignBattleshipX() {
    randomTile();
    console.log(randNum);
    const indexPlus = (randNum + 1) % width;
    chooseBoard();
    if (tile.html() === '') {
      if (indexPlus === 0 || indexPlus === width - 1 || indexPlus === width - 2) {
        return assignBattleshipX();
      } else if (tile1x.html() === '' && tile2x.html() === '' && tile3x.html() === '') {
        tile.html('<span>B</span>');
        tile1x.html('<span>B</span>');
        tile2x.html('<span>B</span>');
        tile3x.html('<span>B</span>');
        first = false;
      } else {
        return assignBattleshipX();
      }
    } else {
      return assignBattleshipX();
    }
  }

  // Function to assign CARRIER vertically
  function assignCarrierY() {
    randomTile();
    console.log(randNum);
    chooseBoard();
    if (tile.html() === '') {
      if (tile1y.length === 0 || tile2y.length === 0 || tile3y.length === 0 || tile4y.length === 0) {
        return assignCarrierY();
      } else if (tile1y.html() === '' && tile2y.html() === '' && tile3y.html() === '' && tile3y.html() === '') {
        tile.html('<span>B</span>');
        tile1y.html('<span>B</span>');
        tile2y.html('<span>B</span>');
        tile3y.html('<span>B</span>');
        tile4y.html('<span>B</span>');
        first = false;
      } else {
        return assignCarrierY();
      }
    } else {
      return assignCarrierY();
    }
  }

  // Function to assign BATTLESHIPS vertically
  function assignBattleshipY() {
    randomTile();
    console.log(randNum);
    chooseBoard();
    if (tile.html() === '') {
      if (tile1y.length === 0 || tile2y.length === 0 || tile3y.length === 0) {
        return assignBattleshipY();
      } else if (tile1y.html() === '' && tile2y.html() === '' && tile3y.html() === '') {
        tile.html('<span>B</span>');
        tile1y.html('<span>B</span>');
        tile2y.html('<span>B</span>');
        tile3y.html('<span>B</span>');
        first = false;
      } else {
        return assignBattleshipY();
      }
    } else {
      return assignBattleshipY();
    }
  }

  // Function to assign BATTLESHIPS vertically
  function assignSubCruiseY() {
    randomTile();
    console.log(randNum);
    chooseBoard();
    if (tile.html() === '') {
      if (tile1y.length === 0 || tile2y.length === 0) {
        return assignSubCruiseY();
      } else if (tile1y.html() === '' && tile2y.html() === '') {
        tile.html('<span>B</span>');
        tile1y.html('<span>B</span>');
        tile2y.html('<span>B</span>');
        first = false;
      } else {
        return assignSubCruiseY();
      }
    } else {
      return assignSubCruiseY();
    }
  }

  // Function to assign BATTLESHIPS vertically
  function assignDestroyerY() {
    randomTile();
    console.log(randNum);
    chooseBoard();
    if (tile.html() === '') {
      if (tile1y.length === 0) {
        return assignDestroyerY();
      } else if (tile1y.html() === '') {
        tile.html('<span>B</span>');
        tile1y.html('<span>B</span>');
        first = false;
      } else {
        return assignDestroyerY();
      }
    } else {
      return assignDestroyerY();
    }
  }
  
  function loopShipAssign() {
    for (var i = 0; i < boatArray.length; i++) {
      if (boatArray[i] === '5') {
        assignCarrierY();
      } else if (boatArray[i] === '4') {
        assignBattleshipY();
      } else if (boatArray[i] === '3') {
        assignSubCruiseY();
      } else if (boatArray[i] === '2') {
        assignDestroyerY();
      }
    }
  }

  loopShipAssign();
  // direction();

  // Create function that hides Computer battleships

  const board2span = $board2.children();
  board2span.hide();

  // Create function that when you click it checks if this value in the array has been assigned a value

  $board2.on('click', (e) => {
    const clicked = $(e.target);
    if (clicked.html() === '') {
      clicked.addClass('miss');
    }
    // if (clicked.html() === '<span>B</span>') {
    //   board2span.show();
    //   clicked.addClass('hit');
    // }

  });

  // Assign a 'hit' background-color/X to the tile that has been clicked

  // Create function that checks if whole battleship has the background-color/X if yes, change all background-color to black

  // .

});
