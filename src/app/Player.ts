import { Colors, IFigure, Pawn, Position } from "./Figure";

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
  }
}
