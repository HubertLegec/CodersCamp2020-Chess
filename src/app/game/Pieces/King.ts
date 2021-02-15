import { Square } from "../Square";
import { Piece } from "./Piece";
import { Board } from "../Board";
import { Rook } from "./Rook";

export class King extends Piece {
  private castlingDone: boolean = false;

  constructor(white: boolean) {
    super(white);
  }

  public isCastlingDone(): boolean {
    return this.castlingDone;
  }

  public setCastlingDone(castlingDone: boolean) {
    this.castlingDone = castlingDone;
  }

  public canMove(from: Square, to: Square, board: Board): boolean {

    let verticalDistanceDelta: number = Math.abs(to.getRow() - from.getRow());
    let horizontalDistanceDelta: number = Math.abs(to.getColumn() - from.getColumn());

    //destination doesn't have any of my piece
    if (to.getPiece() && to.getPiece().isWhite() == this.isWhite()) {
      return false;
    }

    //to be completed max call stack error, pawn attacks are not correct
    if(this.isDestinationUnderAttack(from, to, board)){
      return false;
    }

    //basic move
    if(Math.max(verticalDistanceDelta, horizontalDistanceDelta) == 1){

        return true;
    }

    //is this castling move?
      return this.isValidCastling(from, to, board);
  }

  public isValidCastling(from: Square, to: Square, board: Board):boolean{
    
    if(this.hasMoved()){
        return false;
    }

    if(this.isCastlingDone()){
        return false;
    }

    let verticalDistanceDelta: number = Math.abs(to.getRow() - from.getRow());
    let horizontalDistanceDelta: number = Math.abs(to.getColumn() - from.getColumn());
    let horizontalDistance: number = to.getColumn() - from.getColumn();

    //check if castling Rook has moved
    let castlingRook: Rook;
    let castlingRookHorizontalPosition: number;
    (horizontalDistance < 0)? castlingRookHorizontalPosition = 0 : castlingRookHorizontalPosition = 7;
    castlingRook = board.getSquares()[from.getRow()][castlingRookHorizontalPosition].getPiece();

    if(castlingRook.hasMoved()){
        return false;
    }
    
    //check if there's no piece in between
    let horizontalDirection = (horizontalDistance/horizontalDistanceDelta);
    for(let i = 1; i < horizontalDistanceDelta; i++){
        let checkedSquareH = from.getColumn() + (i * horizontalDirection);
        if(board.getSquares()[from.getRow()][checkedSquareH].getPiece()){
            return false;
        }
    }

    //is this correct square?
    if(verticalDistanceDelta == 0 && horizontalDistanceDelta == 2){
        return true;
    }
  }

  isDestinationUnderAttack(from: Square, to: Square, board: Board): boolean{

    //set king temporarly on destination square
    // to.setPiece(this);
    // from.setPiece(null);

    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        let attackingPiece = board.getSquares()[i][j].getPiece();
        if(attackingPiece != null && (this.isWhite() != attackingPiece.isWhite())){
          if(attackingPiece.canMove(board.getSquares()[i][j], to, board)){
            return true;
          }
        }
      }
    }
  }
}
