import {Player} from './Player';
import {Board} from './Board';

export class Game { 
    players: Player[] =[]; 
    board!: Board; 
    currentTurn!: Player; 
    //  GameStatus status; 
    movesPlayed: number[]=[]; 
  
    private initialize(firstName: string, secondName: string, timeLimit:number) :void{ 
        this.players[0] = new Player(firstName, timeLimit, true); 
        this.players[1] = new Player(secondName, timeLimit, false); 
        this.board.initializeBoard();
    }

} 