import { LandingPage } from './app/page/LandingPage';

window.onload = () => {
    const landingPage = new LandingPage('chessGame.html');
    landingPage.addEventsToDOMElements();
}


