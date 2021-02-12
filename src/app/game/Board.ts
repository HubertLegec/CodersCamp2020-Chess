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
        this.squares[i][j].setDomSquare(domSquares[Math.abs(i - 7) *8 + j]);
      }
    }
    console.log(this.squares)
    this.initializePieces();
  }

  private initializePieces() {
    for (let i = 0; i < 8; i++) {
      this.squares[1][i].setPiece(new Pawn(true));
      this.squares[1][i].getDomSquare().innerHTML = PieceType.Pawn;

      this.squares[6][i].setPiece(new Pawn(true));
      this.squares[6][i].getDomSquare(). innerHTML = PieceType.Pawn;
    }
  }
}
