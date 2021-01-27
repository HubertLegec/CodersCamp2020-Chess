import {StartData} from "../Data"

export class StartingPanel {
    private containerId: string;
    private onStart:(data:StartData)=>void;

    constructor(containerId: string, onstart: (data:StartData)=>void) {
        this.containerId = containerId;
        this.onStart = onstart;
    }

    createStartingPage(): void {
        this.createLogo();
        this.createGamePanel();
        this.createNameSettings('gamePanel');
        this.createSlider('gamePanel');
        this.createStartButton('gamePanel');
    }

    private createLogo(): void {
        let logo: HTMLElement = document.createElement('h3');
        logo.setAttribute('id', 'codersLogo');
        logo.textContent = '.CodersCrew';
        document.getElementById(this.containerId).appendChild(logo);
    }

    private createGamePanel(): void {
        let gamePanel: HTMLDivElement = document.createElement('div');
        gamePanel.setAttribute('id', 'gamePanel');
        document.getElementById(this.containerId).appendChild(gamePanel);
        let gameSettings = document.createElement('p');
        gameSettings.textContent = 'USTAWIENIA GRY';
        gamePanel.appendChild(gameSettings);
    }

    private createNameSettings(gamePanelId: string): void {
        let gamePanel: HTMLDivElement = document.getElementById(gamePanelId) as HTMLDivElement;
        let nameSettings: HTMLDivElement = document.createElement('div');
        nameSettings.setAttribute('id', 'nameSettings');
        let playerNames: HTMLParagraphElement = document.createElement('p');
        playerNames.textContent = 'IMIONA GRACZY';
        nameSettings.appendChild(playerNames);
        let firstName: HTMLInputElement = document.createElement('input');
        firstName.setAttribute('id', 'firstPlayerName');
        firstName.setAttribute('placeholder', "Białe - pierwszy gracz");
        nameSettings.appendChild(firstName);
        let secondName: HTMLInputElement = document.createElement('input');
        secondName.setAttribute('id', 'secondPlayerName');
        secondName.setAttribute('placeholder', "Czarne - drugi gracz");
        nameSettings.appendChild(secondName);
        gamePanel.appendChild(nameSettings);
    }

    private createSlider(gamePanelId: string): void {
        let gamePanel: HTMLDivElement = document.getElementById(gamePanelId) as HTMLDivElement;
        let sliderContainer: HTMLDivElement = document.createElement('div');
        sliderContainer.setAttribute('class', 'sliderContainer');
        let gameTime: HTMLParagraphElement = document.createElement('p');
        gameTime.textContent = "CZAS GRY";
        sliderContainer.appendChild(gameTime);
        let sliderInput: HTMLInputElement = document.createElement('input');
        sliderInput.setAttribute('type', 'range');
        sliderInput.setAttribute('min', '1');
        sliderInput.setAttribute('max', '100');
        sliderInput.setAttribute('value', '15');
        sliderInput.setAttribute('class', 'slider');
        sliderInput.setAttribute('id', 'sliderTime');
        sliderContainer.appendChild(sliderInput);
        let gameplayTime: HTMLParagraphElement = document.createElement('p');
        gameplayTime.setAttribute('id', 'gameplayTime');
        gameplayTime.innerHTML = 'DŁUGOŚĆ GRY: <span id="sliderValue"></span> minut(y)';
        sliderContainer.appendChild(gameplayTime);
        gamePanel.appendChild(sliderContainer);
        let slider: HTMLInputElement = document.getElementById("sliderTime") as HTMLInputElement;
        let output: HTMLElement = document.getElementById("sliderValue");
        output.innerHTML = slider.value;
        slider.addEventListener('input', (): void => {
            output.innerHTML = slider.value;
        })
    }
    private createStartButton(gamePanelId: string): void {
        let gamePanel: HTMLDivElement = document.getElementById(gamePanelId) as HTMLDivElement;
        let startGameButton: HTMLButtonElement = document.createElement('button');
        startGameButton.setAttribute('id', 'gameStartButton');
        startGameButton.textContent = 'ROZPOCZNIJ GRĘ';
        gamePanel.appendChild(startGameButton);
        startGameButton.addEventListener('click', (): void => {
            const info:StartData = {
                firstName: document.getElementById('firstPlayerName').value,
                secondName: document.getElementById('secondPlayerName').value;
                time:document.getElementById('sliderTime').value;
            }
            this.onStart(info);

            this.removeElement('codersLogo');
            this.removeElement('gamePanel');
        })
    }

    private removeElement(elementId: string): void {
        let element: HTMLElement = document.getElementById(elementId);
        element.parentElement.removeChild(element);
    }
}