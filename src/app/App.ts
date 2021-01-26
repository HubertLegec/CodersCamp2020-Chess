import { boardDisplayManager } from './boardDisplayManager'
export const App = () => {
  let boardDisplay = new boardDisplayManager('chess-app');
  boardDisplay.createChessBoard();
  console.log('App');
}
