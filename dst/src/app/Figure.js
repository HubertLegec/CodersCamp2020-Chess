"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pawn = exports.NoFigure = exports.Position = exports.Colors = exports.FigureType = void 0;
var FigureType;
(function (FigureType) {
    FigureType[FigureType["None"] = 0] = "None";
    FigureType[FigureType["Pawn"] = 1] = "Pawn";
    FigureType[FigureType["Knight"] = 2] = "Knight";
    FigureType[FigureType["Bishop"] = 3] = "Bishop";
    FigureType[FigureType["Rook"] = 4] = "Rook";
    FigureType[FigureType["Queen"] = 5] = "Queen";
    FigureType[FigureType["King"] = 6] = "King";
})(FigureType = exports.FigureType || (exports.FigureType = {}));
var Colors;
(function (Colors) {
    Colors[Colors["None"] = 0] = "None";
    Colors[Colors["White"] = 1] = "White";
    Colors[Colors["Black"] = 2] = "Black";
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
