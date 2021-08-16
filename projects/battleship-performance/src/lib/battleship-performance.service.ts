import { Injectable } from '@angular/core';
import {game$} from "./algorithm/code";
import {Observable} from "rxjs";

export interface BattleshipResult {
  games:number;
  computerAvgTurns:number;
  playerAvgTurns:number;
  computerTurns:number;
  playerTurns:number;
  computerBetterBy:number;
}

@Injectable({
  providedIn: 'root'
})


export class BattleshipPerformanceService {

  game(gridSize:number, shipsNo:number, iterations:number):Observable<BattleshipResult>{
    return game$(gridSize, shipsNo, iterations);
  }

}
