import { Square } from "../Square";
import { Piece } from "./Piece";
import { Board } from "../Board";

export class Bishop extends Piece {

  constructor(white: boolean) {
    super(white);
  }

  public canMove(from: Square, to: Square, board: Board): boolean {

    let verticalDistanceDelta: number = Math.abs(to.getRow()- from.getRow());
    let horizontalDistanceDelta: number = Math.abs(to.getColumn()- from.getColumn());

    let verticalDistance: number = to.getRow()- from.getRow();
    let horizontalDistance: number = to.getColumn() - from.getColumn();
    
    if (to.getPiece() && (to.getPiece().isWhite() == this.isWhite())) {
      return false;
    }

    if(verticalDistanceDelta - horizontalDistanceDelta == 0 ){
        for(let i = 1; i < verticalDistanceDelta; i++){
            let checkedSquareV = from.getRow() + (i * (verticalDistance/verticalDistanceDelta));
            let checkedSquareH = from.getColumn() + (i * (horizontalDistance/horizontalDistanceDelta));
            if(board.getSquares()[checkedSquareV][checkedSquareH].getPiece() != null){
                return false;
            }
        }
        return true;
    }
  }
}
