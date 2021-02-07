import { Player } from '../Player';
import { PieceType } from './PieceType';
import { Position } from '../Position';

export abstract class Piece {
  type: PieceType
  position: Position;
  isAlive: boolean;
  owner: Player;
  hasMoved:boolean;

  constructor(pos: Position, owner: Player){
    this.position = pos;
    this.isAlive = true;
    this.owner = owner;
    this.hasMoved = false;
  }

  move(end: Position){
    this.position = end;
    this.hasMoved = true;
  }
  abstract drawYourself():void;

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
}
