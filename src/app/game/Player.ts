export class Player {
  name: string;
  timeRemaining: number;
  isWhite: boolean;
  piecesOnBoard: Array<Piece>;

  constructor(name: string, time: number, isWhite: boolean) {
    this.name = name;
    this.timeRemaining = time;
    this.isWhite = isWhite;
    this.piecesOnBoard = new Array<Piece>();
  }
}
