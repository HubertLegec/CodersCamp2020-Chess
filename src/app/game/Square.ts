import {Piece} from './Pieces/Piece'

export class Square {
    row: number;
    column: number;
    piece: Piece;

    constructor(row: number, column: number, piece: Piece){
        this.row = row;
        this.column = column;
        this.piece = piece;
    }

}