import { LandingPage } from './app/LandingPage';

window.onload = () => {
    const landingPage = new LandingPage('chessGame.html');
    landingPage.addEventsToDOMElements();
}


