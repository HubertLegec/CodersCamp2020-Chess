import {
  AvailabilityChecker,
  FindResponse,
  PossibleMove,
} from "../AvailabilityChecker";
import { Piece } from "./Piece";

export class Bishop extends Piece {
  getPossibleMoves(checker: AvailabilityChecker): PossibleMove[] {
    const answer: PossibleMove[] = new Array<PossibleMove>();
    let opp: FindResponse;
    let pos: PossibleMove;

    pos = new PossibleMove(this!.position.x + 1, this!.position.y + 1);

    // w prawy dolny
    while (pos.x < 8 && pos.y < 8 && !checker.findCell(pos).found) {
      answer.push(pos);
      pos = new PossibleMove(pos.x + 1, pos.y + 1);
    }

    opp = checker.findCell(pos);
    if (
      opp.found &&
      pos.x < 8 &&
      pos.y < 8 &&
      opp.piece?.owner != this.owner
    ) {
      answer.push(new PossibleMove(pos.x, pos.y, true));
    }

    pos = new PossibleMove(this.position.x + 1, this.position.y - 1);
    // lewy dolny
    while (pos.x < 8 && pos.y >= 0 && !checker.findCell(pos).found) {
      answer.push(pos);
      pos = new PossibleMove(pos.x + 1, pos.y - 1);
    }

    opp = checker.findCell(pos);
    if (
      opp.found &&
      pos.x < 8 &&
      pos.y >= 0 &&
      opp.piece!.owner != this.owner
    ) {
      answer.push(new PossibleMove(pos.x, pos.y, true));
    }

    pos = new PossibleMove(this.position.x - 1, this.position.y - 1);
    // lewy gorny
    while (pos.x >= 0 && pos.y >= 0 && !checker.findCell(pos).found) {
      answer.push(pos);
      pos = new PossibleMove(pos.x - 1, pos.y - 1);
    }

    opp = checker.findCell(pos);
    if (
      opp.found &&
      pos.x >= 0 &&
      pos.y >= 0 &&
      opp.piece?.owner != this.owner
    ) {
      answer.push(new PossibleMove(pos.x, pos.y, true));
    }

    pos = new PossibleMove(this.position.x - 1, this.position.y + 1);
    // prawy gorny
    while (pos.x >= 0 && pos.y < 8 && !checker.findCell(pos).found) {
      console.log(pos);
      answer.push(pos);
      pos = new PossibleMove(pos.x - 1, pos.y + 1);
    }

    opp = checker.findCell(pos);
    if (
      opp.found &&
      pos.x >= 0 &&
      pos.y < 8 &&
      opp.piece!.owner != this.owner
    ) {
      answer.push(new PossibleMove(pos.x, pos.y, true));
    }

    return answer;
  }
}
