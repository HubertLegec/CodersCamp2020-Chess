import {Piece} from './Pieces/Piece'

export class Square {
    row: number;
    column: number;
    domSqare!: Element;
    piece: Piece | null ;

    constructor(row: number, column: number){
        this.row = row;
        this.column = column; 
        this.piece = null;
    }
}