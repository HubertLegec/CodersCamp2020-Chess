import { GamePage } from '../src/app/display/GamePage';
import { getByText } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';

describe('GamePage', () => {
    let container;
    const fs = require('fs');
    const path = require('path');
    const html: string = fs.readFileSync(path.resolve(__dirname, '../chessGame.html'), 'utf8');
    jest.dontMock('fs');

    beforeEach(() => {
        document.body.innerHTML = html;
        container = document.body;
    })

    test('creates name text in player params', () => {
        const gamePage = new GamePage('blue', 'red');

        gamePage.displayGameInfo();

        expect(getByText(container, 'blue')).toBeInTheDocument();
        expect(getByText(container, 'red')).toBeInTheDocument();
    })


})