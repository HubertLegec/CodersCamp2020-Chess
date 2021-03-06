import { Piece } from "./Pieces/Piece";
import { Square } from "./Square";
import { Player } from "./Player";

export class Move {
  private player: Player;
  private startSquare: Square;
  private destinationSquare: Square;
  private movedPiece: Piece;
  private capturedPiece: Piece;
  private castlingMove: boolean = false;
  private enPassanteMove: boolean = false;
  private firstMove: boolean;

  constructor(player: Player, startSquare: Square, destinationSquare: Square) {
    this.player = player;
    this.startSquare = startSquare;
    this.destinationSquare = destinationSquare;
    this.movedPiece = startSquare.getPiece();
  }

  getPlayer(): Player {
    return this.player;
  }

  getStartSquare(): Square {
    return this.startSquare;
  }

  getDestinationSquare(): Square {
    return this.destinationSquare;
  }

  getMovedPiece(): Piece {
    return this.movedPiece;
  }

  getCapturedPiece(): Piece {
      return this.capturedPiece;
  }

  setCapturedPiece(capturedPiece: Piece){
      this.capturedPiece = capturedPiece;
  }

  isEnPassanteMove(): boolean {
      return this.enPassanteMove;
  }

  setEnPassanteMove(enPassante: boolean): void {
      this.enPassanteMove = enPassante;
  }

  isCastlingMove(): boolean {
    return this.castlingMove;
  }

  setCastlingMove(castlingMove: boolean) {
    this.castlingMove = castlingMove;
  }

  getFirstMove() {
    return this.firstMove;
  }

  setFirstMove(firstMove: boolean) {
    this.firstMove = firstMove;
  }
}
