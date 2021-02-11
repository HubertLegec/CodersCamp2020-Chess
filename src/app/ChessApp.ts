import { URLParameters } from './display/URLParameters'
import { GamePage } from './display/GamePage';

export const ChessApp = () => {
    const urlParameters = new URLParameters(window.location.search);

    const gamePage= new GamePage(urlParameters.getFirstName(), urlParameters.getSecondName());
    gamePage.displayGameInfo();
}
