"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startingPanelManager = void 0;
var startingPanelManager = /** @class */ (function () {
    function startingPanelManager(containerId) {
        this.containerId = containerId;
        this.firstName = "";
        this.secondName = "";
        this.isDataReady = false;
    }
    startingPanelManager.prototype.createStartingPage = function () {
        return __awaiter(this, void 0, void 0, function () {
            var startingData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.createLogo();
                        this.createGamePanel();
                        this.createNameSettings('gamePanel');
                        this.createSlider('gamePanel');
                        this.createStartButton('gamePanel');
                        return [4 /*yield*/, this.getData()];
                    case 1:
                        startingData = _a.sent();
                        return [2 /*return*/, startingData];
                }
            });
        });
    };
    startingPanelManager.prototype.getData = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                while (!this.isDataReady) { }
                return [2 /*return*/, new { fName: this.firstName }];
            });
        });
    };
    startingPanelManager.prototype.createLogo = function () {
        var logo = document.createElement('h3');
        logo.setAttribute('id', 'codersLogo');
        logo.textContent = '.CodersCrew';
        document.getElementById(this.containerId).appendChild(logo);
    };
    startingPanelManager.prototype.createGamePanel = function () {
        var gamePanel = document.createElement('div');
        gamePanel.setAttribute('id', 'gamePanel');
        document.getElementById(this.containerId).appendChild(gamePanel);
        var gameSettings = document.createElement('p');
        gameSettings.textContent = 'USTAWIENIA GRY';
        gamePanel.appendChild(gameSettings);
    };
    startingPanelManager.prototype.createNameSettings = function (gamePanelId) {
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
    startingPanelManager.prototype.createSlider = function (gamePanelId) {
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
    startingPanelManager.prototype.createStartButton = function (gamePanelId) {
        var _this = this;
        var gamePanel = document.getElementById(gamePanelId);
        var startGameButton = document.createElement('button');
        startGameButton.setAttribute('id', 'gameStartButton');
        startGameButton.textContent = 'ROZPOCZNIJ GRĘ';
        gamePanel.appendChild(startGameButton);
        startGameButton.addEventListener('click', function () {
            _this.removeElement('codersLogo');
            _this.removeElement('gamePanel');
        });
    };
    startingPanelManager.prototype.removeElement = function (elementId) {
        var element = document.getElementById(elementId);
        element.parentElement.removeChild(element);
    };
    return startingPanelManager;
}());
exports.startingPanelManager = startingPanelManager;
