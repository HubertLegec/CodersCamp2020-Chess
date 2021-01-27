"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
var StartingPanel_1 = require("./DOM/StartingPanel");
var Game_1 = require("./Game");
var App = function () {
    var startPanel = new StartingPanel_1.StartingPanel("chess-app", function (data) {
        var game = new Game_1.Game(data);
        game.startGame();
    });
};
exports.App = App;
