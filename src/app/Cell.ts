import { IFigure } from "./Figure";
import { Position } from "./Figure";

export class Cell {
  figure: IFigure;
  position: Position;

  constructor(
    fig: IFigure,
    blackAttack: IFigure[] = new Array<IFigure>(),
    whiteAttack: IFigure[] = new Array<IFigure>()
  ) {
    this.figure = fig;
    this.position = fig.position;
  }
}
