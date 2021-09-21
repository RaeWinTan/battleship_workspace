import { Component, AfterViewInit } from '@angular/core';
import {BattleshipPerformanceService, BattleshipResult, Battleship_performanceError, ShotInterface} from "battleship-performance";
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import {scan} from "rxjs/operators";
import {GameplayComponent} from "./gameplay/gameplay.component";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
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
  gameData:any[];
  showHelp:boolean = false;

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
  constructor(private bps:BattleshipPerformanceService, private modalService: NgbModal,private toastr:ToastrService){
    this.eff = 0;
    this.gameData = [];
  }
  ngAfterViewInit(){

  }
  testClick(e){
    if (e.active.length > 0) {
      const chart = e.active[0]._chart;
      const activePoints = chart.getElementAtEvent(e.event);
      if ( activePoints.length > 0) {
        const clickedElementIndex = activePoints[0]._index;
        const label = chart.data.labels[clickedElementIndex];
        const value = chart.data.datasets[0].data[clickedElementIndex];
        this.openModal(clickedElementIndex, label);
      }
    }
  }
  openModal(index:number, lable:string){
    //{ scrollable: true }
    const modalRef = this.modalService.open(GameplayComponent,{ size: 'xl', scrollable: true });
    modalRef.componentInstance.gridSize = this.gridSize;
    modalRef.componentInstance.game = lable;
    modalRef.componentInstance.oppBoard = this.gameData[index].oppBoard;
    modalRef.componentInstance.dumbShots = this.gameData[index].dumbShots;
    modalRef.componentInstance.smartShots = this.gameData[index].smartShots;
  }
  start(){
    this.gameData = [];
    this.lineChartData[0].data=[];
    this.lineChartData[1].data=[];
    this.lineChartLabels=[];
     this.bps.game(this.gridSize, this.shipsNo,this.iterations).pipe(
        scan<BattleshipResult, any>((acc:any, curr:BattleshipResult)=>{
          acc.games = curr.games;
          acc.computerStatus = curr.computerStatus;
          acc.playerStatus = curr.playerStatus;
          acc.oppBoard = curr.oppBoard;
          acc.computerAvgTurns = ((acc.computerAvgTurns)*(acc.games-1)+curr.computerStatus.turns)/acc.games;
          acc.playerAvgTurns = (acc.playerAvgTurns*(acc.games-1)+curr.playerStatus.turns)/acc.games;
          acc.computerBetterBy = ((acc.playerAvgTurns-acc.computerAvgTurns)/acc.playerAvgTurns) * 100;
          return acc;
        },{computerAvgTurns:0, playerAvgTurns:0, computerBetterBy:0, games:0, computerStatus:{turns:0, shots:[]}, playerStatus:{turns:0, shots:[]}, oppBoard:[]})
     )
     .subscribe(
        (c:any)=>{

          this.lineChartData[0].data.push(c.computerStatus.turns);
          this.lineChartData[1].data.push(c.playerStatus.turns);
          this.lineChartLabels.push(`${c.games}`);
          this.eff = c.computerBetterBy;
          //here need the json deep copy or else its the same rerferemente
          c = JSON.parse(JSON.stringify(c));
          this.gameData.push({game:c.games, oppBoard:c.oppBoard, smartShots:c.computerStatus.shots, dumbShots:c.playerStatus.shots});
        }
        ,
        (err:Battleship_performanceError)=>{
          this.toastr.error(err.message, "Error",{timeOut: 3000,positionClass:"toast-top-center"});
        }
      );
  }



}
