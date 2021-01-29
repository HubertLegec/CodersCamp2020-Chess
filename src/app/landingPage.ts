
export class LandingPage {
    private flagInputOne: string = '';
    private flagInputTwo: string = '';

    createStartingPage() {
        this.checkInputs();
        this.chessboardButton();
    }

    private checkInputs() {
        const firstName: HTMLInputElement = document.getElementById('firstPlayerName') as HTMLInputElement;
        const secondName: HTMLInputElement = document.getElementById('secondPlayerName') as HTMLInputElement;
        firstName.onchange = () => {
            this.flagInputOne = firstName.value;
            this.watchInputFlags();
        }
        secondName.onchange = () => {
            this.flagInputTwo = secondName.value;
            this.watchInputFlags();
        }
    }
    private chessboardButton() {
        const startGameButton: HTMLButtonElement = document.getElementById('gameStartButton')
        startGameButton.addEventListener('click', () => {
            this.removeElement('codersLogo');
            this.removeElement('gamePanel');
        })
    }
    watchInputFlags() {
        if (this.flagInputOne.length > 2 && this.flagInputTwo.length > 2) {
            document.getElementById('gameStartButton').removeAttribute('disabled')
        }
        else document.getElementById('gameStartButton').setAttribute('disabled', 'true')
    }
    private removeElement(elementId: string) {
        const element: HTMLElement = document.getElementById(elementId);
        element.parentElement.removeChild(element);
    }
}
