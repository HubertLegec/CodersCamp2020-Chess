import {Board} from '../Board';
import {Square} from '../Square';

export abstract class Piece {
    killed: boolean = false;
    white: boolean = false;

    constructor(white:boolean) { 
        this.setWhite(white); 
    } 
  
    public isWhite():boolean { 
        return this.white; 
    } 
  
    public setWhite(white: boolean): void { 
        this.white = white; 
    } 
  
    public isKilled():boolean{ 
        return this.killed; 
    } 
  
    public kill():void{ 
        this.killed = true; 
    } 
  
    public abstract canMove(board:Board, start:Square, end:Square):boolean; 

}