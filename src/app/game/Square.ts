import {Piece} from './Pieces/Piece'

export class Square {
    private row: number;
    private column: number;
    private piece: Piece | null ;
    private domSqare!: Element;
    private promotionSquare: boolean;

    constructor(row: number, column: number){
        this.row = row;
        this.column = column; 
        this.piece = null;
        this.promotionSquare = this.row == 0 || this.row == 7;
    }

    getRow(): number {
        return this.row;
    }

    getColumn(): number {
        return this.column;
    }

    setPiece(piece: Piece) {
        this.piece = piece;
    }

    getPiece(): Piece | null{
        return this.piece;
    }

    setDomSquare(domSqare: Element) {
        this.domSqare = domSqare;
    }

    getDomSquare() {
        return this.domSqare;
    }

    isPromotionSquare(): boolean {
        return this.promotionSquare;
    }
}