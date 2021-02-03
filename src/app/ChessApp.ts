import { URLParameters } from './URLParameters'
import { GamePage } from './GamePage';

export const ChessApp = () => {
    const urlParameters = new URLParameters(window.location.search);
    const params = urlParameters.getParams();

    const gamePage= new GamePage(params[0], params[1]);
    gamePage.displayGameInfo();
}
