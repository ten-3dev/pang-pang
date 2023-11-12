import { gameConfig } from "../global/Global.js";
import { Ball, ImageDraw } from "../utils/ImageDraw.js";
import { HitBoxProvider } from "../utils/Provider.js";

export class Game {
    constructor(canvasProvider) {
        this.canvasProvider = canvasProvider;
        this.character = null;
        this.characterWalk = null;
        this.characterIdle = null;
        this.ball = null;
        this.pipeImage = null;
        this.isBallOutOfPipe = false;
    }

    init(){
        this.character = gameConfig.characters[gameConfig.characterIDX];
        this.canvasProvider.clearCanvas();

        // 첫 실행 시 초기 위치 설정
        if(!this.characterIdle || !this.characterWalk){
            // 초기 위치값 잡아주기
            const characterInitX = ((this.canvasProvider.getCanvasElement().width) / 2) - this.character.frameWidth;
            const characterInitY = this.canvasProvider.getCanvasElement().height - (this.character.frameHeight * this.character.scale);
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
        this.character.moveDxl(-8);
    }
    
    arrowRight(){
        this.character.isFlipped = false;
        this.character.moveDxr(8);
    }

    stopX(){
        this.character.moveDxr(0);
        this.character.moveDxl(0);
    }

    // 움직임을 체크 후 Idle, Walk 이미지 변경
    changeCharacterImage(){
        if(this.character.dxr != 0 || this.character.dxl != 0){
            this.character.changeNumColumns(6);
            this.character.changeImage(this.characterWalk);
        }else{
            this.character.changeNumColumns(4);
            this.character.changeImage(this.characterIdle); 
        }
    }

    pipeDraw(){
        if(!this.pipeImage){
            this.pipeImage = new ImageDraw(this.canvasProvider, 0, 50, 100, 200, '/assets/objects/pipe.png');
        }

        this.pipeImage.draw();
    }

    ballDraw(){
        if(!this.ball){
            this.ball = new Ball(this.canvasProvider, 0, 50, 100, 'assets/balls/ball1.png');
        }

        this.ball.draw();

        if(this.ball.x <= 100 && !this.isBallOutOfPipe){
            this.ball.moveX(1);
        }else{
            this.isBallOutOfPipe = true;
            this.ball.update();
        }
    }

    start(){
        this.init();
        this.changeCharacterImage();
        this.character.draw();
        this.ballDraw();
        this.pipeDraw();

        // // 충돌 감지
        // const circle = HitBoxProvider.getHitBoxCirclePosition(this.ball);
        // const square = HitBoxProvider.getHitBoxCharacterPosition(this.character);

        // console.log(HitBoxProvider.detectCollision(circle, square));
    }
}