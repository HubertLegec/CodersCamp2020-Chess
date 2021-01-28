import { LandingPage } from '../src/app/landingPage';
import { fireEvent, getByRole, getByTestId, getByText } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';

describe('startingPanelManager', () => {
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
        const startingPanel = new LandingPage('chess-app');
        startingPanel.createStartingPage();
    })

    test('creates CodersCrew logo', () => {
        expect(getByText(container, '.CodersCrew')).toBeInTheDocument();
    })

    test('creates game panel', () => {
        expect(document.getElementById('gamePanel')).toBeInTheDocument();
    })

    test('creates button in game panel', () => {
        const gamePanel = document.getElementById('gamePanel');
        const startButton = document.getElementById('gameStartButton')

        expect(gamePanel).toContainElement(startButton);
    })

    test('creates elements in nameSettings div', () => {
        const nameSettings = document.getElementById('nameSettings');
        const firstPlayer = document.getElementById('firstPlayerName');
        const secondPlayer = document.getElementById('secondPlayerName');

        expect(getByText(nameSettings, 'IMIONA GRACZY')).toBeInTheDocument();
        expect(nameSettings).toContainElement(firstPlayer);
        expect(nameSettings).toContainElement(secondPlayer);
    })

    test('creates elements in sliderContainer div', () => {
        const sliderContainer = document.querySelector('.sliderContainer') as HTMLElement;
        const slider = document.getElementById('sliderTime')

        expect(getByText(sliderContainer, 'CZAS GRY')).toBeInTheDocument();
        expect(sliderContainer).toContainElement(slider);
    })

    test('changes minutes value with slider change', () => {
        const sliderValue = document.getElementById('sliderValue');
        const slider = getByRole(container, 'slider') as HTMLInputElement;
        fireEvent.input(slider, { target: { value: 30 } })

        expect(getByText(sliderValue, '30')).toBeInTheDocument();

    })

    test('starting button clear all elements / test removeElement function', () => {
        const startingButton = document.getElementById('gameStartButton');
        fireEvent.click(startingButton);
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