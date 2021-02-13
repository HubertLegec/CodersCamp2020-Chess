import { Square } from "../Square";
import { Piece } from "./Piece";
import { Board } from "../Board";

export class Knight extends Piece {
  constructor(white: boolean) {
    super(white);
  }

  public canMove(from: Square, to: Square, board: Board): boolean {

    let verticalDistance: number = Math.abs(from.getRow() - to.getRow());
    let horizontalDistance: number = Math.abs(from.getColumn() - to.getColumn());

    if (to.getPiece() && (to.getPiece().isWhite() == this.isWhite())) {
      return false;
    }

    return verticalDistance * horizontalDistance == 2;
  }
}
