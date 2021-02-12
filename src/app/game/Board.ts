import { Square } from "./Square";
import { Piece } from "./Pieces/Piece";

export class Board {
  squares: Square[][] = [];

  constructor() {
    this.initializeBoard();
  }

  private initializeBoard() {
    const domSquares = document.getElementsByClassName("box");
    console.log(domSquares.length);
    for (let i = 0; i < 8; i++) {
      this.squares[i] = [];
      for (let j = 0; j < 8; j++) {
        console.log(domSquares.length);
        this.squares[i][j] = new Square(i, j);
        this.squares[i][j].domSqare = domSquares[i + 8 * j];
        this.squares[i][j].domSqare.innerHTML = String(i + 8 * j);
      }
    }
  }
}