import { URLParameters } from './display/URLParameters'
import { GamePage } from './display/GamePage';
import { Game } from './game/Game';

export const ChessApp = () => {
    const urlParameters = new URLParameters(window.location.search);

    const gamePage= new GamePage(urlParameters.getFirstName(), urlParameters.getSecondName());
    const game = new Game(urlParameters.getFirstName(), urlParameters.getSecondName(), parseInt(urlParameters.getTime()));

    gamePage.addOnClick(game.undoMove.bind(game));
    gamePage.displayGameInfo();   
}
