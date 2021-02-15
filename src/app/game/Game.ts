import { Player } from "./Player";
import { Board } from "./Board";
import { Move } from "./Move";
import { Pawn } from "./Pieces/Pawn";
import { King } from "./Pieces/King";
import { Rook } from "./Pieces/Rook";
import { Square } from "./Square";
import { PieceType } from "./Pieces/PieceType";
export class Game {
  private players: Player[] = [];
  private board: Board;
  private currentTurn: Player;
  private movesPlayed: Move[];

  constructor(firstName: string, secondName: string, timeLimit: number) {
    this.players[0] = new Player(firstName, timeLimit, true);
    this.players[1] = new Player(secondName, timeLimit, false);
    this.currentTurn = this.players[0];
    this.board = new Board(this);
    this.movesPlayed = [];
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
        move.setFirstMove(true);
        sourcePiece.setMoved(true);
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

  undoMove(): void {

    if(this.movesPlayed != undefined && this.movesPlayed.length != 0){
      const recentMove = this.getRecentMove();
      const pieceToMoveBack = recentMove.getMovedPiece();
      const attackedPiece = recentMove.getCapturedPiece()
      this.movesPlayed.pop();

      pieceToMoveBack.draw(recentMove.getDestinationSquare(), recentMove.getStartSquare());
      recentMove.getStartSquare().setPiece(pieceToMoveBack);
      recentMove.getDestinationSquare().setPiece(null);

      if(recentMove.getFirstMove()) {
        pieceToMoveBack.setMoved(false);
      }

      if(recentMove.isCastlingMove()) {
        const kingsCastlingPosition = recentMove.getDestinationSquare();
        pieceToMoveBack.setMoved(false);
        (pieceToMoveBack as King).setCastlingDone(false);
        
        if(kingsCastlingPosition.getColumn() == 2){

          const rookPosition = this.board.getSquares()[kingsCastlingPosition.getRow()][3];
          const rook = rookPosition.getPiece();
          const rookPrevPosition = this.board.getSquares()[kingsCastlingPosition.getRow()][0];
          rook.draw(rookPosition, rookPrevPosition);
          rookPosition.setPiece(null);
          rookPrevPosition.setPiece(rook);
          rook.setMoved(false);

        } else {

          const rookPosition = this.board.getSquares()[kingsCastlingPosition.getRow()][5];
          const rook = rookPosition.getPiece();
          const rookPrevPosition = this.board.getSquares()[kingsCastlingPosition.getRow()][7];
          rook.draw(rookPosition, rookPrevPosition);
          rookPosition.setPiece(null);
          rookPrevPosition.setPiece(rook);
          rook.setMoved(false);

        }
      }
    
      if(attackedPiece != null){
        const attackedSquare = recentMove.getDestinationSquare();
        attackedPiece.revive();  

        if(recentMove.isEnPassanteMove()){
          let enPassanteAttackedSquare;

          if(attackedPiece.isWhite()){
            enPassanteAttackedSquare = this.board.getSquares()[attackedSquare.getRow() + 1][attackedSquare.getColumn()];
          } else {
            enPassanteAttackedSquare = this.board.getSquares()[attackedSquare.getRow() - 1][attackedSquare.getColumn()];
          }
          
          attackedPiece.draw(null, enPassanteAttackedSquare);
          enPassanteAttackedSquare.setPiece(attackedPiece);
        } else { 
          attackedPiece.draw(null, attackedSquare);
          attackedSquare.setPiece(attackedPiece);
        }        
        
      }
      this.currentTurn = recentMove.getPlayer();
    }
    
  }
}
