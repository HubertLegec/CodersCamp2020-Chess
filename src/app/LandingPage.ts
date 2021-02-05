import { GameUrl } from './GameUrl';

export class LandingPage {
    private _gameUrl: GameUrl;
    private _flagInputOne: string;
    private _flagInputTwo: string;

    constructor(chessGameBaseUrl: string) {
        this._gameUrl = new GameUrl(chessGameBaseUrl);
    }

    addEventsToDOMElements() {
        this.checkInputs();
        this.sliderValue();
        this.setButtonEvent();
    }

    private checkInputs() {
        const firstName: HTMLInputElement = document.getElementById('firstPlayerName') as HTMLInputElement;
        const secondName: HTMLInputElement = document.getElementById('secondPlayerName') as HTMLInputElement;

        this._flagInputOne = firstName.value;
        this._flagInputTwo = secondName.value;

        firstName.addEventListener('input', () => {
            this._flagInputOne = firstName.value;
            this.watchInputFlags();
        })

        secondName.addEventListener('input', () => {
            this._flagInputTwo = secondName.value;
            this.watchInputFlags();
        })
    }

    private sliderValue() {
        const output: HTMLElement = document.getElementById("sliderValue") as HTMLElement;
        const slider: HTMLInputElement = document.getElementById("sliderTime") as HTMLInputElement;
        output.innerHTML = slider.value;

        slider.addEventListener('input', () => {
            output.innerHTML = slider.value;
        })
    }

    private setButtonEvent() {
        const button: HTMLButtonElement = document.getElementById('gameStartButton') as HTMLButtonElement;
        const firstName: HTMLInputElement = document.getElementById('firstPlayerName') as HTMLInputElement;
        const secondName: HTMLInputElement = document.getElementById('secondPlayerName') as HTMLInputElement;
        const slider: HTMLInputElement = document.getElementById("sliderTime") as HTMLInputElement;

        button.addEventListener('click', () => {
            this._gameUrl.firstPlayerName = firstName.value;
            this._gameUrl.secondPlayerName = secondName.value;
            this._gameUrl.gameTime = slider.value;
    
            window.open(this._gameUrl.getUrl(), '_self');
        })
    }

    private watchInputFlags() {
        if (this._flagInputOne.length > 2 && this._flagInputTwo.length > 2) {
            document.getElementById('gameStartButton').removeAttribute('disabled');
        }
        else document.getElementById('gameStartButton').setAttribute('disabled', 'true');
    }
}
