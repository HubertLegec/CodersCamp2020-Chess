import { BoardDisplay } from './boardDisplay'
const board = new BoardDisplay('chess-app');
export class StartingPanelManager {
    private containerId: string;

    constructor(containerId: string) {
        this.containerId = containerId;
    }

    createStartingPage(): void {
        this.createLogo();
        this.createGamePanel();
        this.createNameSettings('gamePanel');
        this.createSlider('gamePanel');
        this.createStartButton('gamePanel');
    }

    private createLogo(): void {
        const logo: HTMLElement = document.createElement('h3');
        logo.setAttribute('id', 'codersLogo');
        logo.textContent = '.CodersCrew';
        document.getElementById(this.containerId).appendChild(logo);
    }

    private createGamePanel(): void {
        const gamePanel: HTMLDivElement = document.createElement('div');
        gamePanel.setAttribute('id', 'gamePanel');
        document.getElementById(this.containerId).appendChild(gamePanel);
        const gameSettings = document.createElement('p');
        gameSettings.textContent = 'USTAWIENIA GRY';
        gamePanel.appendChild(gameSettings);
    }

    private createNameSettings(gamePanelId: string): void {
        const gamePanel: HTMLDivElement = document.getElementById(gamePanelId) as HTMLDivElement;
        const nameSettings: HTMLDivElement = document.createElement('div');
        nameSettings.setAttribute('id', 'nameSettings');
        const playerNames: HTMLParagraphElement = document.createElement('p');
        playerNames.textContent = 'imiona graczy'.toUpperCase();
        nameSettings.appendChild(playerNames);
        const firstName: HTMLInputElement = document.createElement('input');
        firstName.setAttribute('id', 'firstPlayerName');
        firstName.setAttribute('placeholder', "Białe - pierwszy gracz");
        nameSettings.appendChild(firstName);
        const secondName: HTMLInputElement = document.createElement('input');
        secondName.setAttribute('id', 'secondPlayerName');
        secondName.setAttribute('placeholder', "Czarne - drugi gracz");
        nameSettings.appendChild(secondName);
        gamePanel.appendChild(nameSettings);
    }

    private createSlider(gamePanelId: string): void {
        const gamePanel: HTMLDivElement = document.getElementById(gamePanelId) as HTMLDivElement;
        const sliderContainer: HTMLDivElement = document.createElement('div');
        sliderContainer.setAttribute('class', 'sliderContainer');
        const gameTime: HTMLParagraphElement = document.createElement('p');
        gameTime.textContent = "czas gry".toUpperCase();
        sliderContainer.appendChild(gameTime);
        const sliderInput: HTMLInputElement = document.createElement('input');
        sliderInput.setAttribute('type', 'range');
        sliderInput.setAttribute('min', '1');
        sliderInput.setAttribute('max', '100');
        sliderInput.setAttribute('value', '15');
        sliderInput.setAttribute('class', 'slider');
        sliderInput.setAttribute('id', 'sliderTime');
        sliderContainer.appendChild(sliderInput);
        const gameplayTime: HTMLParagraphElement = document.createElement('p');
        gameplayTime.setAttribute('id', 'gameplayTime');
        gameplayTime.innerHTML = 'DŁUGOŚĆ GRY: <span id="sliderValue"></span> minut(y)';
        sliderContainer.appendChild(gameplayTime);
        gamePanel.appendChild(sliderContainer);
        const slider: HTMLInputElement = document.getElementById("sliderTime") as HTMLInputElement;
        const output: HTMLElement = document.getElementById("sliderValue");
        output.innerHTML = slider.value;
        slider.addEventListener('input', (): void => {
            output.innerHTML = slider.value;
        })
    }
    private createStartButton(gamePanelId: string): void {
        const gamePanel: HTMLDivElement = document.getElementById(gamePanelId) as HTMLDivElement;
        const firstPlayerInput: HTMLInputElement = document.getElementById('firstPlayerName') as HTMLInputElement;
        const secondPlayerInput: HTMLInputElement = document.getElementById('secondPlayerName') as HTMLInputElement;
        const gameTime: HTMLInputElement = document.getElementById('sliderTime') as HTMLInputElement;
        const startGameButton: HTMLButtonElement = document.createElement('button');
        startGameButton.setAttribute('id', 'gameStartButton');
        startGameButton.textContent = 'ROZPOCZNIJ GRĘ';
        startGameButton.disabled = true;
        gamePanel.appendChild(startGameButton);
        startGameButton.addEventListener('click', () => {
            this.removeElement('codersLogo');
            this.removeElement('gamePanel');
            board.createChessBoard();
            document.getElementById(this.containerId).classList.add('center');
        })
        let gameSettings: object = setInterval(() => {
            if (firstPlayerInput.value !== '' || secondPlayerInput.value !== '') {
                startGameButton.disabled = false;
            }
        }, 1000)
    }

    private removeElement(elementId: string): void {
        const element: HTMLElement = document.getElementById(elementId);
        element.parentElement.removeChild(element);
    }
}
