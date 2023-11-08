class Game {
    constructor() {
        this.character = null;
        this.characterX = 0;
        this.characterY = 0;
    }

    init(){
        this.character = gameConfig.characters[gameConfig.characterIDX];
        this.characterX = ((canvasProvider.getCanvasElement().width) / 2) - this.character.frameWidth;
        this.characterY = canvasProvider.getCanvasElement().height - (this.character.frameHeight * this.character.scale);
        canvasProvider.clearCanvas();
        this.character.changeX_Y(this.characterX, this.characterY);
    }

    arrowLeft(){
        
    }
    
    arrowRight(){
    }

    start(){
        this.init();
        this.character.draw();
    }
}