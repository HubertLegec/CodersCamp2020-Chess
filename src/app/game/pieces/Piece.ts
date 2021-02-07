import { Player } from '../Player';
import { PieceType } from './PieceType';
import { Position } from '../Position';
import { Colors } from '../Colors';

export class Piece {
  type: PieceType
  position: Position;
  isAlive: boolean;
  owner: Player;
  hasMoved:boolean;
  name:string;

  constructor(pos: Position, owner: Player, type: PieceType){
    this.position = pos;
    this.isAlive = true;
    this.owner = owner;
    this.hasMoved = false;
    this.type = type;
    this.setName();
  }

  setName(){
    switch(this.type){
      case PieceType.Bishop:{
        this.name = 'bishop';
        break;
      }
      case PieceType.King:{
        this.name = 'king';
        break;
      }
      case PieceType.Knight:{
        this.name = 'knight';
        break;
      }
      case PieceType.Pawn:{
        this.name = 'pawn';
        break;
      }
      case PieceType.Queen:{
        this.name = 'queen';
        break;
      }
      case PieceType.Rook:{
        this.name = 'rook';
        break;
      }
    }
  }

  move(end: Position){
    this.position = end;
    this.hasMoved = true;
  }

  removeYourself() {
    // TODO implement removing
    const me = document.getElementById(
      `${this.position.x * 8 + this.position.y}`
    )!;
    me.innerHTML = "";
  }

  setOnClick(func: (me: Piece) => void){
    const me = document.getElementById(
      `${this.position.x * 8 + this.position.y}`
    );
    me?.addEventListener('click', () => {
      func(this);
    });
  }

  drawYourself() {
    // TODO implement drawing
    const me = document.getElementById(
      `${this.position.x * 8 + this.position.y}`
    )!;
    // TODO ustaw czcionkę pionka
    me.innerHTML = `<i class="fas fa-chess-${this.name}" style="font-size: 30px;  color:${
      this.owner.color == Colors.Black ? "black" : "white"
    }"></i>`;
    me?.setAttribute("style", "text-align:center;");
  }

  kill(){
    this.isAlive = false;
  }
}
