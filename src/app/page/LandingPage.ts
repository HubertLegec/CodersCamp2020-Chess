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
        this.animatePieces();
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
        const button = document.getElementById('gameStartButton') as HTMLButtonElement;
        
        if (this._flagInputOne.length > 2 && this._flagInputTwo.length > 2) {
            button.removeAttribute('disabled');
        } else {
            button.setAttribute('disabled', 'true');
        }
    }

    private animatePieces() {
        const svg: SVGElement | null = document.querySelector('svg');
        const piece_parts = document.querySelectorAll('svg g polygon');
        const gamePanel = document.getElementById('gamePanel');
        piece_parts.forEach(p  => { 
            const transition = `transition: transform ${Math.floor(Math.random() * 1500)}ms`;
            p.setAttribute("style", transition);
        });
        if(gamePanel){
            setTimeout(() => {
                console.log('ju');
                gamePanel.setAttribute('style', 'opacity: 1')
            }, 2000);
        }

        svg? svg.setAttribute('class', '') : false;
    }
}
