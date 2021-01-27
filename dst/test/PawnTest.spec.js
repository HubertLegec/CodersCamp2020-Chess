"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Board_1 = require("../src/app/Board");
var Figure_1 = require("../src/app/Figure");
describe("Testing figure move", function () {
    var board = new Board_1.Board();
    beforeEach(function () {
        board = new Board_1.Board();
    });
    test("it tests black pawn moves", function () {
        var pawnResponse = board.board[1][1].figure.getPossibleMoves(board);
        var properResponse = new Array(new Figure_1.Position(2, 1), new Figure_1.Position(3, 1));
        expect(pawnResponse).toEqual(properResponse);
    });
    test("test black pawn moves", function () {
        var pawnResponse = board.board[1][6].figure.getPossibleMoves(board);
        var properResponse = new Array(new Figure_1.Position(2, 6), new Figure_1.Position(3, 6));
    });
    test("test white pawn moves", function () {
        var pawnResponse = board.board[6][6].figure.getPossibleMoves(board);
        var properResponse = new Array(new Figure_1.Position(5, 6), new Figure_1.Position(4, 6));
        expect(pawnResponse).toEqual(properResponse);
    });
    test("test if pawn moves", function () {
        board.board[1][4].figure.move(new Figure_1.Position(2, 4));
        expect(board.board[1][4].figure.position).toEqual(new Figure_1.Position(2, 4));
    });
});
