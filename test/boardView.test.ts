import { BoardView } from '../src/app/boardView';
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
        const board = new BoardView('chess-app');
        board.createChessBoard();
    })

    test('creates div which contains fields describing files at opponent side', () => {
        expect(document.getElementById('opponentFile')).toBeInTheDocument();
    })

    test('creates div which contains fields describing rank at our side', () => {
        expect(document.getElementById('myRank')).toBeInTheDocument();
    })

    test('check number of divs(squares) in board', () => {
        expect(document.querySelectorAll('[dataset="square"]').length).toEqual(64)
    })

    test('creates div which contains fields describing rank at opponent side', () => {
        expect(document.getElementById('opponentRank')).toBeInTheDocument();
    })

    test('creates div which contains fields describing files at opponent side', () => {
        expect(document.getElementById('myFile')).toBeInTheDocument();
    })

    test('check correct order of description fields', () => {
        const opponentFiles = [].slice.call(document.getElementById('opponentFile').children);
        const myFiles = [].slice.call(document.getElementById('myFile').children);
        const opponentRanks = [].slice.call(document.getElementById('opponentRank').children);
        const myRanks = [].slice.call(document.getElementById('myRank').children);

        expect(opponentFiles.map(f => f.textContent)).toEqual(['', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', ''])
        expect(myFiles.map(f => f.textContent)).toEqual(['', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', ''])
        expect(opponentRanks.map(f => f.textContent)).toEqual(['8', '7', '6', '5', '4', '3', '2', '1'])
        expect(myRanks.map(f => f.textContent)).toEqual(['8', '7', '6', '5', '4', '3', '2', '1'])
    });
})