import { Move } from '../Move';
import {Square} from '../Square';
import { PieceType } from './PieceType';

export abstract class Piece {
    killed: boolean = false;
    white: boolean = false;

    constructor(white:boolean) { 
        this.white = white; 
    } 
  
    public isWhite():boolean { 
        return this.white; 
    } 
  
    public isKilled():boolean{ 
        return this.killed; 
    } 
  
    public kill():void{ 
        this.killed = true; 
    } 

    public draw(move:Move):void{
        let pieceColour = (move.getStartSquare().getPiece().isWhite()) ? 'White' : 'Black';
        let pieceType = (move.getStartSquare().getPiece().constructor.name);
        move.getDestinationSquare().getDomSquare().innerHTML = PieceType[`${pieceColour}_${pieceType}`];
        move.getStartSquare().getDomSquare().innerHTML = null;
    }
  
    public abstract canMove(start:Square, end:Square):boolean; 
}