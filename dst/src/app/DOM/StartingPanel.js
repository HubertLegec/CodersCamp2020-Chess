"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StartingPanel = void 0;
var StartingPanel = /** @class */ (function () {
    function StartingPanel(containerId, onstart) {
        this.containerId = containerId;
        this.onStart = onstart;
    }
    StartingPanel.prototype.createStartingPage = function () {
        this.createLogo();
        this.createGamePanel();
        this.createNameSettings('gamePanel');
        this.createSlider('gamePanel');
        this.createStartButton('gamePanel');
    };
    StartingPanel.prototype.createLogo = function () {
        var logo = document.createElement('h3');
        logo.setAttribute('id', 'codersLogo');
        logo.textContent = '.CodersCrew';
        document.getElementById(this.containerId).appendChild(logo);
    };
    StartingPanel.prototype.createGamePanel = function () {
        var gamePanel = document.createElement('div');
        gamePanel.setAttribute('id', 'gamePanel');
        document.getElementById(this.containerId).appendChild(gamePanel);
        var gameSettings = document.createElement('p');
        gameSettings.textContent = 'USTAWIENIA GRY';
        gamePanel.appendChild(gameSettings);
    };
    StartingPanel.prototype.createNameSettings = function (gamePanelId) {
        var gamePanel = document.getElementById(gamePanelId);
        var nameSettings = document.createElement('div');
        nameSettings.setAttribute('id', 'nameSettings');
        var playerNames = document.createElement('p');
        playerNames.textContent = 'IMIONA GRACZY';
        nameSettings.appendChild(playerNames);
        var firstName = document.createElement('input');
        firstName.setAttribute('id', 'firstPlayerName');
        firstName.setAttribute('placeholder', "Białe - pierwszy gracz");
        nameSettings.appendChild(firstName);
        var secondName = document.createElement('input');
        secondName.setAttribute('id', 'secondPlayerName');
        secondName.setAttribute('placeholder', "Czarne - drugi gracz");
        nameSettings.appendChild(secondName);
        gamePanel.appendChild(nameSettings);
    };
    StartingPanel.prototype.createSlider = function (gamePanelId) {
        var gamePanel = document.getElementById(gamePanelId);
        var sliderContainer = document.createElement('div');
        sliderContainer.setAttribute('class', 'sliderContainer');
        var gameTime = document.createElement('p');
        gameTime.textContent = "CZAS GRY";
        sliderContainer.appendChild(gameTime);
        var sliderInput = document.createElement('input');
        sliderInput.setAttribute('type', 'range');
        sliderInput.setAttribute('min', '1');
        sliderInput.setAttribute('max', '100');
        sliderInput.setAttribute('value', '15');
        sliderInput.setAttribute('class', 'slider');
        sliderInput.setAttribute('id', 'sliderTime');
        sliderContainer.appendChild(sliderInput);
        var gameplayTime = document.createElement('p');
        gameplayTime.setAttribute('id', 'gameplayTime');
        gameplayTime.innerHTML = 'DŁUGOŚĆ GRY: <span id="sliderValue"></span> minut(y)';
        sliderContainer.appendChild(gameplayTime);
        gamePanel.appendChild(sliderContainer);
        var slider = document.getElementById("sliderTime");
        var output = document.getElementById("sliderValue");
        output.innerHTML = slider.value;
        slider.addEventListener('input', function () {
            output.innerHTML = slider.value;
        });
    };
    StartingPanel.prototype.createStartButton = function (gamePanelId) {
        var _this = this;
        var gamePanel = document.getElementById(gamePanelId);
        var startGameButton = document.createElement('button');
        startGameButton.setAttribute('id', 'gameStartButton');
        startGameButton.textContent = 'ROZPOCZNIJ GRĘ';
        gamePanel.appendChild(startGameButton);
        startGameButton.addEventListener('click', function () {
            var info = {
                firstName: document.getElementById('firstPlayerName').value,
                secondName: document.getElementById('secondPlayerName').value,
                time: document.getElementById('sliderTime').value
            };
            _this.onStart(info);
            _this.removeElement('codersLogo');
            _this.removeElement('gamePanel');
        });
    };
    StartingPanel.prototype.removeElement = function (elementId) {
        var element = document.getElementById(elementId);
        element.parentElement.removeChild(element);
    };
    return StartingPanel;
}());
exports.StartingPanel = StartingPanel;
