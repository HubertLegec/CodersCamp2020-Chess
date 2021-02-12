import { Square } from "./Square";
import { Pawn } from "./Pieces/Pawn";
import{PieceType} from './Pieces/PieceType';

export class Board {
  squares: Square[][] = [];

  constructor() {
    this.initializeBoard();
  }

  private initializeBoard() {
    const domSquares = document.getElementsByClassName("box");
    for (let i = 0; i < 8; i++) {
      this.squares[i] = [];
      for (let j = 0; j < 8; j++) {
        this.squares[i][j] = new Square(i, j);
        this.squares[i][j].domSqare = domSquares[i + 8 * j];
        //sqare numeration to be changed
        this.squares[i][j].domSqare.innerHTML = String(i + 8 * j);
      }
    }
        this.initializePieces();
  }

  private initializePieces() {
    for (let i = 0; i < 8; i++) {
      this.squares[i][1].piece = new Pawn(true);
      this.squares[i][1].domSqare.innerHTML = PieceType.Pawn;
    }
  }
}
