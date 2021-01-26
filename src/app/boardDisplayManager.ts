export class boardDisplayManager {
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
        let chessBoardWindow: HTMLDivElement = document.createElement('div');
        chessBoardWindow.setAttribute('id', 'chessBoard')
        document.getElementById(this.containerId).appendChild(chessBoardWindow)
    }
    createOpponentFile(): void {
        let opponentFile: HTMLDivElement = document.createElement('div');
        opponentFile.setAttribute('id', 'opponentFile')
        let cornerLU: HTMLDivElement = document.createElement('div');
        let cornerRU: HTMLDivElement = document.createElement('div');
        cornerLU.setAttribute('class', 'corner');
        cornerRU.setAttribute('class', 'corner');
        opponentFile.appendChild(cornerLU);
        let letterASCII: number = 65;
        for (let i: number = 0; i < 8; i++) {
            let fileBox: HTMLDivElement = document.createElement('div');
            fileBox.setAttribute('class', 'file rotate');
            fileBox.textContent = String.fromCharCode(letterASCII);
            opponentFile.appendChild(fileBox);
            letterASCII++;
        }
        opponentFile.appendChild(cornerRU);
        document.getElementById('chessBoard').appendChild(opponentFile)
    }
    createMyRank(): void {
        let myRank: HTMLDivElement = document.createElement('div');
        myRank.setAttribute('id', 'myRank');
        for (let i: number = 8; i > 0; i--) {
            let rankBox: HTMLDivElement = document.createElement('div');
            rankBox.setAttribute('class', 'rank');
            rankBox.textContent = i.toString();
            myRank.appendChild(rankBox)
        }
        document.getElementById('chessBoard').appendChild(myRank)
    }
    createBoard(): void {
        let board: HTMLDivElement = document.createElement('div');
        board.setAttribute('id', 'board');
        for (let i: number = 0; i < 64; i++) {
            let boardBox: HTMLDivElement = document.createElement('div');
            boardBox.setAttribute('class', 'box');
            board.appendChild(boardBox);
        }
        document.getElementById('chessBoard').appendChild(board);
    }
    createOpponentRank(): void {
        let opponentRank: HTMLDivElement = document.createElement('div');
        opponentRank.setAttribute('id', 'opponentRank');
        for (let i: number = 8; i > 0; i--) {
            let rankBox: HTMLDivElement = document.createElement('div');
            rankBox.setAttribute('class', 'rank rotate');
            rankBox.textContent = i.toString();
            opponentRank.appendChild(rankBox)
        }
        document.getElementById('chessBoard').appendChild(opponentRank)
    }
    createMyFile(): void {
        let myFile: HTMLDivElement = document.createElement('div');
        myFile.setAttribute('id', 'myFile')
        let cornerLD: HTMLDivElement = document.createElement('div');
        let cornerRD: HTMLDivElement = document.createElement('div');
        cornerLD.setAttribute('class', 'corner');
        cornerRD.setAttribute('class', 'corner');
        myFile.appendChild(cornerLD);
        let letterASCII: number = 65;
        for (let i: number = 0; i < 8; i++) {
            let fileBox: HTMLDivElement = document.createElement('div');
            fileBox.setAttribute('class', 'file');
            fileBox.textContent = String.fromCharCode(letterASCII);
            myFile.appendChild(fileBox);
            letterASCII++;
        }
        myFile.appendChild(cornerRD);
        document.getElementById('chessBoard').appendChild(myFile)
    }

}