import { Square } from "./Square";
import { Pawn } from "./Pieces/Pawn";
import { PieceType } from "./Pieces/PieceType";
import { Game } from "./Game";
import { Knight } from "./Pieces/Knight";
import { Bishop } from "./Pieces/Bishop";
import { Rook } from "./Pieces/Rook";
import { Queen } from "./Pieces/Queen";
import { King } from "./Pieces/King";
import { Piece } from "./Pieces/Piece";

export class Board {
  private game: Game;
  private squares: Square[][] = [];
  private selectedSquares: Square[] = [];
  highlightedSquares: Square[] = [];

  constructor(game: Game) {
    this.game = game;
    this.initializeBoard();
  }

  private initializeBoard() {
    const domSquares = document.getElementById("board").getElementsByClassName("box");
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

      if(square != this.selectedSquares[0]){
        this.clearHighlightedSquares();
      }
      this.selectedSquares[0] = square;
      this.highlightSquares();
    }

    //check if the click intends to select destination and assign it as 2nd click
    if (this.selectedSquares.length) {
      if (square.getPiece() == null || square.getPiece().isWhite() != this.game.getCurrentTurn().isWhiteSide()) {
        this.selectedSquares[1] = square;
        this.game.getCurrentTurn().playedMove(this.selectedSquares[0], this.selectedSquares[1], this.game);
        this.clearHighlightedSquares();
        this.selectedSquares = [];
      }
    }
  }

  highlightSquares() {
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        let selectedPiece: Piece = this.selectedSquares[0].getPiece();
        if (selectedPiece.canMove(this.selectedSquares[0], this.getSquares()[i][j], this)) {
          this.getSquares()[i][j].getDomSquare().style.background = "green"
          if(this.getSquares()[i][j].getPiece() && (this.getSquares()[i][j].getPiece().isWhite() != this.game.getCurrentTurn().isWhiteSide())){
            this.getSquares()[i][j].getDomSquare().style.background = "red";
          }
          this.highlightedSquares.push(this.getSquares()[i][j]);
        }
      }
    }
  }

  clearHighlightedSquares() {
    this.highlightedSquares.forEach((element) => {
      element.getDomSquare().style.background = "";
    });
    this.highlightedSquares = [];
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
    this.squares[0][2].setPiece(new Bishop(true));
    this.squares[0][2].getDomSquare().innerHTML = PieceType.White_Bishop;
    this.squares[0][5].setPiece(new Bishop(true));
    this.squares[0][5].getDomSquare().innerHTML = PieceType.White_Bishop;
    this.squares[0][0].setPiece(new Rook(true));
    this.squares[0][0].getDomSquare().innerHTML = PieceType.White_Rook;
    this.squares[0][7].setPiece(new Rook(true));
    this.squares[0][7].getDomSquare().innerHTML = PieceType.White_Rook;
    this.squares[0][3].setPiece(new Queen(true));
    this.squares[0][3].getDomSquare().innerHTML = PieceType.White_Queen;
    this.squares[0][4].setPiece(new King(true));
    this.squares[0][4].getDomSquare().innerHTML = PieceType.White_King;

    this.squares[7][1].setPiece(new Knight(false));
    this.squares[7][1].getDomSquare().innerHTML = PieceType.Black_Knight;
    this.squares[7][6].setPiece(new Knight(false));
    this.squares[7][6].getDomSquare().innerHTML = PieceType.Black_Knight;
    this.squares[7][2].setPiece(new Bishop(false));
    this.squares[7][2].getDomSquare().innerHTML = PieceType.Black_Bishop;
    this.squares[7][5].setPiece(new Bishop(false));
    this.squares[7][5].getDomSquare().innerHTML = PieceType.Black_Bishop;
    this.squares[7][0].setPiece(new Rook(false));
    this.squares[7][0].getDomSquare().innerHTML = PieceType.Black_Rook;
    this.squares[7][7].setPiece(new Rook(false));
    this.squares[7][7].getDomSquare().innerHTML = PieceType.Black_Rook;
    this.squares[7][3].setPiece(new Queen(false));
    this.squares[7][3].getDomSquare().innerHTML = PieceType.Black_Queen;
    this.squares[7][4].setPiece(new King(false));
    this.squares[7][4].getDomSquare().innerHTML = PieceType.Black_King;
  }

  getSquares(): Square[][] {
    return this.squares;
  }

  getGame() {
    return this.game;
  }
}
