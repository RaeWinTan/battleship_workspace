

# Battleship_performance

An angular 11.0+ service that emits battleship performance of a smart and dumb bot.

#WORKSPACE

https://github.com/RaeWinTan/battleship_workspace

# ABOUT

This is a Angular package to estimate the amount turns for the battleship 'smart bot' in  https://github.com/RaeWinTan/RXJSLearn (battleship branch) to finish a battleship game as compared to a less efficient 'dumb bot' that just shoots shots base on luck to win the game (using a random number generator).

## Demo
GAME: https://stackblitz.com/github/RaeWinTan/RXJSLearn/tree/battleship
Package in action in an Angular Project: https://raewintan.github.io/battleship_workspace/

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
| computerTurns | number | number of turns the smart bot took so sink all ships in the board of the current game
| playerTurns | number | number of turns the dumb bot took to sink all ships in the board of the current game
| games | number | number of games to simulate
| computerAvgTurns | number | running average number of turns smart bot needs to sink all ships in board
| playerAvgTurns | number | running average number of turns the dumb bot needs to sink all ships in board
| computerBetterBy | number | number of games to simulate


# GAME RULES

* Use this as reference: https://stackblitz.com/github/RaeWinTan/RXJSLearn/tree/battleship , after initialization, in stackblitz's terminal type `yarn run start`.
* During setup mode, the difference in length between the current ship being placed on the board and the prior ship is one unit. The current ship is smaller. The length of the first ship is the number of ships set in this program. (i.e. if you set the number of ships to 5, the ships placed on the board will be length 5, 4, 3....)     
* The player(smart bot/dumb bot) will know what is the length of the opponent's ship it shot down

# ABOUT THE CODE

* Both the dumb bot and the smart bot is playing against the same opponent's board
* The opponent board is generated randomly per game
* It is not considered a turn if the bot(smart/dumb) shoots a location it shot before

# ACCURACY
* For the most accurate result, all parameters to a high value
* Set grid size and ships to the same value
  * The greater the difference between grid size and ships the more inaccurate the result because the smart bot's probability to hit a ship in a less crowded grid is closer to the dumb bot.
* I ran the program in my computer with grid size, ships, games = 30. The smart bot uses about 16.5% less turns as compared to the dumb bot.
