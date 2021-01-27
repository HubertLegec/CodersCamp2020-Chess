"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DOMModifier = void 0;
var startingPanelManager_1 = require("./startingPanelManager");
var DOMModifier = /** @class */ (function () {
    function DOMModifier() {
    }
    DOMModifier.prototype.generateStartingPage = function () {
        var startingPanel = new startingPanelManager_1.startingPanelManager("chess-app");
        startingPanel.createStartingPage();
    };
    return DOMModifier;
}());
exports.DOMModifier = DOMModifier;
