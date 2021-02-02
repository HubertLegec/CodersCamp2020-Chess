import { GameUrl } from "./GameUrl";

export class LandingPage {
    private _gameUrl: GameUrl;
    private _flagInputOne: string;
    private _flagInputTwo: string;

    constructor(chessGameBaseUrl){
        this._gameUrl = new GameUrl(chessGameBaseUrl);
    }

    addEventsToDOMElements() {
        this.checkInputs();
        this.sliderValue();
    }

    private checkInputs() {
        const firstName: HTMLInputElement = document.getElementById('firstPlayerName') as HTMLInputElement;
        const secondName: HTMLInputElement = document.getElementById('secondPlayerName') as HTMLInputElement;

        this._flagInputOne = firstName.value;
        this._flagInputTwo = secondName.value;
        this._gameUrl.firstPlayerName = firstName.value;
        this._gameUrl.secondPlayerName = secondName.value;
        this.watchInputFlags();
        this.setButtonHref();

        firstName.addEventListener('input', () => {
            this._flagInputOne = firstName.value;
            this._gameUrl.firstPlayerName = firstName.value;
            this.setButtonHref();
            this.watchInputFlags();
        })  

        secondName.addEventListener('input', () => {
            this._flagInputTwo = secondName.value;
            this._gameUrl.secondPlayerName = secondName.value;
            this.setButtonHref();
            this.watchInputFlags();
        }) 
    }

    private sliderValue() {
        const output: HTMLElement = document.getElementById("sliderValue");
        const slider: HTMLInputElement = document.getElementById("sliderTime") as HTMLInputElement;
        output.innerHTML = slider.value;
        this._gameUrl.gameTime = slider.value;
        this.setButtonHref();

        slider.addEventListener('input', () => {
            output.innerHTML = slider.value;
            this._gameUrl.gameTime = slider.value;
            this.setButtonHref();
        })
    }

    private setButtonHref() {
        const buttonLink: HTMLAnchorElement = document.getElementById('chessboardView') as HTMLAnchorElement;
        buttonLink.href = this._gameUrl.getUrl();
    }
    
    private watchInputFlags() {
        if (this._flagInputOne.length > 2 && this._flagInputTwo.length > 2) {
            document.getElementById('gameStartButton').removeAttribute('disabled')
        }
        else document.getElementById('gameStartButton').setAttribute('disabled', 'true')
    }
}

