
import { ShotClassInterface} from "./shotsClass";
import { Boards } from "./interfaces";


import {BehaviorSubject, forkJoin, interval, of} from "rxjs";
import {tap,
  takeWhile,
  scan,
  map
} from "rxjs/operators";


//initialize the pScore and cSccore()


//the shots$ will return [total computer shots, total player shots]
export const shots$ = (b:Boards)=>{
  function initScore():any{
    let r:any = {};
    for(let i =0; i<b.shipsNo; i++){
      r[i+1] = i+1;
    }
    return r;
  }

  const pScore = new BehaviorSubject<any>(initScore());
  const cScore = new BehaviorSubject<any>(initScore());

  const oppBoard$ = of(b.board.shipman.ships);

  const computerShot$= (c:ShotClassInterface)=>interval().pipe(
    takeWhile(_=>!(Object.values(cScore.value).filter((x:number)=> x !== 0).length === 0)),
    scan((acc:any,curr:any)=> ++acc, 0),
    tap(_=>c.shoot(0, cScore)),
    map((x:number)=>{
        return {turns:x, shots:c.shots};
    })
  )
  ;

  const playerShot$ = (p:ShotClassInterface) => interval().pipe(
    takeWhile(_=>!(Object.values(pScore.value).filter((x:number)=> x !== 0).length === 0)),
    scan((acc:number)=> ++acc, 0),
    tap(_=>p.shoot(0, pScore)),
    map((x:number)=>{
        return {turns:x, shots:p.shots};
    })
  );



  return forkJoin({ oppBoard:oppBoard$ ,computerStatus:computerShot$(b.computerShot), playerStatus:playerShot$(b.playerShot)});
}
