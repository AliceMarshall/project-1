$(() => {
  console.log('JS & jQuery Loaded');

// Create an object of battleships
  const boats = {'Battleship': 3, 'Submarine': 2};

// Create function that randomly assigns where battleship should be in an array

  const $tile1 = $('.tile1');
  console.log($tile1);

  let randNum;

  function randomTile() {
    return randNum = parseInt(Math.random() * $tile1.length);
  }

  // const direction = parseInt(Math.random() * 2);
  // const horizontal = 0;
  // const vertical = 1;
  // console.log(direction);
  // let directionArray;
  const width = 5;

  function assignBattleship() {
    randomTile();
    console.log(randNum);
    const indexPlus = (randNum + 1) % width;
    if ($tile1.eq(randNum).html() === '') {
      if (indexPlus === width - 1) {
        return assignBattleship();
      } else if (indexPlus === width - 2) {
        return assignBattleship();
      } else if (indexPlus === width - 3 && $tile1.eq(randNum + 1).html() === '' && $tile1.eq(randNum + 2).html() === '' && $tile1.eq(randNum + 3).html() === '') {
        $tile1.eq(randNum).html('B');
        $tile1.eq(randNum + 1).html('B');
        $tile1.eq(randNum + 2).html('B');
        $tile1.eq(randNum + 3).html('B');
      } else if (indexPlus === width - 4 && $tile1.eq(randNum + 1).html() === '' && $tile1.eq(randNum + 2).html() === '' && $tile1.eq(randNum + 3).html() === '') {
        $tile1.eq(randNum).html('B');
        $tile1.eq(randNum + 1).html('B');
        $tile1.eq(randNum + 2).html('B');
        $tile1.eq(randNum + 3).html('B');
      } else {
        return assignBattleship();
      }
    } else {
      return assignBattleship();
    }
  }
  assignBattleship();

// Create function that hides Computer battleships

// Create function that when you click it checks if this value in the array has been assigned a value

// Assign a 'hit' background-color/X to the tile that has been clicked

// Create function that checks if whole battleship has the background-color/X if yes, change all background-color to black

// .

});
