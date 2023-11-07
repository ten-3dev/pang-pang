class Game {
    constructor() {
    }

    characterInitPosition(){
        const x = ((canvasProvider.getCanvasElement().width) / 2) - values.character.frameWidth;
        const y = canvasProvider.getCanvasElement().height - (values.character.frameHeight * values.character.scale);
        canvasProvider.clearCanvas();
        values.character.changeX_Y(x, y);
        values.character.draw();
    }

    start(){
        console.log("게임 시작");
        this.characterInitPosition();
    }
}