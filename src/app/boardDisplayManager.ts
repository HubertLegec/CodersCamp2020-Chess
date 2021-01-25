export class boardDisplayManager {
    private containerId: string;

    constructor(containerId: string) {
        this.containerId = containerId;
    }

    createChessBoard(): void{
        this.createChessBoardWindow()
    }
    createChessBoardWindow(): void{
        let chessBoardWindow: HTMLDivElement = document.createElement('div');
        chessBoardWindow.setAttribute('id', 'chessBoard')
        document.getElementById(this.containerId).appendChild(chessBoardWindow)
    }
    
}