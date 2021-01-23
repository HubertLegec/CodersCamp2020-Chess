"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Board = void 0;
var Figure_1 = require("./Figure");
var Cell_1 = require("./Cell");
var Board = /** @class */ (function () {
    function Board() {
        this.board = new Array(8);
        this.initBoard();
    }
    Board.prototype.initBoard = function () {
        for (var i = 0; i < 8; i++) {
            this.board[i] = new Array(8);
        }
        for (var i = 0; i < 8; i++) {
            for (var j = 0; j < 8; j++) {
                if (i == 1) {
                    this.board[i][j] = new Cell_1.Cell(new Figure_1.Pawn(new Figure_1.Position(i, j), Figure_1.Colors.Black));
                }
                else if (i == 6) {
                    this.board[i][j] = new Cell_1.Cell(new Figure_1.Pawn(new Figure_1.Position(i, j), Figure_1.Colors.White));
                }
                else {
                    this.board[i][j] = new Cell_1.Cell(new Figure_1.NoFigure(new Figure_1.Position(i, j)));
                }
            }
        }
    };
    Board.prototype.getCell = function (pos) {
        return this.board[pos.x][pos.y];
    };
    Board.prototype.isCellFree = function (pos) {
        return this.getCell(pos).figure.type == Figure_1.FigureType.None;
    };
    return Board;
}());
exports.Board = Board;
