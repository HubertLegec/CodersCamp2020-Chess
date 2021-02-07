import { Piece } from './Piece';
import { PieceType } from './PieceType';
import { Colors } from '../Colors';
import { Position } from '../Position';
import { Player } from '../Player';

export class Bishop extends Piece{
    type: PieceType;
  
    constructor(pos: Position, owner: Player){
      super(pos, owner);
      this.type = PieceType.Bishop;
    }
  
    drawYourself(): void {
      
      const me = document.getElementById(
        `${this.position.x * 8 + this.position.y}`
      )!;
      
      me.innerHTML = `<i class="fas fa-chess-bishop" style="font-size: 30px;  color:${
        this.owner.color == Colors.Black ? "black" : "white"
      }"></i>`;
      me?.setAttribute("style", "text-align:center;");
    }
    
  }