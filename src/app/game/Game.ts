import { Player } from './Player';
import { Piece } from './pieces/Piece';
import { StartData } from './Data';
import { Board } from './Board';
import { AvailabilityChecker, PossibleMove } from './AvailabilityChecker';
import { Colors } from './Colors';
import { Position } from './Position';

interface IGame {
  startGame: () => void;
}

export class Game implements IGame {
  activePlayer: Player;
  players: Player[];
  board: AvailabilityChecker;
  clickedPosition: Position;
  possiblePositions: PossibleMove[];

  constructor(data: StartData) {
    this.players = new Array<Player>(2);
    this.players[0] = new Player(data.firstName, data.time, Colors.White);
    this.players[1] = new Player(data.secondName, data.time, Colors.Black);
    this.activePlayer = this.players[0];
    this.board = new Board(this.players[0], this.players[1]);
    this.clickedPosition = new Position(-1, -1);
    this.possiblePositions = [];
  }

  startGame() {

    // wywoluje na każdej figurze wyrysowanie się i podpina onclicka
    this.players[0].actualFigures.forEach((f) => {
      f.drawYourself();
      f.setOnClick((me: Piece) => {
        this.handleClick(me.position);
      });
    });
    this.players[1].actualFigures.forEach((f) => {
      f.drawYourself();
    });
  }

  handleClick(newClick: Position) {
    // sprawdza czy jest to drugie klikniecie w ruchu
    if (this.clickedPosition.x != -1 && this.clickedPosition.y != -1) { // drugie
      console.log(`${newClick.x} a stary ${this.clickedPosition.x}`);
      let miss = true;
      for (let i = 0; i < this.possiblePositions.length; i++) {
        const poss = this.possiblePositions[i];
        // kliknieta opcja zawiera sie w puli mozliwych ruchow
        if (poss.x == newClick.x && poss.y == newClick.y) {
          miss = false;
          this.board.moveFigures(this.clickedPosition, newClick);
          
          // usuwa onClick z opcji danej figury
          this.possiblePositions.push(new PossibleMove(this.clickedPosition.x, this.clickedPosition.y));
          this.possiblePositions.forEach(p => {
            const el = document.getElementById(`${p.x * 8 + p.y}`);
            el?.classList.remove(p.attack == false ? 'active' : 'attacked');
            el?.replaceWith(el.cloneNode(true));
          })
          // usuwa onClicki z figur obecnego gracza
          this.activePlayer.actualFigures.forEach(p => {
            const el = document.getElementById(`${p.position.x * 8 + p.position.y}`);
            el?.replaceWith(el.cloneNode(true));
          })

          // const res = this.board.findCell(newClick);console.log(res);
          // res.player?.actualFigures[res.index!].setOnClick(
          //   (me: IFigure) => {
          //     this.handleClick(me.position);
          //   }
          // );
          if (this.activePlayer == this.players[0]){
            this.activePlayer = this.players[1];
          }else{
            this.activePlayer = this.players[0];
          }

          this.activePlayer.actualFigures.forEach(p => {
            if (!p.isAlive){
              return;
            }
            p.setOnClick(
              (me: Piece) => {
                this.handleClick(me.position);
              }
            );
          })
          break;
        }
      }
      if (miss){console.log("miss");
        // usuwa onClick z opcji danej figury
        this.possiblePositions.forEach(p => {
          const el = document.getElementById(`${p.x * 8 + p.y}`);
          el?.classList.remove(p.attack == false ? 'active' : 'attacked');
          el?.replaceWith(el.cloneNode(true));
        })
      }
      this.clickedPosition = new Position(-1, -1);
    } else { // pierwsze    
      const res = this.board.findCell(newClick);
      console.log(`pierwsze kliknięcie ${newClick.x}`);
      if (res.figure!.owner != this.activePlayer){console.log("nie ten gracz")
        return;
      }
      this.clickedPosition = newClick;
      const moves:PossibleMove[] = this.board.validateMoves(newClick);
      this.possiblePositions = moves!;
      console.log(this.possiblePositions);
      this.possiblePositions.forEach((p) => {console.log("good")
        const el = document.getElementById(`${p.x * 8 + p.y}`);
        el?.classList.add(p.attack == false ? 'active':'attacked');
        el?.addEventListener("click", () => {
          this.handleClick(p);
        });
      });
    }
  }
}
