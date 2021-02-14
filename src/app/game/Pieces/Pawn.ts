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
    if (to.getPiece() == null && horizontalDistance == 0) {
      //check if it's first move and there's nothing in front
      if (!this.hasMoved() && sqaureInFront.getPiece() == null) {
        return verticalDistance == 1 || verticalDistance == 2;
      }
      //this is not first move
      else {
        return verticalDistance == 1;
      }
    }

    //bicie
    if (to.getPiece() != null && to.getPiece().isWhite() != from.getPiece().isWhite()) {
      return verticalDistance == 1 && horizontalDistance == 1;
    }

    // En passant (bicie w przelocie)

    // check if destination is valid
    if (to.getPiece() == null && verticalDistance == 1) {
      const recentMove = board.getGame().getRecentMove();

      // check if moved piece was Pawn
      if (!(recentMove.getMovedPiece() instanceof Pawn)) {
        return false;
      }

      // check if horizontal distance between pieces was 1
      if (!(Math.abs(recentMove.getStartSquare().getColumn() - from.getColumn()) == 1)) {
        return false;
      }

      // check if we want kill for good side (left/right)
      if (recentMove.getDestinationSquare().getColumn() != to.getColumn()){
        return false;
      }

      // check if it was double square move
      if (!(Math.abs(recentMove.getStartSquare().getRow() - recentMove.getDestinationSquare().getRow()) == 2)) {
        return false;
      }

      return true;
    }

    //TODO
    //promocja pionka
  }
}
