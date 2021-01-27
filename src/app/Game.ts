import { Move } from "./Move";
import { Player } from "./Player";
import { Colors, IFigure, Position } from "./Figure";
import { StartData } from "./Data";
import { AvailabilityChecker, Board } from "./Board";
import { BoardDisplay } from "./DOM/BoardDisplay";

interface IGame {
  movehistory: Move[];

  startGame: () => void;
}

export class Game implements IGame {
  movehistory: Move[];
  activePlayer: Player;
  players: Player[];
  board: AvailabilityChecker;
  clickedPosition: Position;
  possiblePositions: Position[];

  constructor(data: StartData) {
    this.movehistory = new Array<Move>();
    this.players = new Array<Player>(2);
    this.players[0] = new Player(data.firstName, data.time, Colors.White);
    this.players[1] = new Player(data.secondName, data.time, Colors.Black);
    this.activePlayer = this.players[0];
    this.board = new Board(this.players[0], this.players[1]);
    this.clickedPosition = new Position(-1, -1);
    this.possiblePositions = [];
  }

  startGame() {
    // TODO wyrenderowac nowy ekran
    // wystartować czas
    const view = new BoardDisplay("chess-app");
    view.createChessBoard();
    // wywołać na każdej figurze wyrysowanie się i podpięcie onclicka

    this.players[0].actualFigures.forEach((f) => {
      f.drawYourself();
      f.setOnClick((me: IFigure) => {
        this.handleClick(me.position);
      });
    });
    this.players[1].actualFigures.forEach((f) => {
      f.drawYourself();
      f.setOnClick((me: IFigure) => {
        this.handleClick(me.position);
      });
    });
  }

  waitForPlayerMove() {}

  handleClick(newClick: Position) {
    // sprawdza czy jest to drugie klikniecie w ruchu
    if (this.clickedPosition.x !== -1 && this.clickedPosition.y !== -1) {console.log(newClick);
      for (let i = 0; i < this.possiblePositions.length; i++) {
        const poss = this.possiblePositions[i];
        // kliknieta opcja zawiera sie w puli mozliwych ruchow
        if (poss.x == newClick.x && poss.y == newClick.y) {
          this.board.moveFigures(this.clickedPosition, newClick);
          
          const res = this.board.findCell(newClick);
          res.player?.actualFigures[res.index as number].setOnClick((me: IFigure) => {
            this.handleClick(me.position);
          });
        }
      }
      this.clickedPosition = new Position(-1, -1);
    } else {
      this.clickedPosition = newClick;
      const res = this.board.findCell(newClick);
      const moves = res.player?.actualFigures[
        res.index as number
      ].getPossibleMoves();
      this.possiblePositions = moves as Position[];
      console.log(this.possiblePositions);
      this.possiblePositions.forEach((p) => {
        const el = document.getElementById(`${p.x * 8 + p.y}`);
        el?.addEventListener(
          "click",
          () => {
            this.handleClick(p);
          },
          { once: true }
        );
      });
    }
  }
}
