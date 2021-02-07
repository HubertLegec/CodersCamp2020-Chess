import { Piece } from './Piece';
import { PieceType } from './PieceType';
import { Colors } from '../Colors';
import { Position } from '../Position';
import { Player } from '../Player';

export class Pawn extends Piece {
    type: PieceType;
  
    constructor(pos: Position, owner: Player) {
      super(pos, owner);
      this.type = PieceType.Pawn;
  
    }
  
    drawYourself() {
      // TODO implement drawing
      const me = document.getElementById(
        `${this.position.x * 8 + this.position.y}`
      )!;
      // TODO ustaw czcionkę pionka
      me.innerHTML = `<i class="fas fa-chess-pawn" style="font-size: 30px;  color:${
        this.owner.color == Colors.Black ? "black" : "white"
      }"></i>`;
      me?.setAttribute("style", "text-align:center;");
    }
}