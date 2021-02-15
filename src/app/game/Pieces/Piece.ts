import { Board } from '../Board';
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

    setMoved(moved: boolean):void{
        this.moved = moved;
    }

    public isKilled():boolean{ 
        return this.killed; 
    } 
  
    public kill(square:Square):void{ 
        this.killed = true;
        square.getDomSquare().innerHTML = null;
    }
    
    public revive(){
        this.killed = false;
    }

    public draw(removeFrom:Square | null, addTo: Square):void{
        let pieceColour = (this.isWhite()) ? 'White' : 'Black';
        let pieceType = (this.constructor.name);
        addTo.getDomSquare().innerHTML = PieceType[`${pieceColour}_${pieceType}`];
        if(removeFrom != null)
            removeFrom.getDomSquare().innerHTML = null;
    }

    public abstract canMove(from:Square, to:Square, board:Board):boolean; 
}