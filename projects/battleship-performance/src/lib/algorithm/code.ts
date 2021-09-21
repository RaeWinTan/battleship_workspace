

import { Boards } from "./interfaces";
import { concat, of, throwError} from "rxjs";
import { setUp$, initVal$ } from "./setup";
import {shots$} from "./shots";
import { switchMap, repeat, last,scan, catchError,tap, concatMap} from "rxjs/operators";
import {Battleship_performanceError, ShotInterface,BattleshipResult, Ship} from "../interfaces";
/*
map(_=>{
  if(Number.isNaN(shipsNo) || Number.isNaN(gridSize) || Number.isNaN(iterations))  throw new Battleship_performanceError("All parameters must not be NaN");
  if(shipsNo <=0 || gridSize <=0 || iterations <= 0)  throw new Battleship_performanceError("All parameters must be above 0");
  if(gridSize < shipsNo) throw new Battleship_performanceError("gridSize cannot be less than shipsNo");
  return;
}),
catchError((err:Battleship_performanceError)=> {
  return throwError(err)
})
*/
const checkNan=(n:number):boolean => ""+n === "undefined";
export const game$= (gridSize:number, shipsNo:number, iterations:number) =>
of({}).pipe(
  tap(_=>{
    if(checkNan(shipsNo) || checkNan(gridSize) ||checkNan(iterations))  throw new Battleship_performanceError("All parameters must be filled");
    if(shipsNo <=0 || gridSize <=0 || iterations <= 0)  throw new Battleship_performanceError("All parameters must be above 0");
    if(gridSize < shipsNo) throw new Battleship_performanceError("gridSize cannot be less than shipsNo");
  }),
  catchError((err:Battleship_performanceError)=> {
    return throwError(err)
  }),
  concatMap(_=>
  initVal$(gridSize, shipsNo, iterations).pipe(
    switchMap((initial:Boards)=>concat(setUp$(initial), shots$(initial))),
    last(),
    scan<{oppBoard:Ship[],computerStatus:ShotInterface, playerStatus:ShotInterface},BattleshipResult>((acc:BattleshipResult, curr:any)=>{
        acc.games++;
        acc.computerStatus = curr.computerStatus;
        acc.playerStatus = curr.playerStatus;
        acc.oppBoard = curr.oppBoard;
        return acc;
    },{games:0, computerStatus:{turns:0, shots:[]}, playerStatus:{turns:0, shots:[]}, oppBoard:[]}),
    repeat(iterations))
))
