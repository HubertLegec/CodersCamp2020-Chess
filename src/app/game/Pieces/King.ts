import { Square } from "../Square";
import { Piece } from "./Piece";
import { Board } from "../Board";
import { Rook } from "./Rook";

export class King extends Piece {
  private castlingDone: boolean = false;
  private location: Square;

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

    if(board.isDestinationUnderAttack(from, to, board)){
      return false;
    }
  
    if(Math.max(verticalDistanceDelta, horizontalDistanceDelta) == 1){
      return true;
    }

    if(this.isValidCastling(from, to, board)){
      return true;
    }
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

    if(castlingRook == null){
      return false;
    } 
    if(castlingRook.hasMoved()) {
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

  public canAttack(from: Square, to: Square, board: Board): boolean {
    return false;
  }

  getLocation(){
    return this.location;
  }

  setLocation(location: Square){
    this.location = location;
  }
}
