import { Component,  Input, Renderer2, AfterViewInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DomUpdater} from "./domupdater";
import {Ship, Shot} from "battleship-performance";
import {of, from, concat, merge, Observable, Subscription } from "rxjs";
import {tap, map, delay, concatMap, finalize } from "rxjs/operators";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-gameplay',
  templateUrl: './gameplay.component.html',
  styleUrls: ['./gameplay.component.css']
})
export class GameplayComponent implements AfterViewInit, OnDestroy{
  @Input() gridSize:number
  @Input() game:string
  @Input() oppBoard:Ship[]
  @Input() dumbShots:Shot[]
  @Input() smartShots:Shot[]

  @ViewChild("oppGrid") oppGrid:ElementRef<Node>
  @ViewChild("smartShot") smartShot:ElementRef<Node>
  @ViewChild("dumbShot") dumbShot:ElementRef<Node>

  status$:Subscription;

  constructor(public activeModal: NgbActiveModal, private r2:Renderer2, private toastr: ToastrService) { }


  ngAfterViewInit(){
    let d = new DomUpdater(this.gridSize, this.r2, this.oppGrid, this.smartShot, this.dumbShot);
    let shotDraw = (s:Observable<Shot>, name:string) => s.pipe(
      concatMap(
        (x:Shot)=>of({x}).pipe(
          tap(_=>{
            if(x.hit) d.changeGridItem(x.pos, name, x.shipLen);
            else d.changeGridItem(x.pos, name, 0);
          })
          ,delay(1000)
        )
      ),
      finalize(()=>{

        if(name==="smart") this.toastr.success(`TURNS: ${this.smartShots.length}`, 'SmartBot won', {timeOut: 3000,positionClass:"toast-bottom-left"});
        else this.toastr.warning(`TURNS: ${this.dumbShots.length}`, 'DumbBot Won', {timeOut: 3000,positionClass:"toast-bottom-right"});
      })
    );
    let drawoppBoard$ = from(this.oppBoard).pipe(
      map((x:Ship)=>x.pos),
      tap((x:number[])=>{
        for(let i of x){
          d.changeGridItem(i, "opp", x.length);
        }
      })
    );
    this.status$ = concat(drawoppBoard$, merge(shotDraw(from(this.smartShots), "smart"), shotDraw(from(this.dumbShots), "dumb"))).subscribe();


  }
  ngOnDestroy():void{
    this.status$.unsubscribe();
  }


}
