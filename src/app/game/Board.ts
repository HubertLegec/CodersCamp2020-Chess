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
import {drawImage} from "../display/DrawPiece";

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
    for (let i = 0; i < 8 ; i++) {
      this.squares[i] = [];
      for (let j = 0; j < 8; j++) {
        this.squares[i][j] = new Square(i, j);
        this.squares[i][j].setDomSquare(domSquares[8 * i + j]);
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

  //highlight all possible moves, if it's capturing move or enPassante move highlight as attack
  highlightSquares() {
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        let selectedPiece: Piece = this.selectedSquares[0].getPiece();
        if (selectedPiece.canMove(this.selectedSquares[0], this.getSquares()[i][j], this)) {
          this.getSquares()[i][j].getDomSquare().classList.add("active");
          if((this.getSquares()[i][j].getPiece() != null && (this.getSquares()[i][j].getPiece().isWhite() != this.game.getCurrentTurn().isWhiteSide())) || (selectedPiece instanceof Pawn && selectedPiece.isEnPassant(this.selectedSquares[0], this.getSquares()[i][j], this))){
            this.getSquares()[i][j].getDomSquare().classList.add("beating");
          }
          this.highlightedSquares.push(this.getSquares()[i][j]);
        }
      }
    }
  }

  clearHighlightedSquares() {
    this.highlightedSquares.forEach((element) => {
      element.getDomSquare().classList.remove("active", "beating");
    });
    this.highlightedSquares = [];
  }

  private initializePieces() {
    const white: string = 'white';
    const black: string = 'black';
    for (let i = 0; i < 8; i++) {
      this.squares[1][i].setPiece(new Pawn(true));
      this.squares[1][i].getDomSquare().append(drawImage(PieceType.Pawn, white));

      this.squares[6][i].setPiece(new Pawn(false));
      this.squares[6][i].getDomSquare().append(drawImage(PieceType.Pawn, black));
    }
    this.squares[0][1].setPiece(new Knight(true));
    this.squares[0][1].getDomSquare().append(drawImage(PieceType.Knight, white));
    this.squares[0][6].setPiece(new Knight(true));
    this.squares[0][6].getDomSquare().append(drawImage(PieceType.Knight, white));
    this.squares[0][2].setPiece(new Bishop(true));
    this.squares[0][2].getDomSquare().append(drawImage(PieceType.Bishop, white));
    this.squares[0][5].setPiece(new Bishop(true));
    this.squares[0][5].getDomSquare().append(drawImage(PieceType.Bishop, white));
    this.squares[0][0].setPiece(new Rook(true));
    this.squares[0][0].getDomSquare().append(drawImage(PieceType.Rook, white));
    this.squares[0][7].setPiece(new Rook(true));
    this.squares[0][7].getDomSquare().append(drawImage(PieceType.Rook, white));
    this.squares[0][3].setPiece(new Queen(true));
    this.squares[0][3].getDomSquare().append(drawImage(PieceType.Queen, white));
    this.squares[0][4].setPiece(new King(true));
    this.squares[0][4].getDomSquare().append(drawImage(PieceType.King, white));

    this.squares[7][1].setPiece(new Knight(false));
    this.squares[7][1].getDomSquare().append(drawImage(PieceType.Knight, black));
    this.squares[7][6].setPiece(new Knight(false));
    this.squares[7][6].getDomSquare().append(drawImage(PieceType.Knight, black));
    this.squares[7][2].setPiece(new Bishop(false));
    this.squares[7][2].getDomSquare().append(drawImage(PieceType.Bishop, black));
    this.squares[7][5].setPiece(new Bishop(false));
    this.squares[7][5].getDomSquare().append(drawImage(PieceType.Bishop, black));
    this.squares[7][0].setPiece(new Rook(false));
    this.squares[7][0].getDomSquare().append(drawImage(PieceType.Rook, black));
    this.squares[7][7].setPiece(new Rook(false));
    this.squares[7][7].getDomSquare().append(drawImage(PieceType.Rook, black));
    this.squares[7][3].setPiece(new Queen(false));
    this.squares[7][3].getDomSquare().append(drawImage(PieceType.Queen, black));
    this.squares[7][4].setPiece(new King(false));
    this.squares[7][4].getDomSquare().append(drawImage(PieceType.King, black));
  }

  isDestinationUnderAttack(from: Square, destination: Square, board: Board): boolean{
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        let attackingPiece = board.getSquares()[i][j].getPiece();
        if(attackingPiece != null && (this.game.getCurrentTurn().isWhiteSide() != attackingPiece.isWhite())){
          if(attackingPiece.canAttack(board.getSquares()[i][j], destination, board)){
            return true;
          }
        }
      }
    }
  }

  getSquares(): Square[][] {
    return this.squares;
  }

  getGame() {
    return this.game;
  }
}
