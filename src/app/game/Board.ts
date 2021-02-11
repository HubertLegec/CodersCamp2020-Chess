import {Square} from './Square';
import {Piece} from './Pieces/Piece';

export class Board {
    squares: Square[][] = [];

    constructor() {
        this.initializeBoard();
    }

    initializeBoard(){
        for (let i = 0; i < 8; i++) { 
            for (let j = 0; j < 8; i++) { 
                this.squares[i][j] = new Square(i, j, {} as Piece); 
            } 
        }
    }
}