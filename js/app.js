$(() => {
  console.log('JS & jQuery Loaded');

  // Create the 10x10 grids
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
  console.log($board1);
  let randNum;
  const width = 10;

  function randomTile() {
    return randNum = parseInt(Math.random() * $board1.length);
  }

  function direction() {
    const direction = parseInt(Math.random() * 2);
    if (direction === 0) {
      assignBattleshipX();
    } else {
      assignBattleshipY();
    }
  }

  // create variable for either board 1 or board 2
  

  function assignBattleshipX() {
    randomTile();
    console.log(randNum);
    const indexPlus = (randNum + 1) % width;
    if ($board1.eq(randNum).html() === '') {

      if (indexPlus === width - 1) {
        return assignBattleshipX();

      } else if (indexPlus === width - 2) {
        return assignBattleshipX();

      } else if (indexPlus === width - 3 && $board1.eq(randNum + 1).html() === '' && $board1.eq(randNum + 2).html() === '' && $board1.eq(randNum + 3).html() === '') {
        $board1.eq(randNum).html('B');
        $board1.eq(randNum + 1).html('B');
        $board1.eq(randNum + 2).html('B');
        $board1.eq(randNum + 3).html('B');

      } else if (indexPlus === width - 4 && $board1.eq(randNum + 1).html() === '' && $board1.eq(randNum + 2).html() === '' && $board1.eq(randNum + 3).html() === '') {
        $board1.eq(randNum).html('B');
        $board1.eq(randNum + 1).html('B');
        $board1.eq(randNum + 2).html('B');
        $board1.eq(randNum + 3).html('B');

      } else {
        return assignBattleshipX();
      }
    } else {
      return assignBattleshipX();
    }
  }

  function assignBattleshipY() {
    randomTile();
    console.log(randNum);
    const indexPlus = randNum + width;
    if ($board1.eq(randNum).html() === '') {
      if ($board1.eq(indexPlus).length === 0) {
        return assignBattleshipY();
      } else if ($board1.eq(indexPlus + width).length === 0) {
        return assignBattleshipY();
      } else if ($board1.eq(indexPlus + (2 * width)).length === 0) {
        return assignBattleshipY();
      } else if ($board1.eq(indexPlus + (3 * width)).length === 0 && $board1.eq(randNum + 1).html() === '' && $board1.eq(randNum + 2).html() === '' && $board1.eq(randNum + 3).html() === '') {
        $board1.eq(randNum).html('B');
        $board1.eq(indexPlus).html('B');
        $board1.eq(indexPlus + width).html('B');
        $board1.eq(indexPlus + (2 * width)).html('B');
      } else if ($board1.eq(indexPlus + (4 * width)).length === 0 && $board1.eq(randNum + 1).html() === '' && $board1.eq(randNum + 2).html() === '' && $board1.eq(randNum + 3).html() === '') {
        $board1.eq(randNum).html('B');
        $board1.eq(indexPlus).html('B');
        $board1.eq(indexPlus + width).html('B');
        $board1.eq(indexPlus + (2 * width)).html('B');
      }else {
        return assignBattleshipY();
      }
    } else {
      return assignBattleshipY();
    }
  }

  direction();




  // Create function that hides Computer battleships

  // Create function that when you click it checks if this value in the array has been assigned a value

  // Assign a 'hit' background-color/X to the tile that has been clicked

  // Create function that checks if whole battleship has the background-color/X if yes, change all background-color to black

  // .

});
