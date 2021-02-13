import { Square } from "../Square";
import { Piece } from "./Piece";
import { MoveDirection } from "../MoveDirection";
import { Board } from "../Board";

export class Pawn extends Piece {
  private promoted: boolean;
  private promotedTo: Piece;
  private moveDirection: MoveDirection;

  constructor(white: boolean) {
    super(white);
    this.promoted = false;
    this.moveDirection = white ? MoveDirection.UP : MoveDirection.Down;
  }

  isPromoted(): boolean {
    return this.promoted;
  }
  setPromoted(promoted: boolean) {
    this.promoted = promoted;
  }

  promoteTo(piece: Piece) {
    this.promotedTo = piece;
  }

  isPromotedTo(): Piece {
    return this.promotedTo;
  }

  getDirection(): MoveDirection {
    return this.moveDirection;
  }

  setDirection(newDirection: MoveDirection) {
    this.moveDirection = newDirection;
  }

  public canMove(from: Square, to: Square, board: Board): boolean {
    let direction = this.getDirection();
    let verticalDistance: number =
      (direction == MoveDirection.UP ? -1 : 1) * (from.getRow() - to.getRow());
    let horizontalDistance: number = Math.abs(from.getColumn() - to.getColumn());

    // pawn can't jump over piece from initial position
    let sqaureInFront = board.getSquares()[direction == MoveDirection.UP ? 2 : 5][from.getColumn()];

    //zwykły ruch
    //check if destination is empty
    if (to.getPiece() == null) {
      //check if it's first move and there's nothing in front
      if (!this.hasMoved() && sqaureInFront.getPiece() == null) {
        return (verticalDistance == 1 || verticalDistance == 2) && horizontalDistance == 0;
      }
      //this is not first move
      else {return verticalDistance == 1 && horizontalDistance == 0;}
    }

    //bicie
    if (to.getPiece().isWhite() != from.getPiece().isWhite()) {
        return verticalDistance == 1 && horizontalDistance == 1;
    }

    //TODO
    // bicie w przelocie
    //zmiana kierunku i promocja pionka
  }
}
