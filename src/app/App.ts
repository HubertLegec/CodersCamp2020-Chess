import { LandingPage } from './landingPage'
export const App = () => {
  let startingPanel = new LandingPage('chess-app')
  startingPanel.createStartingPage();
  console.log('App');
}
