export class LandingPage {
    private flagInputOne: string = '';
    private flagInputTwo: string = '';

    addEventsToDOMElements() {
        this.checkInputs();
        this.sliderValue();
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
    private sliderValue() {
        const output: HTMLElement = document.getElementById("sliderValue");
        const slider: HTMLInputElement = document.getElementById("sliderTime") as HTMLInputElement;
        output.innerHTML = slider.value;
        slider.addEventListener('input', (): void => {
            output.innerHTML = slider.value;
        })
    }
    watchInputFlags() {
        if (this.flagInputOne.length > 2 && this.flagInputTwo.length > 2) {
            document.getElementById('gameStartButton').removeAttribute('disabled')
        }
        else document.getElementById('gameStartButton').setAttribute('disabled', 'true')
    }
}

