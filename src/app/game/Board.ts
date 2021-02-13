import { Square } from "./Square";
import { Pawn } from "./Pieces/Pawn";
import { PieceType } from "./Pieces/PieceType";
import { Game } from "./Game";
<<<<<<< HEAD
import { Move } from "./Move";
=======
import { Knight } from "./Pieces/Knight";
>>>>>>> 5dcc19b87d8bb52beed89be7a63b4ab4e963d977

export class Board {
  private game: Game;
  private squares: Square[][] = [];
  private selectedSquares: Square[] = [];

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
    //check if the click intends to select piece and assign it as 1st click
      if (square.getPiece() != null && square.getPiece().isWhite() == this.game.getCurrentTurn().isWhiteSide()) {
        this.selectedSquares[0] = square;
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
      this.squares[1][i].getDomSquare().innerHTML = PieceType.White_Pawn;

      this.squares[6][i].setPiece(new Pawn(false));
      this.squares[6][i].getDomSquare().innerHTML = PieceType.Black_Pawn;
    }
    this.squares[0][1].setPiece(new Knight(true));
    this.squares[0][1].getDomSquare().innerHTML = PieceType.White_Knight;
    this.squares[0][6].setPiece(new Knight(true));
    this.squares[0][6].getDomSquare().innerHTML = PieceType.White_Knight;

    this.squares[7][1].setPiece(new Knight(false));
    this.squares[7][1].getDomSquare().innerHTML = PieceType.Black_Knight;
    this.squares[7][6].setPiece(new Knight(false));
    this.squares[7][6].getDomSquare().innerHTML = PieceType.Black_Knight;
  }

  getSquares():Square[][]{
    return this.squares;
  }

  getRecentMoveInGame():Move{
    return this.game.getRecentMove();
  }
}
