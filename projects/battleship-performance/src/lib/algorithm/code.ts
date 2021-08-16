

import { Boards } from "./interfaces";
import { concat} from "rxjs";
import { setUp$, initVal$ } from "./setup";
import {shots$} from "./shots";
import {map, switchMap, repeat, last,scan} from "rxjs/operators";
import {BattleshipResult} from "../interfaces";


export const game$= (gridSize:number, shipsNo:number, iterations:number) =>
initVal$(gridSize, shipsNo, iterations).pipe(
  switchMap((initial:Boards)=>concat(setUp$(initial), shots$(initial))),
  last(),
  scan<{computerTurns:number, playerTurns:number},BattleshipResult>((acc:BattleshipResult, curr:any)=>{
      acc.games++;
      acc.computerAvgTurns = ((acc.computerAvgTurns)*(acc.games-1)+curr.computerTurns)/acc.games;
      acc.playerAvgTurns = (acc.playerAvgTurns*(acc.games-1)+curr.playerTurns)/acc.games;
      acc.computerBetterBy = ((acc.playerAvgTurns-acc.computerAvgTurns)/acc.playerAvgTurns) * 100;
      acc.computerTurns = curr.computerTurns;
      acc.playerTurns = curr.playerTurns;
      return acc;
  },{games:0, computerAvgTurns:0, playerAvgTurns:0, computerBetterBy:0, computerTurns:0, playerTurns:0}),
  repeat(iterations)
);
