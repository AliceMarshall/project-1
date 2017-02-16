#Sink the DictatorShips

###GA WDI London - Project 1

In this version of Battleship, the player will instead place DictatorShips on their board and try to hit the computers hidden ones.

***Play 'Sink the DictatorShips'*** [***here***](https://secure-beyond-16634.herokuapp.com/):

####Rules of the Game:

1. Begin by clicking *Play Game*, this will generate the computers DictatorShip and you will be able to place DictatorShip.
2. Click the *Select Ship* button to choose which DictatorShip you would like to place. 
3. Decide on the orientation of the ship, by clicking the *Rotate* button. It is set to horizontal by default. 
4. You can now click on Your Board to place your ship. If the place is unavailable it will tell you to Try Again.
5. Once all DictatorShips have been laid you can Start Game, buy clicking on the Computers Board.
6. The Game ends when all DictatorShips have been found.

####Approach

The 'computers' DictatorShips are randomly placed on its Board from an array of the ships lengths. Ensuring none of the ships are overlaped or off the board vertically or horizontally. Unlike the offical rules to Battleship, DictatorShips can be placed directly next to one another, making it easier to win. The same function it run to place the players DictatorShips.

As the player clicks on the Computers Board, a function will run to randomly select cells on the Players Board. If a 'hit' is made, on the next turn, the 'computer' will select a cell adjacent as random.

When the player has hit a whole DictatorShip a 2 second scroll down will occur showing which DictatorShip was destroyed. Once all 17 (in this particular sized game) hit's have been and all DictatorShips destroyed, the game is over. *Play Again ?* can be clicked to restart the game.


**Technologies Used**

- HTML5, CSS, jQuery were used to create the game.
- The ``app.js`` file includes NameSpacing.
- The Google Web Font 'Keania' has been used to style the game.

**Copyright &#169;**

I own none of the images or background used in the game.

####Challenges & Problems

The main challenges I had whilst building the game was in my method of working and creating AI for the computer's turn. I should have worked slower, to create DRYer code from the get-go instead of creating several similar functions and then trying to refactor them down. I also struggled when creating a function to place intelligent moves. I would have liked to take this further with more time, to ultimately make it think like a human.

Other features I would liked to have had time to add were animations or sound effects. I also had different ideas for themes for the game, so the player could choose

**Features & Bugs**

- You can only view the Instructions just after the page has loaded, once *Play Game* has been clicked on it will no longer be visable.
- If a DictatorShip other than the last DictatorShip placed is placed in the top left-hand corner of the Player Board, you will not be able to place any of the remaining DictatorShip.


with explanations of the technologies used, the approach taken, installation instructions, unsolved problems, etc.
