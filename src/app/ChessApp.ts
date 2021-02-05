import { URLParameters } from './URLParameters'
import { GamePage } from './GamePage';

export const ChessApp = () => {
    const urlParameters = new URLParameters(window.location.search);

    const gamePage= new GamePage(urlParameters.getFirstName(), urlParameters.getSecondName());
    gamePage.displayGameInfo();
}
