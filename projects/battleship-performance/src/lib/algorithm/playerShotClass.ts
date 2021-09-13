import {ShotClass} from "./shotsClass";
import { BehaviorSubject } from "rxjs";
import {ShipClassInterface} from "./shipclass";
import { randomNum} from "./constants";

export class PlayerShotClass  extends ShotClass {
  constructor(oppShips:ShipClassInterface){
    super(oppShips);
  }
  shoot(x:number, scoreBoard:BehaviorSubject<any>):boolean{
    x = x = randomNum(this._oppShips.gridSize*this._oppShips.gridSize);
    while(!super.shoot(x, scoreBoard)) x = randomNum(this._oppShips.gridSize*this._oppShips.gridSize);
    return true;
  }
}
