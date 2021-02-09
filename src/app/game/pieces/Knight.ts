import {
  AvailabilityChecker,
  FindResponse,
  PossibleMove,
} from "../AvailabilityChecker";
import { Piece } from "./Piece";

class Knight extends Piece {
  getPossibleMoves(checker: AvailabilityChecker): PossibleMove[] {
    const answer: PossibleMove[] = new Array<PossibleMove>();
    let opp: FindResponse;
    let pos: PossibleMove;

    answer.push(new PossibleMove(this.position.x + 2, this.position.y + 1));
    answer.push(new PossibleMove(this.position.x + 2, this.position.y - 1));
    answer.push(new PossibleMove(this.position.x - 2, this.position.y + 1));
    answer.push(new PossibleMove(this.position.x - 2, this.position.y - 1));
    answer.push(new PossibleMove(this.position.x + 1, this.position.y + 2));
    answer.push(new PossibleMove(this.position.x + 1, this.position.y - 2));
    answer.push(new PossibleMove(this.position.x - 1, this.position.y + 2));
    answer.push(new PossibleMove(this.position.x - 1, this.position.y - 2));

    let helper = answer.filter((f) => {
      if (f.x >= 0 && f.x < 8 && f.y >= 0 && f.y < 8) {
        if (checker.findCell(f).found) {
          return checker.findCell(f).piece!.owner != this.owner;
        } else {
          return true;
        }
      }
    });

    return helper.map((f) => {
      return checker.findCell(f).found ? new PossibleMove(f.x, f.y, true) : f;
    });
  }
}
