import { URLParameters } from './page/URLParameters'
import { GamePage } from './page/GamePage';
import { Game } from './game/Game';

export const ChessApp = () => {
    const urlParameters = new URLParameters(window.location.search);

    const gamePage= new GamePage(urlParameters.getFirstName(), urlParameters.getSecondName());
    gamePage.displayGameInfo();

    const game = new Game({firstName: urlParameters.getFirstName(), secondName: urlParameters.getSecondName(), time: parseInt(urlParameters.getTime())});
    game.startGame();
}
