import { IFigure, FigureType, Position, Pawn, Colors, NoFigure } from "./Figure";
import { Cell } from "./Cell";

export interface IBoard {
  board: Array<Array<Cell>>;

  isCellFree: (pos: Position) => boolean;
  getCell: (pos: Position) => Cell;
}

export class Board implements IBoard {
  board: Array<Array<Cell>>;

  constructor() {
    this.board = new Array<Array<Cell>>(8);
    this.initBoard();
  }

  initBoard(): void {

    for (let i = 0; i < 8; i++) {
      this.board[i] = new Array<Cell>(8);
    }

    for(let i=0; i<8;i++){
      for(let j=0;j<8;j++){
        if (i==1){
          this.board[i][j] = new Cell(new Pawn(new Position(i, j), Colors.Black));
        }
        else if(i==6){
          this.board[i][j] = new Cell(new Pawn(new Position(i, j), Colors.White));
        }else{
          this.board[i][j] = new Cell(new NoFigure(new Position(i,j)));
        }
      }
    }
  }

  getCell(pos: Position): Cell {
    return this.board[pos.x][pos.y];
  }

  isCellFree(pos: Position): boolean {
    return this.getCell(pos).figure.type == FigureType.None;
  }
}
