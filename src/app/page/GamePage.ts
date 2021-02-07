export class GamePage {
    private _firstPlayerName: string;
    private _secondPlayerName: string;

    constructor(firstPlayerName: string, secondPlayerName: string){
        this._firstPlayerName = firstPlayerName;
        this._secondPlayerName = secondPlayerName;
    }

    displayGameInfo() {
        this.displayPlayersNames();
    }

    private displayPlayersNames(){
        const firstPlayer = document.getElementById('firstPlayerName') as HTMLElement;
        const secondPlayer = document.getElementById('secondPlayerName') as HTMLElement;

        firstPlayer.textContent = this._firstPlayerName;
        secondPlayer.textContent = this._secondPlayerName;
    }
    
}