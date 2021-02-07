import { swap } from './Helper';
import { AvailabilityChecker, FindResponse, PossibleMove } from './AvailabilityChecker';
import { Piece } from './pieces/Piece'
import { Player } from './Player';
import { PieceType } from './pieces/PieceType';
import { Colors } from './Colors';
import { Position } from './Position';

export class Board implements AvailabilityChecker {
  players: Array<Player>;

  constructor(p1: Player, p2: Player) {
    this.players = new Array<Player>(p1, p2);
  }

  findCell(pos: Position): FindResponse {
    for (let i = 0; i < this.players[0].actualFigures.length; i++) {
      const fig = this.players[0].actualFigures[i];
      if (fig.position.x == pos.x && fig.position.y == pos.y) {
        return { found: true, figure:fig};
      }
    }
    for (let i = 0; i < this.players[1].actualFigures.length; i++) {
      const fig = this.players[1].actualFigures[i];
      if (fig.position.x == pos.x && fig.position.y == pos.y) {
        return { found: true, figure: fig};
      }
    }
    return { found: false };
  }

  moveFigures(start: Position, end: Position) {
    let response = this.findCell(end);
    if (response.found) {
      // figura zostanie zbita
      // usuwamy ją z listy
      response.figure!.removeYourself();

      response.figure!.kill();
    }
    response = this.findCell(start);
    response.figure!.removeYourself();
    response.figure!.move(end);
    response.figure!.drawYourself();
  }

  validateMoves(figPos: Position): PossibleMove[] {
    // chwilowo sprawdzanie zaimplementowane tylko dla pionkow
    const answer: PossibleMove[] = new Array<PossibleMove>();
    const res = this.findCell(figPos);
    // jezeli figura jest pionkiem
    const fig = res.figure!;
    let pos: PossibleMove;
    let opp: FindResponse;
    switch (fig!.type) {
      case PieceType.Pawn: {
        if (fig!.owner.color == Colors.White) {
          // standardowe ruchy
          pos = new PossibleMove(fig!.position.x + 1, fig!.position.y);
          if (fig!.position.x < 7 && this.findCell(pos).found == false) {
            answer.push(pos);
          }

          pos = new PossibleMove(fig!.position.x + 2, fig!.position.y);
          if (!fig!.hasMoved && answer.length == 1) {
            if (fig!.position.x < 6 && this.findCell(pos).found == false) {
              answer.push(pos);
            }
          }

          // możliwe zbicia
          pos = new PossibleMove(fig!.position.x+1, fig!.position.y-1, true);
          opp = this.findCell(pos);
          if (opp.found && opp.figure!.owner != fig.owner){
            answer.push(pos);
          }

          pos = new PossibleMove(fig!.position.x+1, fig!.position.y+1, true);
          opp = this.findCell(pos);
          if (opp.found && opp.figure!.owner != fig.owner){
            answer.push(pos);
          }
        } else {
          // standardowe ruchy
          pos = new PossibleMove(fig!.position.x - 1, fig!.position.y);
          if (fig!.position.x > 0 && this.findCell(pos).found == false) {
            answer.push(pos);
          }

          if (!fig!.hasMoved && answer.length == 1) {
            pos = new PossibleMove(fig!.position.x - 2, fig!.position.y);
            if (fig!.position.x > 1 && this.findCell(pos).found == false) {
              answer.push(pos);
            }
          }

          // możliwe zbicia

          pos = new PossibleMove(fig!.position.x-1, fig!.position.y-1, true);
          opp = this.findCell(pos);
          if (opp.found && opp.figure!.owner != fig.owner){
            answer.push(pos);
          }

          pos = new PossibleMove(fig!.position.x-1, fig!.position.y+1, true);
          opp = this.findCell(pos);
          if (opp.found && opp.figure!.owner != fig.owner){
            answer.push(pos);
          }
        }
        return answer;
      }
      case PieceType.Rook: {
        pos = new PossibleMove(fig!.position.x + 1, fig!.position.y);

        // ruchy do przodu
        while (pos.x < 8 && !this.findCell(pos).found) {
          answer.push(pos);
          pos = new PossibleMove(pos.x + 1, pos.y);
        }

        pos = new PossibleMove(fig!.position.x - 1, fig!.position.y);
        // ruchy do tyłu
        while (pos.x >= 0 && !this.findCell(pos).found) {
          answer.push(pos);
          pos = new PossibleMove(pos.x - 1, pos.y);
        }

        pos = new PossibleMove(fig!.position.x, fig!.position.y - 1);
        //ruchy w lewo
        while (pos.y >= 0 && !this.findCell(pos).found) {
          answer.push(pos);
          pos = new PossibleMove(pos.x, pos.y - 1);
        }

        pos = new PossibleMove(fig!.position.x, fig!.position.y + 1);
        // ruchy w prawo
        while (pos.y < 8 && !this.findCell(pos).found) {
          answer.push(pos);
          pos = new PossibleMove(pos.x, pos.y + 1);
        }
        return answer;
      }
      case PieceType.Bishop: {
        pos = new PossibleMove(fig!.position.x + 1, fig!.position.y + 1);

        // w prawy dolny
        while (pos.x < 8 && pos.y < 8 && !this.findCell(pos).found) {
          answer.push(pos);
          pos = new PossibleMove(pos.x + 1, pos.y + 1);
        }

        pos = new PossibleMove(fig!.position.x + 1, fig!.position.y - 1);
        // lewy dolny
        while (pos.x < 8 && pos.y >= 0 && !this.findCell(pos).found) {
          answer.push(pos);
          pos = new PossibleMove(pos.x + 1, pos.y - 1);
        }

        pos = new PossibleMove(fig!.position.x - 1, fig!.position.y - 1);
        // lewy gorny
        while (pos.x >= 0 && pos.y >= 0 && !this.findCell(pos).found) {
          answer.push(pos);
          pos = new PossibleMove(pos.x - 1, pos.y - 1);
        }

        pos = new PossibleMove(fig!.position.x - 1, fig!.position.y + 1);
        // prawy gorny
        while (pos.x >= 0 && pos.y < 8 && !this.findCell(pos).found) {
          console.log(pos);
          answer.push(pos);
          pos = new PossibleMove(pos.x - 1, pos.y + 1);
        }
        return answer;
      }
      case PieceType.Knight: {
        answer.push(new PossibleMove(fig!.position.x + 2, fig!.position.y + 1));
        answer.push(new PossibleMove(fig!.position.x + 2, fig!.position.y - 1));
        answer.push(new PossibleMove(fig!.position.x - 2, fig!.position.y + 1));
        answer.push(new PossibleMove(fig!.position.x - 2, fig!.position.y - 1));
        answer.push(new PossibleMove(fig!.position.x + 1, fig!.position.y + 2));
        answer.push(new PossibleMove(fig!.position.x + 1, fig!.position.y - 2));
        answer.push(new PossibleMove(fig!.position.x - 1, fig!.position.y + 2));
        answer.push(new PossibleMove(fig!.position.x - 1, fig!.position.y - 2));

        return answer.filter((f) => {
          return f.x >= 0 && f.x < 8 && f.y >= 0 && f.y < 8 && !this.findCell(f).found;
        });
      }
      case PieceType.Queen:{
        pos = new PossibleMove(fig!.position.x + 1, fig!.position.y + 1);

        // w prawy dolny
        while (pos.x < 8 && pos.y < 8 && !this.findCell(pos).found) {
          answer.push(pos);
          pos = new PossibleMove(pos.x + 1, pos.y + 1);
        }

        pos = new PossibleMove(fig!.position.x + 1, fig!.position.y - 1);
        // lewy dolny
        while (pos.x < 8 && pos.y >= 0 && !this.findCell(pos).found) {
          answer.push(pos);
          pos = new PossibleMove(pos.x + 1, pos.y - 1);
        }

        pos = new PossibleMove(fig!.position.x - 1, fig!.position.y - 1);
        // lewy gorny
        while (pos.x >= 0 && pos.y >= 0 && !this.findCell(pos).found) {
          answer.push(pos);
          pos = new PossibleMove(pos.x - 1, pos.y - 1);
        }

        pos = new PossibleMove(fig!.position.x - 1, fig!.position.y + 1);
        // prawy gorny
        while (pos.x >= 0 && pos.y < 8 && !this.findCell(pos).found) {
          console.log(pos);
          answer.push(pos);
          pos = new PossibleMove(pos.x - 1, pos.y + 1);
        }

        pos = new PossibleMove(fig!.position.x + 1, fig!.position.y);

        // ruchy do przodu
        while (pos.x < 8 && !this.findCell(pos).found) {
          answer.push(pos);
          pos = new PossibleMove(pos.x + 1, pos.y);
        }

        pos = new PossibleMove(fig!.position.x - 1, fig!.position.y);
        // ruchy do tyłu
        while (pos.x >= 0 && !this.findCell(pos).found) {
          answer.push(pos);
          pos = new PossibleMove(pos.x - 1, pos.y);
        }

        pos = new PossibleMove(fig!.position.x, fig!.position.y - 1);
        //ruchy w lewo
        while (pos.y >= 0 && !this.findCell(pos).found) {
          answer.push(pos);
          pos = new PossibleMove(pos.x, pos.y - 1);
        }

        pos = new PossibleMove(fig!.position.x, fig!.position.y + 1);
        // ruchy w prawo
        while (pos.y < 8 && !this.findCell(pos).found) {
          answer.push(pos);
          pos = new PossibleMove(pos.x, pos.y + 1);
        }
        return answer;
      }
    
    }
    return [];
  }
}
