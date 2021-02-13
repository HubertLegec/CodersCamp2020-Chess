import { Player } from "./Player";
import { Board } from "./Board";
import { Move } from "./Move";
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
    let destinationPiece = move.getStartSquare().getPiece();
    if (!destinationPiece) {
      destinationPiece.kill(move.getDestinationSquare());
      move.setCapturedPiece(destinationPiece);
    }

    //is this castling move?
    //to be implemented

    //save move
    this.recordMove(move);

    //execute move
    move.getMovedPiece().draw(move);
    move.getDestinationSquare().setPiece(move.getStartSquare().getPiece());
    move.getStartSquare().setPiece(null);

    //You've moved, have you?
    if(!sourcePiece.hasMoved()){
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
}
