class Game {
    constructor() {
    }

    characterInitPosition(){
        const x = ((canvasProvider.getCanvasElement().width) / 2) - state.character.frameWidth;
        const y = canvasProvider.getCanvasElement().height - (state.character.frameHeight * state.character.scale);
        canvasProvider.clearCanvas();
        state.character.changeX_Y(x, y);
        state.character.draw();
    }

    start(){
        console.log("게임 시작");
        this.characterInitPosition();
    }
}