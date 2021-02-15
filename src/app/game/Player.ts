import {Move} from './Move';
import { Square } from './Square';
import { Game } from './Game';
export class Player {
  private name: string;
  private timeRemaining: number;
  private isWhite: boolean;

  constructor(name: string, time: number, isWhite: boolean) {
    this.name = name;
    this.timeRemaining = time;
    this.isWhite = isWhite;
  }

  isWhiteSide(){
    return this.isWhite;
  }

  playedMove(startSquare: Square, destinationSquare:Square, game:Game): boolean{
    let move = new Move(this, startSquare,destinationSquare);

    return game.makeMove(move, this);
  }
}
