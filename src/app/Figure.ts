import { Player } from "./Player";

export enum FigureType {
  Pawn,
  Knight,
  Bishop,
  Rook,
  Queen,
  King,
}

export enum Colors {
  White,
  Black,
}

export class Position {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }
}

export abstract class IFigure {
  abstract type:FigureType
  position: Position;
  isAlive: boolean;
  owner: Player;
  hasMoved:boolean;

  constructor(pos:Position, owner:Player){
    this.position = pos;
    this.isAlive = true;
    this.owner = owner;
    this.hasMoved = false;
  }

  move(end:Position){
    this.position = end;
    this.hasMoved = true;
  }
  abstract drawYourself():void;

  removeYourself() {
    // TODO implement removing
    const me = document.getElementById(
      `${this.position.x * 8 + this.position.y}`
    )!;
    me.innerHTML = "";
  }

  setOnClick(func:(me:IFigure)=>void){
    const me = document.getElementById(
      `${this.position.x * 8 + this.position.y}`
    );
    me?.addEventListener('click', ()=>{
      func(this);
    });
  }
}

export class Pawn extends IFigure {
  type: FigureType;

  constructor(pos: Position, owner: Player) {
    super(pos, owner);
    this.type = FigureType.Pawn;

  }

  drawYourself() {
    // TODO implement drawing
    const me = document.getElementById(
      `${this.position.x * 8 + this.position.y}`
    )!;
    // TODO ustaw czcionkę pionka
    me.innerHTML = `<i class="fas fa-chess-pawn" style="font-size: 30px;  color:${
      this.owner.color == Colors.Black ? "black" : "white"
    }"></i>`;
    me?.setAttribute("style", "text-align:center;");
  }
}

export class Rook extends IFigure{
  type: FigureType;

  constructor(pos:Position, owner:Player){
    super(pos, owner);
    this.type = FigureType.Rook;
  }

  drawYourself() {
    // TODO implement drawing
    const me = document.getElementById(
      `${this.position.x * 8 + this.position.y}`
    )!;
    // TODO ustaw czcionkę pionka
    me.innerHTML = `<i class="fas fa-chess-rook" style="font-size: 30px;  color:${
      this.owner.color == Colors.Black ? "black" : "white"
    }"></i>`;
    me?.setAttribute("style", "text-align:center;");
  }
}

export class Bishop extends IFigure{
  type:FigureType;

  constructor(pos:Position, owner:Player){
    super(pos, owner);
    this.type = FigureType.Bishop;
  }

  drawYourself(): void {
    
    const me = document.getElementById(
      `${this.position.x * 8 + this.position.y}`
    )!;
    
    me.innerHTML = `<i class="fas fa-chess-bishop" style="font-size: 30px;  color:${
      this.owner.color == Colors.Black ? "black" : "white"
    }"></i>`;
    me?.setAttribute("style", "text-align:center;");
  }
  
}

export class Knight extends IFigure{
  type:FigureType;

  constructor(pos:Position, owner:Player){
    super(pos, owner);
    this.type = FigureType.Knight
  }

  drawYourself(){

    const me = document.getElementById(
      `${this.position.x * 8 + this.position.y}`
    )!;
    // TODO ustaw czcionkę pionka
    me.innerHTML = `<i class="fas fa-chess-knight" style="font-size: 30px;  color:${
      this.owner.color == Colors.Black ? "black" : "white"
    }"></i>`;
    me?.setAttribute("style", "text-align:center;");
  }

}