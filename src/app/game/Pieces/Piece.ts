import { Board } from '../Board';
import {Square} from '../Square';
import { PieceType } from './PieceType';
import {drawImage} from "../../display/DrawPiece";

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
        let pieceColour = (this.isWhite()) ? 'white' : 'black';
        let pieceType = (this.constructor.name);
        addTo.getDomSquare().append(drawImage(PieceType[pieceType], pieceColour));
        if(removeFrom != null)
            removeFrom.getDomSquare().innerHTML = null;
    }

    public abstract canMove(from:Square, to:Square, board:Board):boolean;
    public abstract canAttack(from:Square, to:Square, board:Board):boolean;
}