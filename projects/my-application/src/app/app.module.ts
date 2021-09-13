import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BattleshipPerformanceService} from "battleship-performance";
import { ChartsModule } from 'ng2-charts';
import { GameplayComponent } from './gameplay/gameplay.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    GameplayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ChartsModule,
    FormsModule,
    NgbModule
  ],
  providers: [  BattleshipPerformanceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
