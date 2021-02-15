export class GamePage {
    private _firstPlayerName: string;
    private _secondPlayerName: string;

    constructor(firstPlayerName: string, secondPlayerName: string){
        this._firstPlayerName = firstPlayerName;
        this._secondPlayerName = secondPlayerName;
    }

    displayGameInfo() {
        this.displayPlayersNames();
        this.displayPromotionOptions();
    }

    private displayPlayersNames(){
        const firstPlayer = document.getElementById('firstPlayerName');
        const secondPlayer = document.getElementById('secondPlayerName');

        firstPlayer.textContent = this._firstPlayerName;
        secondPlayer.textContent = this._secondPlayerName;
    }

    displayPromotionOptions(){
        const popupMenu = document.getElementById('names');
        popupMenu.append(this.createOptionsButtons());
    }

    private createOptionsButtons(){
        const buttonContainer = document.createElement('div');
        const queenButton = document.createElement('button');
        const rookButton = document.createElement('button');
        const bishopButton = document.createElement('button');
        const knightButton = document.createElement('button');
        buttonContainer.append(...[queenButton, rookButton, bishopButton, knightButton])
        return buttonContainer;
    }
}