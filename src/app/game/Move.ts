import { Piece } from "./Pieces/Piece";
import { Square } from "./Square";
import { Player } from "./Player";
import { Pawn } from "./Pieces/Pawn";

export class Move {
  private player: Player;
  private startSquare: Square;
  private destinationSquare: Square;
  private movedPiece: Piece;
  private capturedPiece: Piece;
  private castlingMove: boolean = false;

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

  isCastlingMove(): boolean {
    return this.castlingMove;
  }

  isEnPasantMove(){
    if (!(this.getMovedPiece() instanceof Pawn)){
      return false;
    }

    if (Math.abs(this.getStartSquare().getRow() - this.getDestinationSquare().getRow()) != 1){
        return false;
    }

    if (Math.abs(this.getStartSquare().getColumn() - this.getDestinationSquare().getColumn()) != 1){
      return false;
    }

    if (this.getDestinationSquare().getPiece() != null){
      return false;
    }

    return true;
  }

  setCastlingMove(castlingMove: boolean) {
    this.castlingMove = castlingMove;
  }
}
