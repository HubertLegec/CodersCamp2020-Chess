import { Pawn } from '../src/app/game/Pieces/Pawn';
import { Square } from '../src/app/game/Square';

describe('Pawn', () => {

    describe('canMove', () => {

        test('returns false if piece of same color is on end square', () => {
            const pawn1 = new Pawn(true);
            const pawn2 = new Pawn(true);
            const square1 = new Square(0, 0);
            const square2 = new Square(1, 0);
            square1.setPiece(pawn1);
            square2.setPiece(pawn2);

            const canMove = pawn1.canMove(square1, square2);

            expect(canMove).toBe(false);
        })

        test('returns true if end square is empty and in one square distance', () => {
            const pawn1 = new Pawn(true);
            const square1 = new Square(0, 0);
            const square2 = new Square(1, 0);
            square1.setPiece(pawn1);

            const canMove = pawn1.canMove(square1, square2);

            expect(canMove).toBe(true);
        })

        test('returns false if end square is empty but distance is > 1', () => {
            const pawn1 = new Pawn(true);
            const square1 = new Square(0, 0);
            const square2 = new Square(3, 0);
            square1.setPiece(pawn1);

            const canMove = pawn1.canMove(square1, square2);

            expect(canMove).toBe(false);
        })

        test('returns false if end square is empty but move is not vertical', () => {
            const pawn1 = new Pawn(true);
            const square1 = new Square(0, 0);
            const square2 = new Square(0, 3);
            square1.setPiece(pawn1);

            const canMove = pawn1.canMove(square1, square2);

            expect(canMove).toBe(false);
        })

        test('returns true if end square has opposing piece and distance is diagonal 1', () => {
            const pawn1 = new Pawn(true);
            const pawn2 = new Pawn(false);
            const square1 = new Square(0, 0);
            const square2 = new Square(1, 1);
            square1.setPiece(pawn1);
            square2.setPiece(pawn2);

            const canMove = pawn1.canMove(square1, square2);

            expect(canMove).toBe(true);
        })

        test('returns false if end square has opposing piece but diagonal distance is more than 1', () => {
            const pawn1 = new Pawn(true);
            const pawn2 = new Pawn(false);
            const square1 = new Square(0, 0);
            const square2 = new Square(4, 4);
            square1.setPiece(pawn1);
            square2.setPiece(pawn2);

            const canMove = pawn1.canMove(square1, square2);

            expect(canMove).toBe(false);
        })

        test('returns false if end square has opposing piece and distance is 1 but not diagonal', () => {
            const pawn1 = new Pawn(true);
            const pawn2 = new Pawn(false);
            const square1 = new Square(0, 0);
            const square2 = new Square(1, 0);
            square1.setPiece(pawn1);
            square2.setPiece(pawn2);

            const canMove = pawn1.canMove(square1, square2);

            expect(canMove).toBe(false);
        })
    })
})