import { Piece } from './pieces/Piece';
import { Pawn } from './pieces/Pawn';
import { Rook } from './pieces/Rook';
import { Bishop } from './pieces/Bishop';
import { Knight } from './pieces/Knight';
import { Colors } from './Colors';
import { Position } from './Position';

export class Player {
  name: string;
  actualTime: number;
  color: Colors;
  actualFigures: Array<Piece>;

  constructor(name: string, time: number, color: Colors) {
    this.name = name;
    this.actualTime = time;
    this.color = color;
    this.actualFigures = new Array<Piece>();
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
