$(() => {
  console.log('JS & jQuery Loaded');

// Create function that randomly assigns where battleship should be in an array

  const $tile1 = $('.tile1');
  console.log($tile1);

  const randNum = parseInt(Math.random() * $tile1.length);
  console.log(randNum);

  const direction = parseInt(Math.random() * 2);
  const horizontal = 0;
  const vertical = 1;
  console.log(direction);

  function assignShip() {
    $tile1.eq(randNum).html('X');
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
