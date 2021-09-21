

# Battleship_performance

An angular 11.0+ service that emits battleship performance of a smart and dumb bot.

# WORKSPACE

Workspace: https://github.com/RaeWinTan/battleship_workspace
CODE: https://github.com/RaeWinTan/battleship_workspace/tree/master/projects/battleship-performance

# ABOUT

This is a Angular package to estimate the amount turns for the battleship 'smart bot' in  https://github.com/RaeWinTan/RXJSLearn (battleship branch) to finish a battleship game as compared to a less efficient 'dumb bot' that just shoots shots base on luck to win the game (using a random number generator).

## Demo
GAME: https://stackblitz.com/github/RaeWinTan/RXJSLearn/tree/battleship Read its readme.md to deploy(it only takes 3 steps)

Package in action in an Angular Project: https://raewintan.github.io/battleship_workspace/

# GAME RULES

* Use this as reference: https://stackblitz.com/github/RaeWinTan/RXJSLearn/tree/battleship , after initialization, in stackblitz's terminal type `yarn run start`.
* During setup mode, the difference in length between the current ship being placed on the board and the prior ship is one unit. The current ship is smaller. The length of the first ship is the number of ships set in this program. (i.e. if you set the number of ships to 5, the ships placed on the board will be length 5, 4, 3....)     
* The player(smart bot/dumb bot) will know what is the length of the opponent's ship it shot down

# ABOUT THE CODE

* Both the dumb bot and the smart bot is playing against the same opponent's board
* The opponent board is generated randomly per game
* It is not considered a turn if the bot(smart/dumb) shoots a location it shot before

# ACCURACY
* For the most accurate result, set all parameters to a high value (>10, warning: if it is to high the program will take very long to yield results)
* Set grid size and ships to the same value
  * The greater the difference between grid size and ships the more inaccurate the result because the smart bot's probability to hit a ship in a less crowded grid is closer to the dumb bot.
* I ran the program in my computer with grid size, ships, games = 30. The smart bot uses about 16.5% less turns than dumb bot.

# Solver Algorithm(aka smart bot)
* Randomly shoot shots on opponent grids
* once it hit a ship, it determine which possible direction(vertical/horizontal) the ship could be by using the length of the ship, and using what the shots were already taken on the board.(basically use the length recently hit ship and what are the available space on the board)
* if by accident while solving the current ship, the smart bot hit a near by ship, it put that ship on queue to be processed later
* The bot know how to solved partially solved ships (ships may be partially solved while solving another ship). Situations such as: Gaps between a ship and padding beside(horizontally/vertically)

## Usage

**Step 1:** Install battleship_performance

```sh
npm install battleship_performance --save
```
**Step 2:** Import battleship_performance module into your app.module.ts
```ts
....
import {BattleshipPerformanceService} from "battleship-performance";

....

@NgModule({
  ....
  providers: [
    ....
    BattleshipPerformanceService  
  ],
  ....

})
export class AppModule { }
```

**Step3:** Use in component
```ts
import {BattleshipPerformanceService, BattleshipResult, Battleship_performanceError} from "battleship-performance";

export class .....{
  ....
  bps:any;
  constructor(bps:BattleshipPerformanceService){
    this.bps = bps;
  }
  subscribeToBps(gridSize, shipsNo, iterations){
    this.bps.game(gridSize, shipsNo,iterations).subscribe(
       (c:BattleshipResult)=>{
        //do what ever you want to do with the data
      },
      (err:Battleship_performanceError)=>{
        //do what you want when encounter error
      }
     );
  }

}
```

#API
## game(gridSize, shipsNo, iterations) parameters

| Attribute      | Type   | Description
|----------------|--------|------------
| gridSize | number | set the battleship grid size (gridSize * gridSize grids)
| shipsNo | number | number of ships the bot will be placing on board
| iterations | number | number of games to simulate

## BattleshipResult interface
| Attribute      | Type   | Description
|----------------|--------|------------
| games | number | number of games to simulate
| computerStatus | ShotInterface | Number of turn smart bot took and Shots taken
| playerStatus | ShotInterface | Number of turn dumb bot took and Shots taken
| oppBoard | Ship[] | How the ships were placed in the opponent board (reminder: the smart bot and dumb bot played against this Board aka opponent board, they play against the same board)

## ShotInterface interface
| Attribute      | Type   | Description
|----------------|--------|------------
| turns | number | total number of turns taken to shoot down all the ships
| shots | Shot[] | Description of the shots taken

## Ship interface
| Attribute      | Type   | Description
|----------------|--------|------------
| pos | number[] | positions of the grid the ship took
| length | number | length of that ship
| posibleDirection | string | possible direction the ship could be at that time of placing the ship down on the board

## Shot interface
| Attribute      | Type   | Description
|----------------|--------|------------
| hit | boolean | Did it hit a ship at the specified position of the shot
| pos | number | position of the shot
| shipLen | number(may be undefined) | if hit is true then this is the length of the ship the shot hit, else it will be undefined
