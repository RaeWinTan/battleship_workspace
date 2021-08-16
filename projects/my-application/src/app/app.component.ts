import { Component } from '@angular/core';
import {BattleshipPerformanceService, BattleshipResult} from "battleship-performance";
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  bps:any;
  gridSize:number;
  shipsNo:number;
  iterations:number;
  public lineChartData: ChartDataSets[] = [
     { data: [], label: 'Computer Turns' },
     { data: [],label:'Player Turns'}
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
  constructor(bps:BattleshipPerformanceService){
    this.bps = bps;
  }
  start(){
    this.lineChartData[0].data=[];
    this.lineChartData[1].data=[];
    this.lineChartLabels=[];
     this.bps.game(this.gridSize, this.shipsNo,this.iterations).subscribe(
        (c:BattleshipResult)=>{
          this.lineChartData[0].data.push(c.computerTurns);
          this.lineChartData[1].data.push(c.playerTurns);
          this.lineChartLabels.push(`${c.games}`);
        }
      );
  }



}