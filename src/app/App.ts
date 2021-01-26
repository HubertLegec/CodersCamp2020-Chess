import { boardDisplay } from './boardDisplay'
export const App = () => {
  let board = new boardDisplay('chess-app');
  board.createChessBoard();
  console.log('App');
}
