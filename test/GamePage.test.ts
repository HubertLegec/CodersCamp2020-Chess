import { GamePage } from '../src/app/GamePage';
import { getByText } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';

describe('GamePage', () => {
    let container;

    function createSampleSettings(){
        const gameSettings  = document.createElement('div');

        gameSettings.id = 'gameSettings';
        gameSettings.innerHTML = `
        <div id="names">
            <p id="firstPlayerName"></p>
            <p id="secondPlayerName"></p>
        </div>`;

        return gameSettings;
    }

    beforeEach(() => {
        document.body.innerHTML = '';
        container = document.body;
        container.append(createSampleSettings());
    })

    test('creates name text in player params', () => {
        const gamePage = new GamePage('blue', 'red');

        gamePage.displayGameInfo();

        expect(getByText(container, 'blue')).toBeInTheDocument();
        expect(getByText(container, 'red')).toBeInTheDocument();
    })


})