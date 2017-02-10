$(() => {
  console.log('JS & jQuery Loaded');

// Create an object of battleships
  const boats = {'Battleship': 3, 'Submarine': 2};

// Create function that randomly assigns where battleship should be in an array

  const $tile1 = $('.tile1');
  console.log($tile1);

  function randomTile() {
    const randNum = parseInt(Math.random() * $tile1.length);
    console.log(randNum);
  }


  const direction = parseInt(Math.random() * 2);
  const horizontal = 0;
  const vertical = 1;
  console.log(direction);
  let directionArray;

  // function XorY() {
  //   if (direction === horizontal) {
  //     return directionArray = xArray;
  //   }
  //   if (direction === vertical) {
  //     return directionArray = yArray;
  //   }
  // }

  // const xArray = [[0,1,2,3,4], [5,6,7,8,9], [10,11,12,13,14], [15,16,17,18,19], [20,21,22,23,24]];
  // const yArray = [[0,5,10,15,20], [1,6,11,16,21], [2,7,12,17,22], [3,8,13,18,23], [4,9,14,19,24]];

  function assignShip() {
    $tile1.eq(randNum).html('X');
    XorY();
    for (var i = 0; i < directionArray.length; i++) {
      if (directionArray[i].includes(randNum)) {
        return i;
      }

    }

    // if (horizontal === direction) {
    //
    // }
  }
  assignShip();

// Create function that hides Computer battleships

// Create function that when you click it checks if this value in the array has been assigned a value

// Assign a 'hit' background-color/X to the tile that has been clicked

// Create function that checks if whole battleship has the background-color/X if yes, change all background-color to black

// .

});
