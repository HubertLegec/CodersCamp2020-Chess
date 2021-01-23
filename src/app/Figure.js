"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pawn = exports.NoFigure = exports.Position = exports.Colors = exports.FigureType = void 0;
var FigureType;
(function (FigureType) {
    FigureType[FigureType["King"] = 0] = "King";
    FigureType[FigureType["Queen"] = 1] = "Queen";
    FigureType[FigureType["Rook"] = 2] = "Rook";
    FigureType[FigureType["Bishops"] = 3] = "Bishops";
    FigureType[FigureType["Knight"] = 4] = "Knight";
    FigureType[FigureType["Pawn"] = 5] = "Pawn";
    FigureType[FigureType["None"] = 6] = "None";
})(FigureType = exports.FigureType || (exports.FigureType = {}));
var Colors;
(function (Colors) {
    Colors[Colors["White"] = 0] = "White";
    Colors[Colors["Black"] = 1] = "Black";
    Colors[Colors["None"] = 2] = "None";
})(Colors = exports.Colors || (exports.Colors = {}));
var Position = /** @class */ (function () {
    function Position(x, y) {
        this.x = x;
        this.y = y;
    }
    return Position;
}());
exports.Position = Position;
var NoFigure = /** @class */ (function () {
    function NoFigure(pos) {
        this.move = function () { };
        this.type = FigureType.None;
        this.position = pos;
        this.isAlive = false;
        this.color = Colors.None;
    }
    NoFigure.prototype.getPossibleMoves = function () {
        return [];
    };
    return NoFigure;
}());
exports.NoFigure = NoFigure;
var Pawn = /** @class */ (function () {
    function Pawn(pos, col) {
        this.type = FigureType.Pawn;
        this.position = pos;
        this.isAlive = true;
        this.color = col;
        this.hasMoved = false;
    }
    Pawn.prototype.getPossibleMoves = function (checker) {
        var answer = new Array();
        var pos;
        if (this.color == Colors.Black) {
            pos = new Position(this.position.x + 1, this.position.y);
            if (checker.isCellFree(pos) && this.position.x < 7) {
                answer.push(pos);
            }
            if (!this.hasMoved) {
                pos = new Position(this.position.x + 2, this.position.y);
                if (checker.isCellFree(pos) && this.position.x < 6) {
                    answer.push(pos);
                }
            }
        }
        else {
            pos = new Position(this.position.x - 1, this.position.y);
            if (checker.isCellFree(pos) && this.position.x > 0) {
                answer.push(pos);
            }
            if (!this.hasMoved) {
                pos = new Position(this.position.x - 2, this.position.y);
                if (checker.isCellFree(pos) && this.position.x > 1) {
                    answer.push(pos);
                }
            }
        }
        return answer;
    };
    Pawn.prototype.move = function (end) {
        this.position = end;
    };
    return Pawn;
}());
exports.Pawn = Pawn;
