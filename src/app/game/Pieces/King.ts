import { Square } from "../Square";
import { Piece } from "./Piece";
import { Board } from "../Board";

export class King extends Piece {
  private castlingDone: boolean = false;

  constructor(white: boolean) {
    super(white);
  }

  public isCastlingDone(): boolean {
    return this.castlingDone;
  }

  public setCastlingDone(castlingDone: boolean) {
    castlingDone = castlingDone;
  }

  public canMove(from: Square, to: Square, board: Board): boolean {

    let verticalDistanceDelta: number = Math.abs(to.getRow() - from.getRow());
    let horizontalDistanceDelta: number = Math.abs(to.getColumn() - from.getColumn());

    if (to.getPiece() && to.getPiece().isWhite() == this.isWhite()) {
      return false;
    }

    if(verticalDistanceDelta * horizontalDistanceDelta <= 1){
        return true;
    }
  }
}
