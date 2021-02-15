import { Player } from "./Player";
import { Board } from "./Board";
import { Move } from "./Move";
import { Pawn } from "./Pieces/Pawn";
import { King } from "./Pieces/King";
import { Rook } from "./Pieces/Rook";
import { Square } from "./Square";
import { Queen } from "./Pieces/Queen";
export class Game {
  private players: Player[] = [];
  private board: Board;
  private currentTurn: Player;
  private movesPlayed: Move[] = [];

  constructor(firstName: string, secondName: string, timeLimit: number) {
    this.players[0] = new Player(firstName, timeLimit, true);
    this.players[1] = new Player(secondName, timeLimit, false);
    this.currentTurn = this.players[0];
    this.board = new Board(this);
  }

  recordMove(move: Move) {
    this.movesPlayed.push(move);
  }

  //validates and executes played move
  makeMove(move: Move, player: Player): boolean {
    let sourcePiece = move.getStartSquare().getPiece();

    //is there anybody out there?
    if (!sourcePiece) {
      return false;
    }

    //is it your turn?
    if (player != this.currentTurn) {
      return false;
    }

    //is it your piece?
    if (sourcePiece.isWhite() != player.isWhiteSide()) {
      return false;
    }

    //can you move it?
    if (
      !sourcePiece.canMove(move.getStartSquare(), move.getDestinationSquare(), this.board)
    ) {
      return false;
    }

    //are we gonna kill somepiece?
    let destinationPiece = move.getDestinationSquare().getPiece();
    if (destinationPiece) {
      destinationPiece.kill(move.getDestinationSquare());
      move.setCapturedPiece(destinationPiece);
    }

    //is this enPassant move?
    if(sourcePiece instanceof Pawn && sourcePiece.isEnPassant(move.getStartSquare(), move.getDestinationSquare(), this.board)){
        this.getRecentMove().getMovedPiece().kill(this.getRecentMove().getDestinationSquare());
        move.setEnPassanteMove(true);
        move.setCapturedPiece(this.getRecentMove().getMovedPiece());  
    }

    //is this castling move?
    if (sourcePiece instanceof King && sourcePiece.isValidCastling(move.getStartSquare(), move.getDestinationSquare(), this.board)){

        let currentRow = move.getStartSquare().getRow();
        let horizontalDistance: number = move.getDestinationSquare().getColumn()- move.getStartSquare().getColumn();
        let horizontalDistanceDelta: number = Math.abs(horizontalDistance);
        let horizontalDirection = horizontalDistance/horizontalDistanceDelta;

        //find castling Rook and set moved flag
        let castlingRook: Rook;
        let RookColumnBeforeCastling: number;
        (horizontalDistance < 0)? RookColumnBeforeCastling = 0 : RookColumnBeforeCastling = 7;
        castlingRook = this.board.getSquares()[currentRow][RookColumnBeforeCastling].getPiece();
        castlingRook.setMoved(true);

        //Move rook to new position
        let RookSquareBeforeCastling: Square = this.board.getSquares()[currentRow][RookColumnBeforeCastling];
        let RookColumnAfterCastling: number = move.getStartSquare().getColumn() + horizontalDirection;
        let RookSquareAfterCastling: Square = this.board.getSquares()[currentRow][RookColumnAfterCastling];

        RookSquareBeforeCastling.setPiece(null);
        RookSquareAfterCastling.setPiece(castlingRook);
        castlingRook.draw(RookSquareBeforeCastling, RookSquareAfterCastling);

        sourcePiece.setCastlingDone(true);
        move.setCastlingMove(true);
    }

    //save move
    this.recordMove(move);

    //execute move
    move.getMovedPiece().draw(move.getStartSquare(), move.getDestinationSquare());
    move.getDestinationSquare().setPiece(move.getStartSquare().getPiece());
    move.getStartSquare().setPiece(null);

    //You've moved, have you?
    if(!sourcePiece.hasMoved()){
        sourcePiece.setMoved(true);
    }

    //Promotion check
    if (move.getMovedPiece() instanceof Pawn && move.getDestinationSquare().isPromotionSquare()) {
      const pawnToPromote = move.getMovedPiece();
      move.setPromotionMove(true);
      pawnToPromote.kill(move.getDestinationSquare());
      const queen = new Queen(move.getMovedPiece().isWhite());
      queen.draw(move.getDestinationSquare(), move.getDestinationSquare());
      move.getDestinationSquare().setPiece(queen);      
    }
    
    //verify game status
    //to be implemented

    //switch turn
    if (this.currentTurn === this.players[0]) {
      this.currentTurn = this.players[1];
    } else {
      this.currentTurn = this.players[0];
    }
    return true;
  }

  getCurrentTurn(): Player {
    return this.currentTurn;
  }
  setCurrentTurn(currentPlayer: Player): void{
      this.currentTurn = currentPlayer;
  }

  getMovesPlayed(): Move[]{
      return this.movesPlayed;
  }

  getRecentMove(): Move{
    return this.movesPlayed[this.movesPlayed.length-1];
  }
}
