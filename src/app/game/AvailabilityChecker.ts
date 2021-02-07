import { Position } from './Position';
import { Piece } from './pieces/Piece';

export interface AvailabilityChecker {
    findCell: (pos: Position) => FindResponse;
    moveFigures: (start: Position, end: Position) => void;
    validateMoves: (figPos: Position) => PossibleMove[];
}
  
export interface FindResponse {
    found: boolean;
    figure?: Piece;
}
export class PossibleMove extends Position{
    attack:boolean
  
    constructor(x:number, y:number, isAttack:boolean = false){
      super(x,y);
      this.attack = isAttack;
    }
  }