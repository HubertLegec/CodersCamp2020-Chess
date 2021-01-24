export class startingPanelManager{
    createStartingPanel(){
        let mainDiv = document.getElementById('chess-app')

        //logo
        let logo = document.createElement('h3');
        logo.setAttribute('id', 'codersLogo');
        logo.textContent = '.CodersCrew'
        mainDiv.appendChild(logo)

        //gamePanel
        let gamePanel = document.createElement('div');
        gamePanel.setAttribute('id', 'gamePanel');
        mainDiv.appendChild(gamePanel);
        let gameSettings = document.createElement('p');
        gameSettings.textContent = 'USTAWIENIA GRY';
        gamePanel.appendChild(gameSettings)

        //nameSettings
        let nameSettings = document.createElement('div');
        nameSettings.setAttribute('id', 'nameSettings');
        let playerNames = document.createElement('p');
        playerNames.textContent = 'IMIONA GRACZY';
        nameSettings.appendChild(playerNames);
        let firstName = document.createElement('input');
        firstName.setAttribute('id', 'firstPlayerName');
        firstName.setAttribute('placeholder',"Białe - pierwszy gracz")
        nameSettings.appendChild(firstName)
        let secondName = document.createElement('input');
        secondName.setAttribute('id', 'secondPlayerName');
        secondName.setAttribute('placeholder',"Czarne - drugi gracz")
        nameSettings.appendChild(secondName)
        gamePanel.appendChild(nameSettings);

        //slider
        let sliderContainer = document.createElement('div');
        sliderContainer.setAttribute('class', 'sliderContainer');
        let gameTime = document.createElement('p');
        gameTime.textContent = "CZAS GRY"
        sliderContainer.appendChild(gameTime)
        let sliderInput = document.createElement('input');
        sliderInput.setAttribute('type', 'range');
        sliderInput.setAttribute('min', '1');
        sliderInput.setAttribute('max', '100');
        sliderInput.setAttribute('value', '15');
        sliderInput.setAttribute('class', 'slider');
        sliderInput.setAttribute('id', 'sliderTime');
        sliderContainer.appendChild(sliderInput)
        let gameplayTime = document.createElement('p')
        gameplayTime.setAttribute('id', 'gameplayTime');
        gameplayTime.innerHTML = 'DŁUGOŚĆ GRY: <span id="sliderValue"></span> minut(y)'
        sliderContainer.appendChild(gameplayTime)
        gamePanel.appendChild(sliderContainer)

        //button
        let startGameButton = document.createElement('button');
        startGameButton.setAttribute('id', 'gameStartButton');
        startGameButton.textContent = 'ROZPOCZNIJ GRĘ';
        gamePanel.appendChild(startGameButton);


        let slider = document.getElementById("sliderTime");
        let output = document.getElementById("sliderValue");
        output.innerHTML = slider.value;

        slider.oninput = function() {
        output.innerHTML = this.value;
        }
    }
}
