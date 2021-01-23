"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cell = void 0;
var Cell = /** @class */ (function () {
    function Cell(fig, blackAttack, whiteAttack) {
        if (blackAttack === void 0) { blackAttack = new Array(); }
        if (whiteAttack === void 0) { whiteAttack = new Array(); }
        this.figure = fig;
        this.position = fig.position;
    }
    return Cell;
}());
exports.Cell = Cell;
