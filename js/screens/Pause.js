export class Pause{
    constructor(canvasProvider){
        this.canvasProvider = canvasProvider;
        this.context = canvasProvider.getContext();
        this.canvasElement = canvasProvider.getCanvasElement();
    }

    // 반투명 백그라운드 그리기
    bgDraw(){
        const gameWidth = this.canvasElement.width;
        const gameHeight = this.canvasElement.height;

        this.context.fillStyle = "rgba(0, 0, 0, 0.5)";
        this.context.fillRect(0, 0, gameWidth, gameHeight);
    }

    start(){
        this.canvasProvider.clearCanvas();
        this.bgDraw()
    }
}