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

export interface IFigure {
  type: FigureType;
  position: Position;
  isAlive: boolean;
  owner: Player;
  imgName: string;

  getPossibleMoves: () => Position[];
  move: (pos: Position) => void;
  drawYourself: () => void;
  removeYourself: () => void;
  setOnClick(func:(me:IFigure)=>void):void;
}

export class Pawn implements IFigure {
  type: FigureType;
  position: Position;
  isAlive: boolean;
  owner: Player;
  hasMoved: boolean;
  imgName: string;

  constructor(pos: Position, owner: Player) {
    this.type = FigureType.Pawn;
    this.position = pos;
    this.isAlive = true;
    this.owner = owner;
    this.hasMoved = false;
    this.imgName = "pawn.png";
  }

  setOnClick(func:(me:IFigure)=>void){
    const me = document.getElementById(
      `${this.position.x * 8 + this.position.y}`
    );
    me?.addEventListener('click', ()=>{
      func(this);
    });
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

  removeYourself() {
    // TODO implement removing
    const me = document.getElementById(
      `${this.position.x * 8 + this.position.y}`
    )!;
    me.innerHTML = "";
  }

  getPossibleMoves() {
    let answer: Position[] = new Array<Position>();
    var pos: Position;

    if (this.owner.color == Colors.White) {
      pos = new Position(this.position.x + 1, this.position.y);
      if (this.position.x < 7) {
        answer.push(pos);
      }

      if (!this.hasMoved) {
        pos = new Position(this.position.x + 2, this.position.y);
        if (this.position.x < 6) {
          answer.push(pos);
        }
      }
    } else {
      pos = new Position(this.position.x - 1, this.position.y);
      if (this.position.x > 0) {
        answer.push(pos);
      }

      if (!this.hasMoved) {
        pos = new Position(this.position.x - 2, this.position.y);
        if (this.position.x > 1) {
          answer.push(pos);
        }
      }
    }
    return answer;
  }

  move(end: Position): void {
    this.position = end;
    this.hasMoved = true;
  }
}
