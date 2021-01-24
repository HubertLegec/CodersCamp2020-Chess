import {startingPanelManager} from './startingPanelManager'
export const App = () => {
  let startingPanel = new startingPanelManager()
  startingPanel.createStartingPanel();
  console.log('App');
}
