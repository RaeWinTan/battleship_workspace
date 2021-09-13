export interface BattleshipResult {
  games:number;
  computerTurns:number;
  playerTurns:number;
}

export class Battleship_performanceError extends Error{

  constructor(message:string){
    super(message);
    this.name = "Battleship_performanceError";
  }

}
