var btsp = btsp || {}; //btsp - battleship

//   ----- CONSTANT -- VARIABLES -----

btsp.width = 10;       // width of the each board
btsp.coordObj = {};    // calculates the coordinates of the boards - used in makeCoords function
// Constants for creating divs/cells within the boards
btsp.div = '<div class="board1"></div>';
btsp.div2 = '<div class="board2"></div>';
const allCells = 100;
// Object and arrays of battleships used in placing ships, hit/miss ships, and result arrays
btsp.boats = {'Carrier': 5, 'Battleship': 4, 'Submarine': 3, 'Cruiser': 3, 'Destroyer': 2};
btsp.boatsArray = [5,4,3,3,2];
btsp.imgArray = ['images/hitler.jpg', 'images/kim.jpg', 'images/Saddam.jpg', 'images/stalin.jpg', 'images/mugabe.jpg'];
btsp.resultArray = ['Adolf Hitler', 'Kim Il Sung', 'Saddam Hussein', 'Joesph Stalin', 'Robert Mugabe'];
// Object and array used for the attackGo function - Computer AI
btsp.changeIndexObj = {'north': - btsp.width, 'east': 1, 'south': btsp.width, 'west': - 1};
btsp.moves = ['north', 'east', 'south', 'west'];

//   ----- VARIABLES -----

let cellIndex = null;   // the index of the cell clicked
let orientation = 'x';  // initial orientation of ship being placed
btsp.computer = true;    // computer set to true when placing the ships on the computers board false when placing players ships
btsp.selection = null;   // the selected value of the form select set to null - used in $board1.on('click') function
btsp.shipPositions = []; // shipPositions gets filled with the arrays on the ship's postions on the computers board.
btsp.x;                  // the horizontal variable
btsp.y;                  // the vertical variable
btsp.attackMode = false; // attackMode is set to false until the computer finds a hit, then set to true.
btsp.hitX = 1;           // is the x coordinate of cell that has a hit in computers turn
btsp.hitY = 1;           // the y coordinate of cell that has a hit in computers turn
btsp.hitIndex;           // the index of the cell that was hit within the board array
btsp.newCell = null;     // the cell that was found in attackGo.
btsp.countPlayer;        // the number of hits on board2
btsp.countComp;          // the number of hits on board1

//   ---- FUNCTION ---

// check if you sunk a whole ship every time someone clicks - used in winLoseCheck
btsp.add = function(a, b) {
  return a + b;
};

btsp.setup = function() {

  //   ---- CONSTANT -- VARIABLES ----

  // Creates the 10x10 board grids
  btsp.$boardOne = $('.boardOne');   // the div with class boardOne
  btsp.$boardTwo = $('.boardTwo');   // the div with class boardTwo
  btsp.$dictatorImg = $('#dictator');
//
  btsp.$select = $('select');
  btsp.$alertPlayer = $('.alert-player');
//
  btsp.$midResult = $('.mid-result');
  // constants used in on click function $rotate
  btsp.$rotate = $('.rotate');
  btsp.$spanOrientation = $('span');
  //
  btsp.$result = $('.result');
  btsp.$playButton = $('.play-button');
  //
  btsp.$instuctButton = $('.instructions-button');
  btsp.$instructions = $('.instructions');

  //   ---- ON LOAD FUNCTIONS ----

  // function to create board cells
  btsp.createBoardCells = function() {
    for (let i = 0; i < allCells; i++) {
      this.$boardOne.append($(this.div));
      this.$boardTwo.append($(this.div2));
    }
  };

  // function to create coordinates for the boards to be used in attackMode = true and attackGo function
  btsp.makeCoords = function() {
    for (let i = 0; i < allCells; i++) {
      if (i % this.width === 0) {
        this.x = (i % this.width) + 1;
        this.y = (i / 10) + 1;
        this.coordObj[i] = [this.x,this.y];
      } else if (i % this.width === 1 || i % this.width === 2 || i % this.width === 3 || i % this.width === 4 || i % this.width === 5 || i % this.width === 6 || i % this.width === 7 || i % this.width === 8 || i % this.width === 9) {
        this.x = (i % this.width) + 1;
        this.y = Math.ceil(i / 10);
        this.coordObj[i] = [this.x,this.y];
      }
    }
  };
  btsp.createBoardCells();
  btsp.makeCoords();

  //   ---- VARIABLES ----
  btsp.$cellsBoard = $('.board1');
  btsp.canPlaceShip = false;
  btsp.$shipsCells = null;

  //   ---- CONSTANTS ----
  // board/assign div constants
  btsp.$board1 = $('.board1');
  btsp.$board2 = $('.board2');
  btsp.$assign = $('.assign');
  btsp.$cell = btsp.$cellsBoard.eq(cellIndex);

  //   ---- HIDE ON LOAD ----
  btsp.$assign.hide();
  btsp.$alertPlayer.hide();    // div that alerts player if the ship cannot be placed, if they make a hit or a miss.
  btsp.$result.hide();
  btsp.$instructions.hide();

  //   ---- FUNCTIONS ----
  // function to toggle instructions
  btsp.showHideInstructions = function() {
    btsp.$instructions.toggle();
    btsp.$board1.toggle();
    btsp.$board2.toggle();
    if (btsp.$playButton.hasClass('disable')) {
      btsp.$playButton.removeClass('disable');
    } else {
      btsp.$playButton.addClass('disable');
    }
  };

  // function to change which board is having ships placed on it - used in $playGame function
  btsp.changeBoard = function() {
    if(this.$cellsBoard.hasClass('board2')) {
      return this.$cellsBoard = $('.board1');
    } else {
      return this.$cellsBoard = $('.board2');
    }
  };

  // function that produces random number depending on the boards length - used in ComputerGo function
  btsp.randomNumber = function() {
    return cellIndex = Math.floor(Math.random() * this.$cellsBoard.length);
  };

  // function $rotate to change orientation,
  btsp.rotation = function() {
    if (orientation === 'x') {
      orientation = 'y';
      this.$spanOrientation.html('vertical');
    } else {
      orientation = 'x';
      this.$spanOrientation.html('horizontal');
    }
  };

  // function set $alertplayer to hidden unless the criteria are met
  btsp.tryAgain = function() {
    btsp.$alertPlayer.fadeIn();
    btsp.$assign.hide();
    setTimeout(function() {
      btsp.$alertPlayer.hide();
      btsp.$assign.show();
    }, 1000);
  };

  // function to hide assignment of ships and initiate the player to click on the computers board.
  btsp.hideAssignShips = function() {
    this.$shipsOnBoard = $('.board1.ship');
    if (this.$shipsOnBoard.length === 17) {
      btsp.$assign.hide();
      btsp.$alertPlayer.text('Start Game !');
      btsp.$alertPlayer.show();
      this.$board2.on('click', this.playerPlays);
    }
  };

  // function used on click for the player to decide where to place their ships.
  btsp.playerPlacesShips = function(e) {
    this.selection = this.$select.val();
    const length = this.boats[this.selection];
    cellIndex = this.$board1.index($(e.target));
    this.placeShips(length, orientation, cellIndex);
  };

  btsp.placeShips = function(length, orientation, cellIndex) {
    if (this.computer) {
      orientation = parseInt(Math.random() * 2) === 0 ? 'x' : 'y';
      cellIndex = Math.floor(Math.random() * this.$cellsBoard.length);
    }
    if (this.$cell.hasClass('ship')) {
      if (this.computer) {
        return this.placeShips(length, orientation, cellIndex);
      } else {
        this.tryAgain();
        return false;
      }
    }
    if (orientation === 'x') {
      if ((cellIndex + length - 1) % this.width < length - 1) {
        if (this.computer) {
          return this.placeShips(length, orientation, cellIndex);
        } else {
          this.tryAgain();
          return false;
        }
      }
      this.$shipsCells = this.$cellsBoard.slice(cellIndex, cellIndex + length);
    } else {
      btsp.cellIndices = [];
      for (let i = 0; i < length; i++) {
        this.cellIndices.push(cellIndex + (i * this.width));
      }
      if (this.cellIndices[this.cellIndices.length - 1] > (allCells - 1)) {
        if (this.computer) {
          return this.placeShips(length, orientation, cellIndex);
        } else {
          this.tryAgain();
          return false;
        }
      }
      this.$shipsCells = this.$cellsBoard.filter((i) => {
        return this.cellIndices.includes(i);
      });
    }
    this.canPlaceShip = this.$shipsCells.toArray().every((cell) => {
      return !$(cell).hasClass('ship');
    });
    if (!this.canPlaceShip) {
      if (this.computer) {
        return this.placeShips(length, orientation, cellIndex);
      } else {
        this.tryAgain();
        return false;
      }
    }
    this.$shipsCells.addClass('ship');
    if (!this.computer) {
      $('option:selected').prop('disabled', true);
      $('option').eq(0).prop('selected', true);
      this.hideAssignShips();
    } else {
      this.shipPositions.push(this.$shipsCells.toArray().map((cell) => {
        return $(cell).index();
      }));
    }
  };

  // function to clears classes
  btsp.clearClasses = function() {
    for (var i = 0; i < allCells; i++) {
      this.$board1.attr('class', 'board1');
      this.$board2.attr('class', 'board2');
    }
  };

  // Function for .on click Play Game
  btsp.playGame = function() {
    btsp.$instuctButton.text('');
    btsp.$instuctButton.addClass('disable');
    this.shipPositions = [];
    btsp.$alertPlayer.hide();
    btsp.$assign.show();
    this.changeBoard();
    this.computer = true;
    this.clearClasses();
    this.$boardOne.show();
    this.$boardTwo.show();
    this.$result.hide();
    this.boatsArray.forEach((length, orientation, cellIndex) => this.placeShips(length, orientation, cellIndex));
    this.changeBoard();
    this.computer = false;
    $('option').prop('disabled', false);
    $('option:selected').prop('disabled', true);
    this.$playButton.html('Play Again ?');
    this.$board2.off('click');
    btsp.$alertPlayer.text('Try Again');
  };

  // Assign a 'miss'/'hit' background-color to the tile that has been clicked and runs computersGo
  btsp.playerPlays = function(e) {
    this.clicked = $(e.target);
    if(this.clicked.hasClass('hit') || this.clicked.hasClass('miss')) return false;
    if (this.clicked.hasClass('ship')) {
      this.clicked.addClass('hit');
      btsp.$alertPlayer.text('Hit !');
      btsp.computersGo();
    } else {
      this.clicked.addClass('miss');
      btsp.$alertPlayer.text('Miss !');
      btsp.computersGo();
    }
    btsp.hitAShip();
  };

  // function for computer to have a turn clicking on the players board. Runs winLoseCheck function to check if someone has won.
  btsp.computersGo = function() {
    this.randomNumber();
    btsp.gameBoard = this.$board1.eq(cellIndex);
    if (this.attackMode) {
      this.attackGo();
    } else {
      if (this.gameBoard.hasClass('ship')) {
        this.gameBoard.removeClass('ship');
        this.gameBoard.addClass('hit');
        this.attackMode = true;
        this.hitX = this.coordObj[cellIndex][0];
        this.hitY = this.coordObj[cellIndex][1];
        this.hitIndex = cellIndex;
      } else if (this.gameBoard.hasClass('hit')) {
        this.computersGo();
      } else if (this.gameBoard.hasClass('miss')) {
        this.computersGo();
      } else {
        this.gameBoard.addClass('miss');
      }
    }
    this.winLoseCheck();
  };

  // function that shuffles arrays - used in attackGo
  btsp.shuffle = function(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  };

  // function that will randomly pick N/E/S/W cell in their next turn, if second hit will run stay in attack mode.
  btsp.attackGo = function() {
    this.shuffle(this.moves);
    btsp.coordCheckObj = {'north': this.hitY - 1 > 0, 'east': this.hitX + 1 <= this.width, 'south': this.hitY + 1 <= this.width, 'west': this.hitX - 1 > 0};
    this.successfulMove = false;
    for (let i = 0; i < Object.keys(this.coordCheckObj).length; i++) {
      if (this.coordCheckObj[this.moves[i]]) {
        this.newCell = this.$board1.eq(this.hitIndex + this.changeIndexObj[this.moves[i]]);
        if (this.newCell.hasClass('ship')) {
          this.newCell.removeClass('ship');
          this.newCell.addClass('hit');
          this.successfulMove = true;
          break;
        } else if (this.newCell.hasClass('hit') || this.newCell.hasClass('miss')) {
          continue;
        } else {
          this.newCell.addClass('miss');
          this.successfulMove = true;
          this.attackMode = false;
          break;
        }
      }
    }
    if (!this.successfulMove) {
      this.attackMode = false;
      this.computersGo();
    }
  };

  // function that checks if a single ship has been hit.
  btsp.hitAShip = function() {
    for (let i = 0; i < this.shipPositions.length; i++) {
      for (let j = 0; j < this.shipPositions[i].length; j++) {
        if (this.$board2.eq(this.shipPositions[i][j]).hasClass('hit')) {
          this.shipPositions[i].splice(j, 1);
          if (this.shipPositions[i].length === 0) {
            this.$midResult.text(`You sunk ${this.resultArray[i]}'s DictatorShip`);
            this.$dictatorImg.attr('src', this.imgArray[i]);
            this.scrollDown();
          }
        }
      }
    }
  };

  // function to scrollUp and ScrollDown to the result when you destroy a whole ship.
  btsp.scrollUp = function() {
    $('html, body').animate({ scrollTop: '0%' }, 300);
  };
  btsp.scrollDown = function() {
    $('html, body').animate({ scrollTop: '1000%' }, 300);
    setTimeout(this.scrollUp, 2000);
  };

  // function to hide whats on screen and shows final result.
  btsp.hideBoardShowResult = function() {
    this.$boardOne.hide();
    this.$boardTwo.hide();
    btsp.$alertPlayer.hide();
    this.$result.show();
    btsp.$assign.hide();
  };

  // function to check if countPlayer/countComp have all ships hit
  btsp.winnerResult = function() {
    if (this.countPlayer === this.boatsArray.reduce(this.add, 0)) {
      this.hideBoardShowResult();
      this.$result.html(`You sunk the DictatorShips!`);
    }
    if (this.countComp === this.boatsArray.reduce(this.add, 0)) {
      this.hideBoardShowResult();
      this.$result.html(`I sunk the DictatorShips!`);
    }
  };

  // function to check if all ships have been hit
  btsp.winLoseCheck = function() {
    this.countPlayer = $('.board2.hit').length;
    this.countComp = $('.board1.hit').length;
    for (let i = 0; i < this.$board2.length; i++) {
      this.winnerResult();
    }
  };

  //   ---- EVENT LISTENERS ----

  this.$instuctButton.on('click', this.showHideInstructions.bind(this));
  this.$rotate.on('click', this.rotation.bind(this));
  this.$board1.on('click', this.playerPlacesShips.bind(this));
  this.$playButton.on('click', this.playGame.bind(this));
};

$(btsp.setup.bind(btsp));
//to do:
  // - make instructions work
  // - add namespacing
  // - add sass
  // - write a read me
  // - label all functions
