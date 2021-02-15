export class GamePage {
    private _firstPlayerName: string;
    private _secondPlayerName: string;
    private onClick;

    constructor(firstPlayerName: string, secondPlayerName: string){
        this._firstPlayerName = firstPlayerName;
        this._secondPlayerName = secondPlayerName;
    }

    displayGameInfo() {
        this.displayPlayersNames();
        this.addUndoButtonHandler();
    }

    public addOnClick(onClick: () => any){
        this.onClick = onClick;
    }

    private displayPlayersNames(){
        const firstPlayer = document.getElementById('firstPlayerName');
        const secondPlayer = document.getElementById('secondPlayerName');

        firstPlayer.textContent = this._firstPlayerName;
        secondPlayer.textContent = this._secondPlayerName;
    }

    private addUndoButtonHandler(){
        const button = document.getElementById('button1');
        button.addEventListener('click', () => this.onClick());
    }
}