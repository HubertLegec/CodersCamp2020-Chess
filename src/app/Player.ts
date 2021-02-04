import { Bishop, Colors, IFigure, Knight, Pawn, Position, Rook } from "./Figure";

export class Player {
  name: string;
  actualTime: number;
  color: Colors;
  actualFigures: Array<IFigure>;

  constructor(name: string, time: number, color: Colors) {
    this.name = name;
    this.actualTime = time;
    this.color = color;
    this.actualFigures = new Array<IFigure>();
    this.initFigures();
  }

  initFigures(): void {
    const raw = this.color == Colors.White ? 1 : 6;
    for (let i = 0; i < 8; i++) {
      this.actualFigures.push(new Pawn(new Position(raw, i), this));
    }
    this.actualFigures.push(new Rook(new Position(raw == 1 ? 0:7, 0), this));
    this.actualFigures.push(new Rook(new Position(raw == 1 ? 0:7, 7), this));
    
    this.actualFigures.push(new Bishop(new Position(raw == 1 ? 0:7, 2), this));
    this.actualFigures.push(new Bishop(new Position(raw == 1 ? 0:7, 5), this));

    this.actualFigures.push(new Knight(new Position(raw == 1 ? 0:7, 1), this));
    this.actualFigures.push(new Knight(new Position(raw == 1 ? 0:7, 6), this));
  }
}
