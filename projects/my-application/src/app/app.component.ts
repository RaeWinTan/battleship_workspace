import { Component, AfterViewInit } from '@angular/core';
import {BattleshipPerformanceService, BattleshipResult, Battleship_performanceError} from "battleship-performance";
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import {scan} from "rxjs/operators";
import {GameplayComponent} from "./gameplay/gameplay.component";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements AfterViewInit{
  gridSize:number;
  shipsNo:number;
  iterations:number;
  eff:number;
  public lineChartData: ChartDataSets[] = [
     { data: [], label: 'Smart bot Turns' },
     { data: [],label:'Dumb bot Turns'}
   ];
  public lineChartLabels: Label[] = [

   ];
   public lineChartOptions: ChartOptions = {
     responsive: false
   };
   public lineChartColors: Color[] = [
     {
       borderColor: 'red',
       backgroundColor: 'rgba(255,0,0,0.3)'
     },
     {
       borderColor: 'blue',
       backgroundColor: 'rgba(0,0,255,0.3)'
     }
   ];
   public lineChartLegend = true;
   public lineChartType = 'line';
   public lineChartPlugins = [];
  constructor(private bps:BattleshipPerformanceService, private modalService: NgbModal){
    this.eff = 0;
  }
  ngAfterViewInit(){
    this.openModal();
  }
  testClick(e){
    if (e.active.length > 0) {
      const chart = e.active[0]._chart;
      const activePoints = chart.getElementAtEvent(e.event);
      if ( activePoints.length > 0) {
        const clickedElementIndex = activePoints[0]._index;
        const label = chart.data.labels[clickedElementIndex];
        const value = chart.data.datasets[0].data[clickedElementIndex];
        console.log(clickedElementIndex, label, value);
        this.openModal();
      }
    }
  }
  openModal(){
    const modalRef = this.modalService.open(GameplayComponent,{ size: 'xl' });
    //modalRef.componentInstance.name = 'World';
  }
  start(){
    this.lineChartData[0].data=[];
    this.lineChartData[1].data=[];
    this.lineChartLabels=[];
     this.bps.game(this.gridSize, this.shipsNo,this.iterations).pipe(
        scan<BattleshipResult, any>((acc:any, curr:BattleshipResult)=>{
          acc.games = curr.games;
          acc.computerTurns = curr.computerTurns;
          acc.playerTurns = curr.playerTurns;
          acc.computerAvgTurns = ((acc.computerAvgTurns)*(acc.games-1)+curr.computerTurns)/acc.games;
          acc.playerAvgTurns = (acc.playerAvgTurns*(acc.games-1)+curr.playerTurns)/acc.games;
          acc.computerBetterBy = ((acc.playerAvgTurns-acc.computerAvgTurns)/acc.playerAvgTurns) * 100;
          return acc;
        },{computerAvgTurns:0, playerAvgTurns:0, computerBetterBy:0, games:0, computerTurns:0, playerTurns:0})
     )
     .subscribe(
        (c:any)=>{
          this.lineChartData[0].data.push(c.computerTurns);
          this.lineChartData[1].data.push(c.playerTurns);
          this.lineChartLabels.push(`${c.games}`);
          this.eff = c.computerBetterBy;
          //here we need to store some data

        },
        (err:Battleship_performanceError)=>{
          alert(err.message);
        }
      );
  }



}
