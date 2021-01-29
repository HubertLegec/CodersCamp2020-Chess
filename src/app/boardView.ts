export class BoardView {
    private containerId: string;

    constructor(containerId: string) {
        this.containerId = containerId;
    }

    createChessBoard(): void {
        this.createChessBoardWindow();
        this.createOpponentFile();
        this.createMyRank();
        this.createBoard();
        this.createOpponentRank();
        this.createMyFile();
    }
    createChessBoardWindow(): void {
        const chessBoardWindow: HTMLDivElement = document.createElement('div');
        chessBoardWindow.setAttribute('id', 'chessBoard')
        document.getElementById(this.containerId).appendChild(chessBoardWindow)
    }
    createOpponentFile(): void {
        const opponentFile: HTMLDivElement = document.createElement('div');
        opponentFile.setAttribute('id', 'opponentFile')
        const cornerLU: HTMLDivElement = document.createElement('div');
        const cornerRU: HTMLDivElement = document.createElement('div');
        cornerLU.setAttribute('class', 'corner');
        cornerRU.setAttribute('class', 'corner');
        opponentFile.appendChild(cornerLU);
        ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
            .map(l => {
                const fileBox: HTMLDivElement = document.createElement('div');
                fileBox.setAttribute('class', 'file');
                fileBox.textContent = l;
                return fileBox;
            })
            .forEach(f => opponentFile.appendChild(f));
        opponentFile.appendChild(cornerRU);
        document.getElementById('chessBoard').appendChild(opponentFile)
    }
    createMyRank(): void {
        const myRank: HTMLDivElement = document.createElement('div');
        myRank.setAttribute('id', 'myRank');
        for (let i: number = 8; i > 0; i--) {
            const rankBox: HTMLDivElement = document.createElement('div');
            rankBox.setAttribute('class', 'rank');
            rankBox.textContent = i.toString();
            myRank.appendChild(rankBox)
        }
        document.getElementById('chessBoard').appendChild(myRank)
    }
    createBoard(): void {
        const board: HTMLDivElement = document.createElement('div');
        board.setAttribute('id', 'board');
        for (let i: number = 0; i < 64; i++) {
            const boardBox: HTMLDivElement = document.createElement('div');
            boardBox.setAttribute('class', 'box');
            boardBox.setAttribute('dataset', 'square')
            board.appendChild(boardBox);
        }
        document.getElementById('chessBoard').appendChild(board);
    }
    createOpponentRank(): void {
        const opponentRank: HTMLDivElement = document.createElement('div');
        opponentRank.setAttribute('id', 'opponentRank');
        for (let i: number = 8; i > 0; i--) {
            const rankBox: HTMLDivElement = document.createElement('div');
            rankBox.setAttribute('class', 'rank');
            rankBox.textContent = i.toString();
            opponentRank.appendChild(rankBox)
        }
        document.getElementById('chessBoard').appendChild(opponentRank)
    }
    createMyFile(): void {
        const myFile: HTMLDivElement = document.createElement('div');
        myFile.setAttribute('id', 'myFile')
        const cornerLD: HTMLDivElement = document.createElement('div');
        const cornerRD: HTMLDivElement = document.createElement('div');
        cornerLD.setAttribute('class', 'corner');
        cornerRD.setAttribute('class', 'corner');
        myFile.appendChild(cornerLD);
        ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H']
            .map(l => {
                const fileBox: HTMLDivElement = document.createElement('div');
                fileBox.setAttribute('class', 'file');
                fileBox.textContent = l;
                return fileBox;
            })
            .forEach(f => myFile.appendChild(f));
        myFile.appendChild(cornerRD);
        document.getElementById('chessBoard').appendChild(myFile)
    }

}