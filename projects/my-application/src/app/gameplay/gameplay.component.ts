import { Component, OnInit, Input, Renderer2, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {DomUpdater} from "./domupdater";
@Component({
  selector: 'app-gameplay',
  templateUrl: './gameplay.component.html',
  styleUrls: ['./gameplay.component.css']
})
export class GameplayComponent implements OnInit , AfterViewInit{
  @ViewChild("oppGrid") oppGrid:ElementRef<Node>

  constructor(public activeModal: NgbActiveModal, private r2:Renderer2) { }

  ngAfterViewInit(){
    //later chagne to input
    new DomUpdater(5, this.r2, this.oppGrid);
  }

  ngOnInit(): void {
  }

}
