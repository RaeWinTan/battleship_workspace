import {ShotClass} from "./shotsClass";
import { BehaviorSubject } from "rxjs";
import {ShipClassInterface} from "./shipclass";
import { randomNum} from "./constants";

interface NextBest {
  hitVal:number;
  possible: number[];
}

interface NextTry {
	 [shipLen: number]: NextBest[];
}

export class PlayerShotClass  extends ShotClass {
  _nextTry:NextTry = {};
  _shipProcessing:number[];
  constructor(oppShips:ShipClassInterface){
    super(oppShips);
    for(let i = 0; i < this._oppShips.shipsNo; i++) this._nextTry[i+1] = [];
    this._shipProcessing = [];
  }
  shoot(x:number, scoreBoard:BehaviorSubject<any>):boolean{
    x = x = randomNum(this._oppShips.gridSize*this._oppShips.gridSize);
    while(!super.shoot(x, scoreBoard)) x = randomNum(this._oppShips.gridSize*this._oppShips.gridSize);
    return true;
  }
}
