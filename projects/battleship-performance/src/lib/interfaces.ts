import {Ship} from "./algorithm/shipclass";
import {Shot} from "./algorithm/shotsClass";
export {Ship, Shot};


export interface BattleshipResult {
  games:number;
  computerStatus:ShotInterface;
  playerStatus:ShotInterface;
  oppBoard:Ship[];

}

export interface ShotInterface{
  turns:number;
  shots:Shot[];
}

export class Battleship_performanceError extends Error{

  constructor(message:string){
    super(message);
    this.name = "Battleship_performanceError";
  }

}
