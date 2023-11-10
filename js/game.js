class Game {
    constructor() {
        this.character = null;
        this.characterWalk = null;
        this.characterIdle = null;
        this.ball = null;
    }

    init(){
        this.character = gameConfig.characters[gameConfig.characterIDX];
        canvasProvider.clearCanvas();

        // 첫 실행 시 초기 위치 설정
        if(!this.characterIdle || !this.characterWalk){
            // 초기 위치값 잡아주기
            const characterInitX = ((canvasProvider.getCanvasElement().width) / 2) - this.character.frameWidth;
            const characterInitY = canvasProvider.getCanvasElement().height - (this.character.frameHeight * this.character.scale);
            this.character.changeX_Y(characterInitX, characterInitY);

            // idle 이미지 객체 저장
            this.characterIdle = gameConfig.characters[gameConfig.characterIDX].spriteImage;

            // work 이미지 객체 저장
            const img = new Image();
            img.src = gameConfig.characters[gameConfig.characterIDX].spriteImage.src.replace('Idle', 'Walk');
            this.characterWalk = img;
        }
    }

    arrowLeft(){
        this.character.isFlipped = true;
        this.character.moveDxl(-10);
    }
    
    arrowRight(){
        this.character.isFlipped = false;
        this.character.moveDxr(10);
    }

    stopX(){
        this.character.moveDxr(0);
        this.character.moveDxl(0);
    }

    start(){
        this.init();
        if(this.character.dxr != 0 || this.character.dxl != 0){
            this.character.changeNumColumns(6);
            this.character.changeImage(this.characterWalk);
        }else{
            this.character.changeNumColumns(4);
            this.character.changeImage(this.characterIdle); 
        }
        this.character.draw();

        if(!this.ball){
            this.ball = new Ball(canvasProvider, 450, 550, 100, 100, 'assets/balls/ball1.png');
        }
        this.ball.draw();
    }
}