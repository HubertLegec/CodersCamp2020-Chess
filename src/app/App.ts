import { StartingPanelManager } from './startingPanelManager'
export const App = () => {
  let startingPanel = new StartingPanelManager('chess-app')
  startingPanel.createStartingPage();
  console.log('App');
}
