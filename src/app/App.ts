import { startingPanelManager } from './startingPanelManager'
export const App = () => {
  let startingPanel = new startingPanelManager('chess-app')
  startingPanel.createStartingPage();
  console.log('App');
}
