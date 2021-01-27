import { swap } from "../Helper";
import { IFigure, FigureType, Position, Pawn, Colors } from "./Figure";
import { Player } from "./Player";

export interface AvailabilityChecker {
  findCell: (pos: Position) => findResponse;
  moveFigures: (start: Position, end: Position) => void;

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
        return {found:true, player:this.players[1], index:i};
      }
    }
    return {found:false};
  }

  moveFigures(start: Position, end: Position) {
    let response = this.findCell(end);
    if (response.found) {
      // figura zostanie zbita
      // usuwamy ją z listy
      response.player?.actualFigures[response.index].removeYourself();
      swap<IFigure>(response.player?.actualFigures[response.index], response.player?.actualFigures[response.player.actualFigures.length-1]);
      response.player?.actualFigures.pop();
    }
    response = this.findCell(start);
    response.player?.actualFigures[response.index].removeYourself();
    response.player?.actualFigures[response.index].position = end;
    response.player?.actualFigures[response.index].drawYourself();

  }
}
