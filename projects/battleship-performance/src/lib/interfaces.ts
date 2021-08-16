export interface BattleshipResult {
  games:number;
  computerAvgTurns:number;
  playerAvgTurns:number;
  computerTurns:number;
  playerTurns:number;
  computerBetterBy:number;
}

export class Battleship_performanceError extends Error{

  constructor(message:string){
    super(message);
    this.name = "Battleship_performanceError";
  }

}
