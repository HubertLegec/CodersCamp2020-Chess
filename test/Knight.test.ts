import { Board } from '../src/app/game/Board';
import { Game } from '../src/app/game/Game';
import { Knight } from '../src/app/game/Pieces/Knight';
import { Square } from '../src/app/game/Square';

const fs = require('fs');
const path = require('path');
const html: string = fs.readFileSync(path.resolve(__dirname, '../chessGame.html'), 'utf8');
document.body.innerHTML = html;
const game = new Game('a', 'b', 10);
const board = new Board(game);
jest.dontMock('fs');

describe('Knight', () => {

    describe('canMove', () => {

        beforeEach(() => {
            document.body.innerHTML = html;
        })
        
        test('returns false if piece of same color is on end square', () => {
            const knight1 = new Knight(true);
            const knight2 = new Knight(true);
            const square1 = new Square(0, 0);
            const square2 = new Square(1, 2);
            square1.setPiece(knight1);
            square2.setPiece(knight2);

            const canMove = knight1.canMove(square1, square2, board);

            expect(canMove).toBe(false);
        });

        test('returns true if end square is empty', () => {
            const knight1 = new Knight(true);
            const square1 = new Square(3, 5);
            const square2 = new Square(2, 7);
            square1.setPiece(knight1);

            const canMove = knight1.canMove(square1, square2, board);

            expect(canMove).toBe(true);
        });

        test('returns true if figure from opposite colour is on end square', () => {
            const knight1 = new Knight(false);
            const knight2 = new Knight(true);
            const square1 = new Square(3, 5);
            const square2 = new Square(5, 6);
            square1.setPiece(knight1);
            square2.setPiece(knight2);

            const canMove = knight1.canMove(square1, square2, board);

            expect(canMove).toBe(true);
        });
    })
})