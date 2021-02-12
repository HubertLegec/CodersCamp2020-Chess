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
    for (let i = 7; i >= 0; i--) {
      this.squares[i] = [];
      for (let j = 7; j >= 0; j--) {
        this.squares[i][j] = new Square(Math.abs(i - 7), j);
        this.squares[i][j].setDomSquare(domSquares[Math.abs(i - 7) + 8 * j]);
        //sqare numeration to be changed
        this.squares[i][j].getDomSquare().innerHTML = String(Math.abs(i - 7) + 8 * Math.abs(j - 7));
      }
    }
    console.log(this.squares)
    this.initializePieces();
  }

  private initializePieces() {
    for (let i = 0; i < 8; i++) {
      this.squares[i][1].setPiece(new Pawn(false));
      this.squares[i][1].getDomSquare().innerHTML = PieceType.Pawn;

      this.squares[i][6].setPiece(new Pawn(true));
      this.squares[i][6].getDomSquare(). innerHTML = PieceType.Pawn;
    }
  }
}
