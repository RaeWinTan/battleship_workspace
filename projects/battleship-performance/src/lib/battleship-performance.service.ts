import { Injectable } from '@angular/core';
import {game$} from "./algorithm/code";
import {Observable} from "rxjs";
import {BattleshipResult, Battleship_performanceError} from "./interfaces";



@Injectable({
  providedIn: 'root'
})


export class BattleshipPerformanceService {

  game(gridSize:number, shipsNo:number, iterations:number):Observable<BattleshipResult|Battleship_performanceError>{
    return game$(gridSize, shipsNo, iterations);
  }

}
