import { BoardDisplay } from '../src/app/boardDisplay';
import { fireEvent, getByRole, getByTestId, getByText } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';

describe('boardDidsplayManager', () => {
    let container: HTMLDivElement;
    function createContainer(): HTMLDivElement {
        const div = document.createElement('div');
        div.id = "chess-app";
        return div;
    }

    beforeEach(() => {
        document.body.innerHTML = '';
        container = createContainer();
        document.body.append(container);
    })

    test('creates div which contains fields describing files at opponent side', (): void => {
        const board = new BoardDisplay('chess-app');

        board.createChessBoard();

        expect(document.getElementById('opponentFile')).toBeInTheDocument();
    })

    test('creates div which contains fields describing rank at our side', (): void => {
        const board = new BoardDisplay('chess-app');

        board.createChessBoard();

        expect(document.getElementById('myRank')).toBeInTheDocument();
    })

    test('check number of divs(squares) in board', (): void => {
        const board = new BoardDisplay('chess-app');

        board.createChessBoard();

        expect(document.querySelectorAll('.box').length).toEqual(64)
    })

    test('creates div which contains fields describing rank at opponent side', (): void => {
        const board = new BoardDisplay('chess-app');

        board.createChessBoard();

        expect(document.getElementById('opponentRank')).toBeInTheDocument();
    })

    test('creates div which contains fields describing files at opponent side', (): void => {
        const board = new BoardDisplay('chess-app');

        board.createChessBoard();

        expect(document.getElementById('myFile')).toBeInTheDocument();
    })

    test('check correct order of description fields', (): void => {
        const board = new BoardDisplay('chess-app');

        board.createChessBoard();
        const opponentFiles = [].slice.call(document.getElementById('opponentFile').children);
        opponentFiles.pop();
        opponentFiles.shift();
        const myFiles = [].slice.call(document.getElementById('myFile').children);
        myFiles.pop();
        myFiles.shift();
        const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
        const opponentRanks = [].slice.call(document.getElementById('opponentRank').children);
        const myRanks = [].slice.call(document.getElementById('myRank').children);
        const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];

        opponentFiles.forEach((v: HTMLElement, i: number) => {
            expect(v.textContent).toBe(files[i].toUpperCase());
        });
        myFiles.forEach((v: HTMLElement, i: number) => {
            expect(v.textContent).toBe(files[i].toUpperCase());
        });
        opponentRanks.forEach((v: HTMLElement, i: number) => {
            expect(v.textContent).toBe(ranks[i]);
        });
        myRanks.forEach((v: HTMLElement, i: number) => {
            expect(v.textContent).toBe(ranks[i]);
        });
    });

})