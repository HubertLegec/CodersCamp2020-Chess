import {Board} from "./Board"
import { StartingPanel } from "./DOM/StartingPanel"
import {Game} from "./Game"
import {StartData} from "./Data"



export const App = () => {
  const startPanel = new StartingPanel("chess-app", (data:StartData)=>{
    const game = new Game(data);
    game.startGame();
  });
  startPanel.createStartingPage();
}
