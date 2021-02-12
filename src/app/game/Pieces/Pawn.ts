import { Board } from "../Board";
import { Square } from "../Square";
import { Piece } from "./Piece";
import { MoveDirection } from "../MoveDirection";

export class Pawn extends Piece {
  promoted: boolean = false;
  promotedTo: Piece;
  moveDirection: MoveDirection;
  moved: boolean = false;

  constructor(white: boolean) {
    super(white);
  }

  public canMove(board: Board, start: Square, end: Square): boolean {
    throw new Error("Method not implemented.");
  }
}
