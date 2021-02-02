import { LandingPage } from '../src/app/LandingPage';
import { fireEvent, getByRole, getByTestId, getByText } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';

describe('startingPanelManager', () => {
    let container: HTMLDivElement;

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

    test('button link href attribute has set game params', () => {
        const firstPlayerInput = document.getElementById('firstPlayerName') as HTMLInputElement;
        const secondPlayerInput = document.getElementById('secondPlayerName') as HTMLInputElement;
        const slider = getByRole(container, 'slider') as HTMLInputElement;
        const buttonLink = getByRole(container, 'link') as HTMLAnchorElement;        
        
        fireEvent.input(firstPlayerInput, { target: { value: "red" } });
        fireEvent.input(secondPlayerInput, { target: { value: "blue" } });
        fireEvent.input(slider, { target: { value: "33"}});

        expect(buttonLink.href).toContain('chessGame.html?name1=red&name2=blue&time=33');
    })

})