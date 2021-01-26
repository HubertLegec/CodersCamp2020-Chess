import { boardDisplayManager } from '../src/app/boardDisplayManager';
import { fireEvent, getByRole, getByTestId, getByText } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';

describe('boardDidsplayManagerr', () => {
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

    test('creates div which contains chessboard', (): void => {
        const boardDisplay = new boardDisplayManager('chess-app');

        boardDisplay.createChessBoard();

        expect(document.getElementById('chessBoard')).toBeInTheDocument();
    })

    test('creates div which contains fields describing files at opponent side', (): void => {
        const boardDisplay = new boardDisplayManager('chess-app');

        boardDisplay.createChessBoard();

        expect(document.getElementById('opponentFile')).toBeInTheDocument();
    })
    test('check correct order of files in "opponentFile" div', (): void => {
        const boardDisplay = new boardDisplayManager('chess-app');

        boardDisplay.createChessBoard();

        const opponentFiles = [].slice.call(document.getElementById('opponentFile').children);
        opponentFiles.pop();
        opponentFiles.shift();
        const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
        opponentFiles.forEach((v, i) => {
            expect(v.textContent).toBe(files[i].toUpperCase());
        });
    });
    test('creates div which contains fields describing rank at our side', (): void => {
        const boardDisplay = new boardDisplayManager('chess-app');

        boardDisplay.createChessBoard();

        expect(document.getElementById('myRank')).toBeInTheDocument();
    })
    test('check correct order of ranks in "myRank" div', (): void => {
        const boardDisplay = new boardDisplayManager('chess-app');

        boardDisplay.createChessBoard();

        const opponentFiles = [].slice.call(document.getElementById('myRank').children);
        const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];
        opponentFiles.forEach((v, i) => {
            expect(v.textContent).toBe(ranks[i]);
        });
    })
    test('creates div which contains fields to play chess', (): void => {
        const boardDisplay = new boardDisplayManager('chess-app');

        boardDisplay.createChessBoard();

        expect(document.getElementById('board')).toBeInTheDocument();
    })
    test('check number of divs(squares) in board', (): void => {
        const boardDisplay = new boardDisplayManager('chess-app');

        boardDisplay.createChessBoard();

        expect(document.querySelectorAll('.box').length).toEqual(64)
    })
    test('creates div which contains fields describing rank at opponent side', (): void => {
        const boardDisplay = new boardDisplayManager('chess-app');

        boardDisplay.createChessBoard();

        expect(document.getElementById('opponentRank')).toBeInTheDocument();
    })
    test('check correct order of ranks in "opponentRank" div', (): void => {
        const boardDisplay = new boardDisplayManager('chess-app');

        boardDisplay.createChessBoard();

        const opponentFiles = [].slice.call(document.getElementById('opponentRank').children);
        const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];
        opponentFiles.forEach((v, i) => {
            expect(v.textContent).toBe(ranks[i]);
        });
    })
    test('creates div which contains fields describing files at opponent side', (): void => {
        const boardDisplay = new boardDisplayManager('chess-app');

        boardDisplay.createChessBoard();

        expect(document.getElementById('myFile')).toBeInTheDocument();
    })

    test('check correct order of files in "myFile" div', (): void => {
        const boardDisplay = new boardDisplayManager('chess-app');

        boardDisplay.createChessBoard();

        const opponentFiles = [].slice.call(document.getElementById('myFile').children);
        opponentFiles.pop();
        opponentFiles.shift();
        const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
        opponentFiles.forEach((v, i) => {
            expect(v.textContent).toBe(files[i].toUpperCase());
        });
    })

})