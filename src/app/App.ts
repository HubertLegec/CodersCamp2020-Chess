import { LandingPage } from './landingPage'
import { BoardView } from './boardView'
export const App = () => {
  let board = new BoardView('chess-app');
  let landingPage = new LandingPage('chess-app', board);
  landingPage.createStartingPage();
}
