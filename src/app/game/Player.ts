import { Piece } from './pieces/Piece';
import { Colors } from './Colors';
import { Position } from './Position';
import { PieceType } from './pieces/PieceType';

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
      this.actualFigures.push(new Piece(new Position(raw, i), this, PieceType.Pawn));
    }
    this.actualFigures.push(new Piece(new Position(raw == 1 ? 0:7, 0), this, PieceType.Rook));
    this.actualFigures.push(new Piece(new Position(raw == 1 ? 0:7, 7), this, PieceType.Rook));
    
    this.actualFigures.push(new Piece(new Position(raw == 1 ? 0:7, 2), this, PieceType.Bishop));
    this.actualFigures.push(new Piece(new Position(raw == 1 ? 0:7, 5), this, PieceType.Bishop));

    this.actualFigures.push(new Piece(new Position(raw == 1 ? 0:7, 1), this, PieceType.Knight));
    this.actualFigures.push(new Piece(new Position(raw == 1 ? 0:7, 6), this, PieceType.Knight));

    this.actualFigures.push(new Piece(new Position(raw == 1 ? 0:7, 3), this, PieceType.Queen));
  }
}
