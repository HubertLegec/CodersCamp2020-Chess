import { Board } from '../Board';
import { Move } from '../Move';
import {Square} from '../Square';
import { PieceType } from './PieceType';

export abstract class Piece {
    private killed: boolean = false;
    private moved: boolean = false;
    private white: boolean = false;

    constructor(white:boolean) { 
        this.white = white; 
    } 
  
    public isWhite():boolean { 
        return this.white; 
    }

    hasMoved():boolean{
        return this.moved;
    }

    setMoved(moved:boolean):void{
        this.moved = moved;
    }

    public isKilled():boolean{ 
        return this.killed; 
    } 
  
    public kill(square:Square):void{ 
        this.killed = true;
        square.getDomSquare().innerHTML = null;
    } 

    public draw(move:Move):void{
        let pieceColour = (move.getStartSquare().getPiece().isWhite()) ? 'White' : 'Black';
        let pieceType = (move.getStartSquare().getPiece().constructor.name);
        move.getDestinationSquare().getDomSquare().innerHTML = PieceType[`${pieceColour}_${pieceType}`];
        move.getStartSquare().getDomSquare().innerHTML = null;
    }

    public abstract canMove(from:Square, to:Square, board:Board):boolean; 
}