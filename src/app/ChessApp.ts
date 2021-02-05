import { URLParameters } from './URLParameters'
import { GamePage } from './GamePage';
import { Game } from './Game';

export const ChessApp = () => {
    const urlParameters = new URLParameters(window.location.search);

    const gamePage= new GamePage(urlParameters.getFirstName(), urlParameters.getSecondName());
    gamePage.displayGameInfo();

    const game = new Game({firstName: urlParameters.getFirstName(), secondName: urlParameters.getSecondName(), time: parseInt(urlParameters.getTime())});
    game.startGame();
}
