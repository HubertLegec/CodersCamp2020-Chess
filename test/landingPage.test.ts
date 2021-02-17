import { LandingPage } from '../src/app/display/LandingPage';
import { fireEvent, getByRole, getByText} from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';

describe('LandingPage', () => {
    let container: HTMLDivElement;
    const fs = require('fs');
    const path = require('path');
    const html: string = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
    jest.dontMock('fs');

    beforeEach(() => {
        document.documentElement.innerHTML = html;
        container = document.body as HTMLDivElement;
        const landingPage = new LandingPage('chessGame.html');
        landingPage.addEventsToDOMElements();
    })

    test('changes minutes value with slider change', () => {
        const sliderValue = document.getElementById('sliderValue');
        const slider = getByRole(container, 'slider') as HTMLInputElement;

        fireEvent.input(slider, { target: { value: 30 } })

        expect(getByText(sliderValue, '30')).toBeInTheDocument();

    })

    test('check disabled button with two inputs', () => {
        const startGameButton: HTMLButtonElement = document.getElementById('gameStartButton') as HTMLButtonElement;
        const firstPlayerInput: HTMLInputElement = document.getElementById('firstPlayerName') as HTMLInputElement;
        const secondPlayerInput: HTMLInputElement = document.getElementById('secondPlayerName') as HTMLInputElement;

        fireEvent.input(firstPlayerInput, { target: { value: "Player1" } });
        fireEvent.input(secondPlayerInput, { target: { value: "Player2" } });

        expect(startGameButton).not.toHaveAttribute('disabled', "true");
    })

    test('button click calls window open with parametrized url', () => {
        global.open = jest.fn();        
        const firstPlayerInput = document.getElementById('firstPlayerName') as HTMLInputElement;
        const secondPlayerInput = document.getElementById('secondPlayerName') as HTMLInputElement;
        const slider = getByRole(container, 'slider') as HTMLInputElement;
        const button = getByRole(container, 'button') as HTMLButtonElement;
        
        fireEvent.input(firstPlayerInput, { target: { value: "red" } });
        fireEvent.input(secondPlayerInput, { target: { value: "blue" } });
        fireEvent.input(slider, { target: { value: "33"}});
        fireEvent.click(button);

        expect(global.open).toBeCalledWith('chessGame.html?name1=red&name2=blue&time=33', '_self');
    })

})