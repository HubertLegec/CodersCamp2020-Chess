
import { IBoard } from "./Board";

export enum FigureType {
  King,
  Queen,
  Rook,
  Bishops,
  Knight,
  Pawn,
  None
}

export enum Colors {
  White,
  Black,
  None
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
  color: Colors;

  getPossibleMoves: (checker: IBoard) => Position[];
  move: (pos: Position) => void;
}

export class NoFigure implements IFigure{
  type: FigureType;
  position: Position;
  isAlive: boolean;
  color: Colors;

  constructor(pos:Position){
    this.type=FigureType.None;
    this.position=pos;
    this.isAlive=false;
    this.color=Colors.None;
  }

  getPossibleMoves(){
    return [];
  }
  move = ()=>{};

}

export class Pawn implements IFigure {
  type: FigureType;
  position: Position;
  isAlive: boolean;
  color: Colors;
  hasMoved: boolean;

  constructor(pos: Position, col: Colors) {
    this.type = FigureType.Pawn;
    this.position = pos;
    this.isAlive = true;
    this.color = col;
    this.hasMoved = false;
  }

  getPossibleMoves(checker: IBoard) {
    let answer: Position[] = new Array<Position>();
    var pos: Position;

    if (this.color == Colors.Black) {
      pos = new Position(this.position.x + 1, this.position.y);
      if (checker.isCellFree(pos) && this.position.x<7) {
        answer.push(pos);
      }

      if (!this.hasMoved) {
        pos = new Position(this.position.x + 2, this.position.y);
        if (checker.isCellFree(pos) && this.position.x<6) {
          answer.push(pos);
        }
      }
    } else {
      pos = new Position(this.position.x - 1, this.position.y);
      if (checker.isCellFree(pos) && this.position.x>0) {
        answer.push(pos);
      }

      if (!this.hasMoved) {
        pos = new Position(this.position.x - 2, this.position.y);
        if (checker.isCellFree(pos)&& this.position.x>1) {
          answer.push(pos);
        }
      }
    }
    return answer;
  }

  move(end: Position): void {
    this.position = end;
  }
}
