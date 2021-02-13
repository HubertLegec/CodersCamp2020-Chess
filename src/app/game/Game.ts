import { Player } from "./Player";
import { Board } from "./Board";
import { Move } from "./Move";
import { PieceType } from "./Pieces/PieceType";

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
      !sourcePiece.canMove(move.getStartSquare(), move.getDestinationSquare())
    ) {
      return false;
    }

    //are we gonna kill somepiece?
    let destinationPiece = move.getStartSquare().getPiece();
    if (!destinationPiece) {
      destinationPiece.kill();
      move.setCapturedPiece(destinationPiece);
    }

    //is this castling move?
    //to be implemented

    //save move
    this.recordMove(move);

    //execute move
    move.getDestinationSquare().setPiece(move.getStartSquare().getPiece());
    move.getDestinationSquare().getDomSquare().innerHTML = (move.getStartSquare().getPiece().isWhite()) ? PieceType.White_Pawn : PieceType.Black_Pawn;
    
    move.getStartSquare().setPiece(null);
    move.getStartSquare().getDomSquare().innerHTML = null;

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
