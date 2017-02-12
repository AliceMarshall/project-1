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
  const boatArray = [5,4,3,2];
  console.log(boatArray);


  // Create function that randomly assigns where battleship should be in an array
  const $board1 = $('.board1');
  const $board2 = $('.board2');
  let randNum;
  let first = true;
  const width = 10;

  function randomTile() {
    return randNum = parseInt(Math.random() * $board1.length);
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
      assignSubCruiseY();
      first = true;
    }
  }

  // create variable for either board 1 or board 2
  let tile = $board1.eq(randNum);
  let tile1x = $board1.eq(randNum);
  let tile2x = $board1.eq(randNum);
  let tile3x = $board1.eq(randNum);
  let tile4x = $board1.eq(randNum);
  let tile1y = $board1.eq(randNum);
  let tile2y = $board1.eq(randNum);
  let tile3y = $board1.eq(randNum);
  let tile4y = $board1.eq(randNum);

  function chooseBoard() {
    if (first === true) {
      tile = $board1.eq(randNum);
      tile1x = $board1.eq(randNum + 1);
      tile2x = $board1.eq(randNum + 2);
      tile3x = $board1.eq(randNum + 3);
      tile4x = $board1.eq(randNum + 4);
      tile1y = $board1.eq(randNum + width);
      tile2y = $board1.eq(randNum + (width * 2));
      tile3y = $board1.eq(randNum + (width * 3));
      tile4y = $board1.eq(randNum + (width * 4));
    } else {
      tile = $board2.eq(randNum);
      tile1x = $board2.eq(randNum + 1);
      tile2x = $board2.eq(randNum + 2);
      tile3x = $board2.eq(randNum + 3);
      tile4x = $board2.eq(randNum + 4);
      tile1y = $board2.eq(randNum + width);
      tile2y = $board2.eq(randNum + (width * 2));
      tile3y = $board2.eq(randNum + (width * 3));
      tile4y = $board2.eq(randNum + (width * 4));
    }
  }

  // Function to assign CARRIER HORIZONTALLY
  function assignCarrierX() {
    randomTile();
    console.log(randNum);
    const indexPlus = (randNum + 1) % width;
    chooseBoard();
    if (tile.html() === '') {
      if (indexPlus === 0 || indexPlus === width - 1 || indexPlus === width - 2 || indexPlus === width - 3) {
        return assignCarrierX();
      } else if (tile1x.html() === '' && tile2x.html() === '' && tile3x.html() === '' && tile3x.html() === '') {
        tile.html('<span>C</span>');
        tile1x.html('<span>C</span>');
        tile2x.html('<span>C</span>');
        tile3x.html('<span>C</span>');
        tile4x.html('<span>C</span>');
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
    randomTile();
    console.log(randNum);
    chooseBoard();
    if (tile.html() === '') {
      if (tile1y.length === 0 || tile2y.length === 0 || tile3y.length === 0 || tile4y.length === 0) {
        return assignCarrierY();
      } else if (tile1y.html() === '' && tile2y.html() === '' && tile3y.html() === '' && tile3y.html() === '') {
        tile.html('<span>C</span>');
        tile1y.html('<span>C</span>');
        tile2y.html('<span>C</span>');
        tile3y.html('<span>C</span>');
        tile4y.html('<span>C</span>');
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

  // Function to assign BATTLESHIPS VERTICALLY
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

  // Function to assign SUB/CRUISER HORIZONTALLY
  function assignSubCruiseX() {
    randomTile();
    console.log(randNum);
    const indexPlus = (randNum + 1) % width;
    chooseBoard();
    if (tile.html() === '') {
      if (indexPlus === 0 || indexPlus === width - 1) {
        return assignSubCruiseX();
      } else if (tile1x.html() === '' && tile2x.html() === '') {
        tile.html('<span>S</span>');
        tile1x.html('<span>S</span>');
        tile2x.html('<span>S</span>');
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
    randomTile();
    console.log(randNum);
    chooseBoard();
    if (tile.html() === '') {
      if (tile1y.length === 0 || tile2y.length === 0) {
        return assignSubCruiseY();
      } else if (tile1y.html() === '' && tile2y.html() === '') {
        tile.html('<span>S</span>');
        tile1y.html('<span>S</span>');
        tile2y.html('<span>S</span>');
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
    randomTile();
    console.log(randNum);
    const indexPlus = (randNum + 1) % width;
    chooseBoard();
    if (tile.html() === '') {
      if (indexPlus === 0) {
        return assignDestroyerX();
      } else if (tile1x.html() === '') {
        tile.html('<span>D</span>');
        tile1x.html('<span>D</span>');
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
    randomTile();
    console.log(randNum);
    chooseBoard();
    if (tile.html() === '') {
      if (tile1y.length === 0) {
        return assignDestroyerY();
      } else if (tile1y.html() === '') {
        tile.html('<span>D</span>');
        tile1y.html('<span>D</span>');
        first = false;
      } else {
        return assignDestroyerY();
      }
    } else {
      return assignDestroyerY();
    }
  }


  // Create function that hides Computer battleships
  // let board2span;
  //
  // function hideBoard2() {
  //   board2span = $board2.children();
  //   board2span.hide();
  // }

  // Assign a 'miss'/'hit' background-color/X to the tile that has been clicked
  $board2.on('click', (e) => {
    const clicked = $(e.target);
    console.log(clicked);
    console.log($(e.target));
    if (!clicked.html()) {
      clicked.addClass('miss');
      computersGo();
    } else {
      clicked.addClass('hit');
      computersGo();
    }
  });

  // Create a click function that initiates boards and the game.

  const $playButton = $('.play-button');

  $playButton.on('click', () => {
    direction();
    // hideBoard2();
  });



  // Create function that checks if whole battleship has the background-color/X if yes, change all background-color to black

  //

  // create a function that when you click on the board the computer also randomly clicks on the other board, and follow the same hit or miss principles
  let x;
  let y;
  let coordObj;
  // let attackMode = false;
  // let hitX = 1;
  // let hitY = 1;
  // let index;

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
    randomTile();
    // index = randNum;
    if (!$board1.eq(randNum).html()) {
      console.log($board1.eq(randNum));
      $board1.eq(randNum).addClass('miss');
    } else {
      $board1.eq(randNum).addClass('hit');
      // attackMode = true;
      // hitX = coordObj[i][0];
      // hitY = coordObj[i][1];
    }
  }





  // inside function above it also needs to be smart and when a hit is made it checks all squares adjacent

  // make click function work for the spans

  // instead of B change to a background colour

  // check if you sunk a whole ship every time someone clicks

  // create an animation for when you hit a ship

  // write instructions

  // create tally

  // change to play game to reset after first click.

  // create a function to add your own battleships to the grid.

  // make it look pretty

});
