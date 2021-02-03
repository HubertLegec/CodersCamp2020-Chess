export class ParametersURL {
    firstPlayer = true;
    secondPlayer = true;
    getParams(url: string) {
        let params: Array<string> = [];
        const paramsUrl = new URLSearchParams(url);
        paramsUrl.forEach(param => params.push(param));
        return params;
    }
    setButtons() {
        const buttonStopFirst = document.getElementById('startStopTimeFirst');
        const buttonStopSecond = document.getElementById('startStopTimeSecond');
        let intervalFirst;
        let intervalSecond;
        buttonStopFirst.addEventListener('click', () => {
            if (this.firstPlayer) {
                this.firstPlayer = false;
                intervalFirst = setInterval(this.updateCountdownFirstPlayer, 1000);
            }
            else if (!this.firstPlayer) {
                this.firstPlayer = true;
                clearInterval(intervalFirst);
            }
        })
        buttonStopSecond.addEventListener('click', () => {
            if (this.secondPlayer) {
                this.secondPlayer = false;
                intervalSecond = setInterval(this.updateCountdownSecondPlayer, 1000);
            }
            else if (!this.secondPlayer) {
                this.secondPlayer = true;
                clearInterval(intervalSecond);
            }
        })
    }
    timeFirst: number;
    timeSecond: number;
    firstPlayerTime = document.getElementById('firstPlayerTime');
    secondPlayerTime = document.getElementById('secondPlayerTime');
    displayParameters() {
        const params = this.getParams(window.location.search);
        const firstPlayerName = document.getElementById('firstPlayerName');
        const secondPlayerName = document.getElementById('secondPlayerName');
        firstPlayerName.innerText = params[0];
        secondPlayerName.innerText = params[1];
        this.firstPlayerTime.textContent = `${params[2]}:00`
        this.secondPlayerTime.textContent = `${params[2]}:00`
        this.timeFirst = parseInt(params[2]) * 60;
        this.timeSecond = parseInt(params[2]) * 60;
        this.setButtons();
    }
    updateCountdownFirstPlayer = () => {
        let minutes = Math.floor(this.timeFirst / 60);
        let seconds: number = this.timeFirst % 60;
        this.firstPlayerTime.textContent = `${minutes}: ${seconds}`;
        this.timeFirst--;
    }
    updateCountdownSecondPlayer = () => {
        let minutes = Math.floor(this.timeSecond / 60);
        let seconds: number = this.timeSecond % 60;
        this.secondPlayerTime.textContent = `${minutes}: ${seconds}`;
        this.timeSecond--;
    }
}