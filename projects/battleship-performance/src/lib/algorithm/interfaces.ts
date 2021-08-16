import { ShipClassInterface } from "./shipclass";
import {ShotClassInterface} from "./shotsClass";

export interface Boards{
  shipsNo:number;
  gridSize:number;
  board:ShipClassInterface;
  playerShot: ShotClassInterface;
  computerShot: ShotClassInterface;
}
