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
  const boatArray = [5,4,3,3,2];
  console.log(boatArray);

  // Create function that randomly assigns where battleship should be in an array
  const $board1 = $('.board1');
  const $board2 = $('.board2');
  let num;
  const width = 10;

  function randomNumber() {
    return num = parseInt(Math.random() * $board1.length);
  }

  function placeShips



  function ship() {
    $board.hasClass('ship');
  }

  let orientation = '';

  function decideOrientation() {
    const direction = parseInt(Math.random() * 2);
    if (direction === 0) {
      orientation = 'x';
    } else {
      orientation = 'y';
    }
  }

  function placeShips() {
    for (let i = 0; i < boatArray.length; i++) {
      placeShip(boatArray[i]);
    }
  }

  const edgeCheck = [0, width - 1, width - 2, width - 3];

  function placeShip(shipLength) {
    decideOrientation();
    randomNumber();
    const checkLeftTileHitEdge = (num + 1) % width;
    chooseBoard();
    const ifEdge = edgeCheck.slice(0, shipLength).some((item) => {
      return checkLeftTileHitEdge === item;
    });
    const ifOver = Ytiles.slice(0, shipLength).some((item) => {
      return item.length === 0;
    });
    const containsShipClass = Ytiles.slice(0, 5).some((item) => {
      return item.hasClass('ship') !== true;
    });
    if (orientation === 'x') {
      if ($board.slice(num, (num + shipLength + 1)).filter(ship).length === 0) {
        if (ifEdge) {
          placeShip(shipLength);
        } else {
          $.each(Xtiles.slice(0, shipLength), (index, element) => {
            $(element).addClass('ship');
            console.log(index, element);
          });
          // first = false;
        }
      } else {
        placeShip(i);
      }
    } else {
      if (containsShipClass) {
        if (ifOver) {
          placeShip(i);
        } else {
          $.each(Ytiles.slice(0, shipLength), (index, element) => {
            $(element).addClass('ship');
            console.log(index, element);
          });
          // first = false;
        }
      } else {
        placeShip(i);
      }
    }
  }

  // function assignCarrier() {
  //   decideOrientation();
  //   randomNumber();
  //   const checkLeftTileHitEdge = (num + 1) % width;
  //   chooseBoard();
  //   const ifEdge = edgeCheck.slice(0, 5).some((item) => {
  //     return checkLeftTileHitEdge === item;
  //   });
  //   const ifOver = Ytiles.slice(0, 5).some((item) => {
  //     return item.length === 0;
  //   });
  //   const containsShipClass = Ytiles.slice(0, 5).some((item) => {
  //     return !item.hasClass('ship');
  //   });
  //   if (orientation === 'x') {
  //     if ($board.slice(num, (num + 6)).filter(ship).length === 0) {
  //       if (ifEdge) {
  //         return assignCarrier();
  //       } else {
  //         $.each(Xtiles.slice(0, 5), (index, element) => {
  //           $(element).addClass('ship');
  //           console.log(index, element);
  //         });
  //         // tile.addClass('ship');
  //         // tile1x.addClass('ship');
  //         // tile2x.addClass('ship');
  //         // tile3x.addClass('ship');
  //         // tile4x.addClass('ship');
  //         first = false;
  //       }
  //     } else {
  //       return assignCarrier();
  //     }
  //   } else {
  //     if (!tile.hasClass('ship') || tile1y.hasClass('ship') || tile2y.hasClass('ship') || tile3y.hasClass('ship')) {
  //       if (ifOver) {
  //         return assignCarrier();
  //       } else {
  //         tile.addClass('ship');
  //         tile1y.addClass('ship');
  //         tile2y.addClass('ship');
  //         tile3y.addClass('ship');
  //         tile4y.addClass('ship');
  //         first = false;
  //       }
  //     } else {
  //       return assignCarrier();
  //     }
  //   }
  // }

  // function assignBattleship(orientation) {
  //   decideOrientation();
  //   randomNumber();
  //   const checkLeftTileHitEdge = (num + 1) % width;
  //   chooseBoard();
  //   if(orientation === 'x') {
  //     if (!tile.hasClass('ship')) {
  //       if (!tile.hasClass('ship')) {
  //         if (checkLeftTileHitEdge === 0 || checkLeftTileHitEdge === width - 1 || checkLeftTileHitEdge === width - 2) {
  //           return assignBattleship();
  //         } else if (!(tile1x.hasClass('ship') || tile2x.hasClass('ship') || tile3x.hasClass('ship'))) {
  //           tile.addClass('ship');
  //           tile1x.addClass('ship');
  //           tile2x.addClass('ship');
  //           tile3x.addClass('ship');
  //           first = false;
  //         } else {
  //           return assignBattleship();
  //         }
  //       } else {
  //         return assignBattleship();
  //       }
  //     }
  //   } else {
  //     if (!tile.hasClass('ship')) {
  //       if (tile1y.length === 0 || tile2y.length === 0 || tile3y.length === 0) {
  //         return assignBattleship();
  //       } else if (!(tile1y.hasClass('ship') || tile2y.hasClass('ship') || tile3y.hasClass('ship'))) {
  //         tile.addClass('ship');
  //         tile1y.addClass('ship');
  //         tile2y.addClass('ship');
  //         tile3y.addClass('ship');
  //         first = false;
  //       } else {
  //         return assignBattleship();
  //       }
  //     } else {
  //       return assignBattleship();
  //     }
  //   }
  // }
  //
  // function assignSub(orientation) {
  //   decideOrientation();
  //   randomNumber();
  //   const checkLeftTileHitEdge = (num + 1) % width;
  //   chooseBoard();
  //   if(orientation === 'x') {
  //     if (!tile.hasClass('ship')) {
  //       if (!tile.hasClass('ship')) {
  //         if (checkLeftTileHitEdge === 0 || checkLeftTileHitEdge === width - 1) {
  //           return assignSub();
  //         } else if (!(tile1x.hasClass('ship') || tile2x.hasClass('ship'))) {
  //           tile.addClass('ship');
  //           tile1x.addClass('ship');
  //           tile2x.addClass('ship');
  //           first = false;
  //         } else {
  //           return assignSub();
  //         }
  //       } else {
  //         return assignSub();
  //       }
  //     }
  //   } else {
  //     if (!tile.hasClass('ship')) {
  //       if (tile1y.length === 0 || tile2y.length === 0) {
  //         return assignSub();
  //       } else if (!(tile1y.hasClass('ship') || tile2y.hasClass('ship'))) {
  //         tile.addClass('ship');
  //         tile1y.addClass('ship');
  //         tile2y.addClass('ship');
  //         first = false;
  //       } else {
  //         return assignSub();
  //       }
  //     } else {
  //       return assignSub();
  //     }
  //   }
  // }
  //
  // // Function to assign DESTROYER
  // function assignDestroyer(orientation) {
  //   decideOrientation();
  //   randomNumber();
  //   const checkLeftTileHitEdge = (num + 1) % width;
  //   chooseBoard();
  //   if(orientation === 'x') {
  //     if (!tile.hasClass('ship')) {
  //       if (!tile.hasClass('ship')) {
  //         if (checkLeftTileHitEdge === 0) {
  //           return assignDestroyer();
  //         } else if (!(tile1x.hasClass('ship'))) {
  //           tile.addClass('ship');
  //           tile1x.addClass('ship');
  //           first = false;
  //         } else {
  //           return assignDestroyer();
  //         }
  //       } else {
  //         return assignDestroyer();
  //       }
  //     }
  //   } else {
  //     if (!tile.hasClass('ship')) {
  //       if (tile1y.length === 0 || tile2y.length === 0) {
  //         return assignDestroyer();
  //       } else if (!(tile1y.hasClass('ship'))) {
  //         tile.addClass('ship');
  //         tile1y.addClass('ship');
  //         first = false;
  //       } else {
  //         return assignDestroyer();
  //       }
  //     } else {
  //       return assignDestroyer();
  //     }
  //   }
  // }


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
    placeShips();

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
