export function drawImage(src: string, color: string): HTMLElement {
    const pieceImage = new Image();
    pieceImage.src = src;
    pieceImage.setAttribute('class', color);
    return pieceImage;
}
