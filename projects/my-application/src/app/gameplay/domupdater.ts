import {Renderer2, ElementRef} from "@angular/core";

export class DomUpdater{
  constructor(private n:number,private r2:Renderer2, private oppGrid:ElementRef<Node>, private smartShot:ElementRef<Node>, private dumbShot:ElementRef<Node>){
    this.setUpGrid();
  }
  changeGridItem(id:number, name:string, val:number){
    document.getElementById(`${id}${name}`).innerHTML = `${val}`;
  }
  setUpGrid(){
    let o = 0;
    this.r2.setStyle(this.oppGrid.nativeElement, "grid-template-columns", `repeat(${this.n}, auto)`);
    this.r2.setStyle(this.smartShot.nativeElement, "grid-template-columns", `repeat(${this.n}, auto)`);
    this.r2.setStyle(this.smartShot.nativeElement, "background-color", `rgba(255,0,0,0.3)`);

    this.r2.setStyle(this.dumbShot.nativeElement, "grid-template-columns", `repeat(${this.n}, auto)`);
    this.r2.setStyle(this.dumbShot.nativeElement, "background-color", `rgba(0,0,255,0.3)`);
    //rgba(255,0,0,0.3)
    while(o< this.n){
      let i = 0
      while(i < this.n){
        let id = this.idGen(i++, o);
        this.genItem(this.oppGrid, id, "opp");
        this.genItem(this.smartShot, id, "smart");
        this.genItem(this.dumbShot, id, "dumb");
      }
      ++o;
    }
  }
  private genItem(doc:ElementRef<Node>, id:number, name:string){
    let oppItem:Node = this.r2.createElement("div");
    let oppEle:Node = this.r2.createElement("div");
    let oppDummy:Node = this.r2.createElement("div");
    this.r2.addClass(oppDummy,"dummy");
    this.r2.addClass(oppEle,"element");
    this.r2.addClass(oppItem,"grid-item");
    this.r2.setProperty(oppEle, "id", `${id}${name}`);
    oppItem.appendChild(oppEle);
    oppItem.appendChild(oppDummy);
    doc.nativeElement.appendChild(oppItem);
  }
  private idGen(x:number, y:number):number{
    if(y === 0){
      return x+1;
    }
    if(x===0){
      return this.n*y+1;
    }
    return (y*this.n)+x+1
  }
}
