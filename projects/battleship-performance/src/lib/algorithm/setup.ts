import { ShipClassInterface} from "./shipclass";
import {PlayerShotClass} from "./playerShotClass";
import {ComputerClass} from "./ComputerClass";
import { Boards } from "./interfaces";
import {ComputerShotClass} from "./computerShotClass";
import {interval, of} from "rxjs";
import {scan,
  map,takeWhile
} from "rxjs/operators";

export const initVal$ = (gridSize:number, shipsNo:number) => of({})
.pipe(map(_=>{
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
