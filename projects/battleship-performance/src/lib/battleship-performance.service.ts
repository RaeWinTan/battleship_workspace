import { Injectable } from '@angular/core';
import {game$} from "./algorithm/code";
import {Observable} from "rxjs";
import {BattleshipResult} from "./interfaces";



@Injectable({
  providedIn: 'root'
})


export class BattleshipPerformanceService {

  game(gridSize:number, shipsNo:number, iterations:number):Observable<BattleshipResult>{
    return game$(gridSize, shipsNo, iterations);
  }

}
