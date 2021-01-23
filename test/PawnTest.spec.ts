import { Board } from "../src/app/Board.js";
import { Position } from "../src/app/Figure.js";

describe("Testing figure move", () => {
  let board = new Board();
  beforeEach(() => {
    board = new Board();
  });

  test("it tests black pawn moves", () => {
    let pawnResponse = board.board[1][1].figure.getPossibleMoves(board);
    
    let properResponse = new Array<Position>(
      new Position(2, 1),
      new Position(3, 1)
    );

    expect(pawnResponse).toEqual(properResponse);
  });

  test("test black pawn moves", () => {
    let pawnResponse = board.board[1][6].figure.getPossibleMoves(board);
    let properResponse = new Array<Position>(
      new Position(2, 6),
      new Position(3, 6)
    );
  })
  test("test white pawn moves", () => {
    let pawnResponse = board.board[6][6].figure.getPossibleMoves(board);
    let properResponse = new Array<Position>(
      new Position(5, 6),
      new Position(4, 6)
    );

  expect(pawnResponse).toEqual(properResponse);});

  test("test if pawn moves", ()=>{
    board.board[1][4].figure.move(new Position(2,4));
    expect(board.board[1][4].figure.position).toEqual(new Position(2,4));
  })

});
