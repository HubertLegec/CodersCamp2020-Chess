import { StartingPanelManager } from '../src/app/startingPanelManager';
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
    })

    test('creates CodersCrew logo', (): void => {
        const startingPanel = new StartingPanelManager('chess-app');

        startingPanel.createStartingPage();

        expect(getByText(container, '.CodersCrew')).toBeInTheDocument();
    })

    test('creates game panel', (): void => {
        const startingPanel = new StartingPanelManager('chess-app');

        startingPanel.createStartingPage();

        expect(document.getElementById('gamePanel')).toBeInTheDocument();
    })

    test('creates button in game panel', (): void => {
        const startingPanel = new StartingPanelManager('chess-app');

        startingPanel.createStartingPage();
        const gamePanel = document.getElementById('gamePanel');
        const startButton = document.getElementById('gameStartButton')

        expect(gamePanel).toContainElement(startButton);
    })

    test('creates elements in nameSettings div', (): void => {
        const startingPanel = new StartingPanelManager('chess-app');

        startingPanel.createStartingPage();
        const nameSettings = document.getElementById('nameSettings');
        const firstPlayer = document.getElementById('firstPlayerName');
        const secondPlayer = document.getElementById('secondPlayerName');

        expect(getByText(nameSettings, 'IMIONA GRACZY')).toBeInTheDocument();
        expect(nameSettings).toContainElement(firstPlayer);
        expect(nameSettings).toContainElement(secondPlayer);
    })

    test('creates elements in sliderContainer div', (): void => {
        const startingPanel = new StartingPanelManager('chess-app');

        startingPanel.createStartingPage();
        const sliderContainer = document.querySelector('.sliderContainer') as HTMLElement;
        const slider = document.getElementById('sliderTime')


        expect(getByText(sliderContainer, 'CZAS GRY')).toBeInTheDocument();
        expect(sliderContainer).toContainElement(slider);
    })

    test('changes minutes value with slider change', () => {
        const startingPanel = new StartingPanelManager('chess-app');

        startingPanel.createStartingPage();
        const sliderValue = document.getElementById('sliderValue');
        const slider = getByRole(container, 'slider') as HTMLInputElement;
        fireEvent.input(slider, { target: { value: 30 } })


        expect(getByText(sliderValue, '30')).toBeInTheDocument();

    })

    test('starting button clear all elements', (): void => {
        const startingPanel = new StartingPanelManager('chess-app');

        startingPanel.createStartingPage();
        const startingButton = document.getElementById('gameStartButton');
        fireEvent.click(startingButton);

        expect(container).toBeEmpty();
    })
})