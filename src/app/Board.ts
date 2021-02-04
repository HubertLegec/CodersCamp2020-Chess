import { swap } from "../Helper";
import { IFigure, FigureType, Position, Pawn, Colors } from "./Figure";
import { Player } from "./Player";

export interface AvailabilityChecker {
  findCell: (pos: Position) => findResponse;
  moveFigures: (start: Position, end: Position) => void;
  validateMoves: (figPos: Position) => Position[];
}

interface findResponse {
  found: boolean;
  player?: Player;
  index?: number;
}

export class Board implements AvailabilityChecker {
  players: Array<Player>;

  constructor(p1: Player, p2: Player) {
    this.players = new Array<Player>(p1, p2);
  }

  findCell(pos: Position): findResponse {
    for (let i = 0; i < this.players[0].actualFigures.length; i++) {
      const fig = this.players[0].actualFigures[i];
      if (fig.position.x == pos.x && fig.position.y == pos.y) {
        return { found: true, player: this.players[0], index: i };
      }
    }
    for (let i = 0; i < this.players[1].actualFigures.length; i++) {
      const fig = this.players[1].actualFigures[i];
      if (fig.position.x == pos.x && fig.position.y == pos.y) {
        return { found: true, player: this.players[1], index: i };
      }
    }
    return { found: false };
  }

  moveFigures(start: Position, end: Position) {
    let response = this.findCell(end);
    if (response.found) {
      // figura zostanie zbita
      // usuwamy ją z listy
      response.player?.actualFigures[response.index!].removeYourself();
      swap<IFigure>(
        response.player?.actualFigures[response.index!]!,
        response.player?.actualFigures[
          response.player.actualFigures.length - 1
        ]!
      );
      response.player?.actualFigures.pop();
    }
    response = this.findCell(start);
    response.player?.actualFigures[response.index!].removeYourself();
    response.player?.actualFigures[response.index!].move(end);
    response.player?.actualFigures[response.index!].drawYourself();
  }

  validateMoves(figPos: Position): Position[] {
    // chwilowo sprawdzanie zaimplementowane tylko dla pionkow
    const answer: Position[] = new Array<Position>();
    const res = this.findCell(figPos);
    // jezeli figura jest pionkiem
    const fig = res.player?.actualFigures[res.index!];
    let pos: Position;
    switch (fig!.type) {
      case FigureType.Pawn: {
        if (fig!.owner.color == Colors.White) {
          pos = new Position(fig!.position.x + 1, fig!.position.y);
          if (fig!.position.x < 7 && this.findCell(pos).found == false) {
            answer.push(pos);
          }

          pos = new Position(fig!.position.x + 2, fig!.position.y);
          if (!fig!.hasMoved && answer.length == 1) {
            if (fig!.position.x < 6 && this.findCell(pos).found == false) {
              answer.push(pos);
            }
          }
        } else {
          pos = new Position(fig!.position.x - 1, fig!.position.y);
          if (fig!.position.x > 0 && this.findCell(pos).found == false) {
            answer.push(pos);
          }

          if (!fig!.hasMoved && answer.length == 1) {
            pos = new Position(fig!.position.x - 2, fig!.position.y);
            if (fig!.position.x > 1 && this.findCell(pos).found == false) {
              answer.push(pos);
            }
          }
        }
        return answer;
      }
      case FigureType.Rook: {
        pos = new Position(fig!.position.x + 1, fig!.position.y);

        // ruchy do przodu
        while (pos.x < 8 && !this.findCell(pos).found) {
          answer.push(pos);
          pos = new Position(pos.x + 1, pos.y);
        }

        pos = new Position(fig!.position.x - 1, fig!.position.y);
        // ruchy do tyłu
        while (pos.x >= 0 && !this.findCell(pos).found) {
          answer.push(pos);
          pos = new Position(pos.x - 1, pos.y);
        }

        pos = new Position(fig!.position.x, fig!.position.y - 1);
        //ruchy w lewo
        while (pos.y >= 0 && !this.findCell(pos).found) {
          answer.push(pos);
          pos = new Position(pos.x, pos.y - 1);
        }

        pos = new Position(fig!.position.x, fig!.position.y + 1);
        // ruchy w prawo
        while (pos.y < 8 && !this.findCell(pos).found) {
          answer.push(pos);
          pos = new Position(pos.x, pos.y + 1);
        }
        return answer;
      }
      case FigureType.Bishop: {
        pos = new Position(fig!.position.x + 1, fig!.position.y + 1);

        // w prawy dolny
        while (pos.x < 8 && pos.y < 8 && !this.findCell(pos).found) {
          answer.push(pos);
          pos = new Position(pos.x + 1, pos.y + 1);
        }

        pos = new Position(fig!.position.x + 1, fig!.position.y - 1);
        // lewy dolny
        while (pos.x < 8 && pos.y >= 0 && !this.findCell(pos).found) {
          answer.push(pos);
          pos = new Position(pos.x + 1, pos.y - 1);
        }

        pos = new Position(fig!.position.x - 1, fig!.position.y - 1);
        // lewy gorny
        while (pos.x >= 0 && pos.y >= 0 && !this.findCell(pos).found) {
          answer.push(pos);
          pos = new Position(pos.x - 1, pos.y - 1);
        }

        pos = new Position(fig!.position.x - 1, fig!.position.y + 1);
        // prawy gorny
        while (pos.x >= 0 && pos.y < 8 && !this.findCell(pos).found) {
          console.log(pos);
          answer.push(pos);
          pos = new Position(pos.x - 1, pos.y + 1);
        }
        return answer;
      }
      case FigureType.Knight: {
        answer.push(new Position(fig!.position.x + 2, fig!.position.y + 1));
        answer.push(new Position(fig!.position.x + 2, fig!.position.y - 1));
        answer.push(new Position(fig!.position.x - 2, fig!.position.y + 1));
        answer.push(new Position(fig!.position.x - 2, fig!.position.y - 1));
        answer.push(new Position(fig!.position.x + 1, fig!.position.y + 2));
        answer.push(new Position(fig!.position.x + 1, fig!.position.y - 2));
        answer.push(new Position(fig!.position.x - 1, fig!.position.y + 2));
        answer.push(new Position(fig!.position.x - 1, fig!.position.y - 2));

        return answer.filter((f) => {
          return f.x >= 0 && f.x < 8 && f.y >= 0 && f.y < 8 && !this.findCell(f).found;
        });
      }
    }
  }
}
