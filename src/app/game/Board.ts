import { Square } from "./Square";
import { Pawn } from "./Pieces/Pawn";
import { PieceType } from "./Pieces/PieceType";
import { Game } from "./Game";

export class Board {
  game: Game;
  squares: Square[][] = [];
  selectedSquares: Square[] = [];

  constructor(game: Game) {
    this.game = game;
    this.initializeBoard();
  }

  private initializeBoard() {
    const domSquares = document.getElementsByClassName("box");
    for (let i = 7; i >= 0; i--) {
      this.squares[i] = [];
      for (let j = 7; j >= 0; j--) {
        this.squares[i][j] = new Square(i, j);
        this.squares[i][j].setDomSquare(domSquares[Math.abs(i - 7) * 8 + j]);
        this.assignEventListener(this.squares[i][j]);
      }
    }
    this.initializePieces();
  }

  assignEventListener(square: Square) {
    square
      .getDomSquare()
      .addEventListener("click", () => this.clickHandler(square));
  }

  clickHandler(square: Square) {
    console.log(this.selectedSquares);

    //check if the click intends to select piece and assign it as 1st click
      if (square.getPiece() != null && square.getPiece().isWhite() == this.game.getCurrentTurn().isWhiteSide()) {
        this.selectedSquares[0] = square;
        //log do wywalenia
        console.log(this.selectedSquares);
      }
    
    //check if the click intends to select destination and assign it as 2nd click
    if (this.selectedSquares.length) {
      if (square.getPiece() == null || (square.getPiece().isWhite() != this.game.getCurrentTurn().isWhiteSide()) ) {
          this.selectedSquares[1]=square;
          this.game.getCurrentTurn().playedMove(this.selectedSquares[0], this.selectedSquares[1], this.game);
        this.selectedSquares = [];
      }
    }
  }

  private initializePieces() {
    for (let i = 0; i < 8; i++) {
      this.squares[1][i].setPiece(new Pawn(true));
      this.squares[1][i].getDomSquare().innerHTML = PieceType.Pawn;

      this.squares[6][i].setPiece(new Pawn(false));
      this.squares[6][i].getDomSquare().innerHTML = PieceType.Pawn;
    }
  }
}
