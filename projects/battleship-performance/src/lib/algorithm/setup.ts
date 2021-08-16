import { ShipClassInterface} from "./shipclass";
import {PlayerShotClass} from "./playerShotClass";
import {ComputerClass} from "./ComputerClass";
import { Boards } from "./interfaces";
import {ComputerShotClass} from "./computerShotClass";
import {interval, of, throwError} from "rxjs";
import {scan,
  map,takeWhile,catchError
} from "rxjs/operators";
import { Battleship_performanceError} from "../interfaces";
export const initVal$ = (gridSize:number, shipsNo:number, iterations:number) => of({})
.pipe(
  map(_=>{
    if(Number.isNaN(shipsNo) || Number.isNaN(gridSize) || Number.isNaN(iterations))  throw new Battleship_performanceError("All parameters must not be NaN");
    if(shipsNo <=0 || gridSize <=0 || iterations <= 0)  throw new Battleship_performanceError("All parameters must be above 0");
    if(gridSize < shipsNo) throw new Battleship_performanceError("gridSize cannot be less than shipsNo");
    return;
  }),
  catchError((err:Battleship_performanceError)=> {
    return throwError(err)
  }),
  map(_=>{
    var cc:ShipClassInterface = new ComputerClass({ships:[], allPos:[]}, gridSize, shipsNo);
    return {
      "gridSize":gridSize,
      "shipsNo":shipsNo,
      board:cc,
      playerShot: new PlayerShotClass(cc),
      computerShot: new ComputerShotClass(cc)
    };
})
);


const computerSetup$ = (sci:ShipClassInterface, gridSize:number, ships:number) =>
  interval().pipe(
    map(_=> Math.floor(Math.random() * (gridSize*gridSize)) + 1),
    scan<number, ShipClassInterface>((acc:ShipClassInterface, curr:number)=> acc.add(curr),sci),
    takeWhile((x:ShipClassInterface) => x.shipman.ships.length < ships)
  );

export const setUp$ = (initial:Boards) => computerSetup$(initial.board, initial.gridSize, initial.shipsNo);
