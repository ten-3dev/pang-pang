class Game {
    constructor() {
        this.character = null;
        this.characterDx = 0;
        this.characterDy = 0;
        this.initialized = false;
    }

    init(){
        this.character = gameConfig.characters[gameConfig.characterIDX];
        canvasProvider.clearCanvas();
        
        // 첫 실행 시 초기 위치 설정. 그 외 움직임 메서드 실행
        if(!this.initialized){
            this.initialized = true;
            const characterInitX = ((canvasProvider.getCanvasElement().width) / 2) - this.character.frameWidth;
            const characterInitY = canvasProvider.getCanvasElement().height - (this.character.frameHeight * this.character.scale);
            this.character.changeX_Y(characterInitX, characterInitY);
        }else{
            this.character.moveDx(this.characterDx);    
        }
    }

    arrowLeft(){
        this.characterDx = -10;
    }
    
    arrowRight(){
        this.characterDx = 10;
    }

    start(){
        this.init();
        this.character.draw();
    }
}