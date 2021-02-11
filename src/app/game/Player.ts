import {Piece} from './Pieces/Piece';
export class Player {
  name: string;
  timeRemaining: number;
  isWhite: boolean;

  constructor(name: string, time: number, isWhite: boolean) {
    this.name = name;
    this.timeRemaining = time;
    this.isWhite = isWhite;
  }
}
