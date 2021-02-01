import { LandingPage } from '../src/app/landingPage';
import { fireEvent, getByRole, getByTestId, getByText } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';

describe('startingPanelManager', () => {
    let container: HTMLDivElement;
    const landingPage = new LandingPage();

    function getChessApp(): HTMLDivElement {
        const chessApp = document.createElement('div');
        chessApp.id = 'chess-app';
        chessApp.innerHTML = `
        <h3 id="codersLogo">.CodersCrew</h3>
        <div id="gamePanel">
            <p id="gameSettingsTitle">USTAWIENIA GRY</p>
            <div id="nameSettings">
                <p>IMIONA GRACZY</p><input id="firstPlayerName" placeholder="Białe - pierwszy gracz"><input
                    id="secondPlayerName" placeholder="Czarne - drugi gracz">
            </div>
            <div class="sliderContainer">
                <p>CZAS GRY</p><input type="range" min="1" max="100" value="15" class="slider" id="sliderTime">
                <p id="gameplayTime">DŁUGOŚĆ GRY: <span id="sliderValue">15</span> minut(y)</p>
            </div>
            <a href="./chessboard.html" id='chessboardView'>
                <button id="gameStartButton" disabled="">ROZPOCZNIJ GRĘ</button>
            </a>
        </div>`;
        return chessApp;
    }

    beforeEach(() => {
        document.body.innerHTML = '';
        container = document.body as HTMLDivElement;
        container.append(getChessApp());
        landingPage.addEventsToDOMElements();
    })

    test('changes minutes value with slider change', () => {
        const sliderValue = document.getElementById('sliderValue');
        const slider = getByRole(container, 'slider') as HTMLInputElement;
        fireEvent.input(slider, { target: { value: 30 } })

        expect(getByText(sliderValue, '30')).toBeInTheDocument();

    })

    test('starting button clear all elements / test removeElement function', () => {
        const startButton = document.getElementById('gameStartButton');
        fireEvent.click(startButton);
        const chessBoard = document.getElementById('chessBoard');

        expect(container).toContainElement(chessBoard);
    })
    test('check disabled button with two inputs', () => {
        const startGameButton: HTMLButtonElement = document.getElementById('gameStartButton') as HTMLButtonElement;
        const firstPlayerInput: HTMLInputElement = document.getElementById('firstPlayerName') as HTMLInputElement;
        const secondPlayerInput: HTMLInputElement = document.getElementById('secondPlayerName') as HTMLInputElement;
        fireEvent.input(firstPlayerInput, { target: { value: "Player1" } });
        fireEvent.input(secondPlayerInput, { target: { value: "Player2" } });

        expect(startGameButton).not.toHaveAttribute('disabled', "true");
    })

})