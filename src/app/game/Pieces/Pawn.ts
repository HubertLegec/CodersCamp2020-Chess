import { Square } from "../Square";
import { Piece } from "./Piece";
import { MoveDirection } from "../MoveDirection";

export class Pawn extends Piece {
  promoted: boolean;
  promotedTo: Piece;
  moveDirection: MoveDirection;
  moved: boolean = false;

  constructor(white: boolean) {
    super(white);
    this.promoted = false;
  }

  public canMove(start: Square, end: Square): boolean {
    let vertical: number;
    let horizontal: number;

    if (end.getPiece() == null) {
      vertical =  Math.abs(start.getRow() - end.getRow());
      horizontal = Math.abs(start.getColumn() - end.getColumn());
      return vertical == 1 && horizontal == 0;
    }

    if (end.getPiece().isWhite() == this.isWhite()) {
      return false;
    }

    vertical = Math.abs(start.getRow() - end.getRow());
    horizontal = Math.abs(start.getColumn() - end.getColumn());
    return vertical * horizontal == 1;
  }
}
