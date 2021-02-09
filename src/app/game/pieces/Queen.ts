import {
  AvailabilityChecker,
  PossibleMove,
  FindResponse,
} from "../AvailabilityChecker";
import { Piece } from "./Piece";

export class Queen extends Piece {
  getPossibleMoves(checker: AvailabilityChecker): PossibleMove[] {
    let opp: FindResponse;
    let pos: PossibleMove = new PossibleMove(
      this.position.x + 1,
      this.position.y + 1
    );
    const answer: PossibleMove[] = new Array<PossibleMove>();

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
      opp.piece!.owner != this.owner
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
      opp.piece?.owner != this.owner
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
      opp.piece?.owner != this.owner
    ) {
      answer.push(new PossibleMove(pos.x, pos.y, true));
    }

    pos = new PossibleMove(this.position.x + 1, this.position.y);

    // ruchy do przodu
    while (pos.x < 8 && !checker.findCell(pos).found) {
      answer.push(pos);
      pos = new PossibleMove(pos.x + 1, pos.y);
    }

    opp = checker.findCell(pos);
    if (opp.found && pos.x < 8 && opp.piece?.owner != this.owner) {
      answer.push(new PossibleMove(pos.x, pos.y, true));
    }

    pos = new PossibleMove(this.position.x - 1, this.position.y);
    // ruchy do tyłu
    while (pos.x >= 0 && !checker.findCell(pos).found) {
      answer.push(pos);
      pos = new PossibleMove(pos.x - 1, pos.y);
    }

    opp = checker.findCell(pos);
    if (opp.found && pos.x >= 0 && opp.piece?.owner != this.owner) {
      answer.push(new PossibleMove(pos.x, pos.y, true));
    }

    pos = new PossibleMove(this.position.x, this.position.y - 1);
    //ruchy w lewo
    while (pos.y >= 0 && !checker.findCell(pos).found) {
      answer.push(pos);
      pos = new PossibleMove(pos.x, pos.y - 1);
    }

    opp = checker.findCell(pos);
    if (opp.found && pos.y >= 0 && opp.piece?.owner != this.owner) {
      answer.push(new PossibleMove(pos.x, pos.y, true));
    }

    pos = new PossibleMove(this.position.x, this.position.y + 1);
    // ruchy w prawo
    while (pos.y < 8 && !checker.findCell(pos).found) {
      answer.push(pos);
      pos = new PossibleMove(pos.x, pos.y + 1);
    }

    opp = checker.findCell(pos);
    if (opp.found && pos.y < 8 && opp.piece?.owner != this.owner) {
      answer.push(new PossibleMove(pos.x, pos.y, true));
    }

    return answer;
  }
}
