$(() => {
  console.log('JS & jQuery Loaded');

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
  const boats = {'Battleship': 4, 'Submarine': 3};

  // Create function that randomly assigns where battleship should be in an array

  const $board1 = $('.board1');
  const $board2 = $('.board2');
  let randNum;
  const width = 10;

  function randomTile() {
    return randNum = parseInt(Math.random() * $board1.length);
  }

  function direction() {
    const direction = parseInt(Math.random() * 2);
    const directionArray = [parseInt(Math.random() * 2), parseInt(Math.random() * 2), parseInt(Math.random() * 2), parseInt(Math.random() * 2)];
    console.log(directionArray);
    if (direction === 0) {
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
      // tile4y = $board1.eq(randNum + (width * 4));
    }
  }

  // Function to assign Battleships horizontally
  function assignBattleshipX() {
    randomTile();
    console.log(randNum);
    const indexPlus = (randNum + 1) % width;
    chooseBoard();
    if (tile.html() === '') {
      if (indexPlus === width - 1) {
        return assignBattleshipX();
      } else if (indexPlus === width - 2) {
        return assignBattleshipX();
      } else if (indexPlus === width - 3 && tile1x.html() === '' && tile2x.html() === '' && tile3x.html() === '') {
        tile.html('B');
        tile1x.html('B');
        tile2x.html('B');
        tile3x.html('B');
        first = false;
      } else if (indexPlus === width - 4 && tile1x.html() === '' && tile2x.html() === '' && tile3x.html() === '') {
        tile.html('B');
        tile1x.html('B');
        tile2x.html('B');
        tile3x.html('B');
        first = false;
      } else {
        return assignBattleshipX();
      }
    } else {
      return assignBattleshipX();
    }
  }

  // Function to assign Battleships vertically
  function assignBattleshipY() {
    randomTile();
    console.log(randNum);
    if (tile.html() === '') {
      if (tile1y.length === 0) {
        return assignBattleshipY();
      } else if (tile2y.length === 0) {
        return assignBattleshipY();
      } else if (tile3y.length === 0 && tile1y.html() === '' && tile2y.html() === '' && tile3y.html() === '') {
        tile.html('B');
        tile1y.html('B');
        tile2y.html('B');
        tile3y.html('B');
        first = false;
      } else if (tile4y.length === 0 && tile1y.html() === '' && tile2y.html() === '' && tile3y.html() === '') {
        tile.html('B');
        tile1y.html('B');
        tile2y.html('B');
        tile3y.html('B');
        first = false;
      } else {
        return assignBattleshipY();
      }
    } else {
      return assignBattleshipY();
    }
  }


  assignBattleshipX();
  assignBattleshipX();
  // direction();




  // Create function that hides Computer battleships

  // Create function that when you click it checks if this value in the array has been assigned a value

  // Assign a 'hit' background-color/X to the tile that has been clicked

  // Create function that checks if whole battleship has the background-color/X if yes, change all background-color to black

  // .

});
