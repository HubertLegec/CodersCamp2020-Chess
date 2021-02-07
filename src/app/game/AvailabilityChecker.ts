import { Position } from './Position';
import { Player } from './Player';

export interface AvailabilityChecker {
    findCell: (pos: Position) => FindResponse;
    moveFigures: (start: Position, end: Position) => void;
    validateMoves: (figPos: Position) => Position[];
}
  
export interface FindResponse {
    found: boolean;
    player?: Player;
    index?: number;
}