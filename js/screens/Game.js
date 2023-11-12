import { gameConfig } from "../global/Global.js";
import { Ball, ImageDraw } from "../utils/ImageDraw.js";
import { HitBoxProvider, TextDrawerProvider } from "../utils/Provider.js";

export class Game {
    constructor(canvasProvider) {
        this.canvasProvider = canvasProvider;
        this.character = null;
        this.characterWalk = null;
        this.characterIdle = null;
        this.ballArr = [];
        this.pipeImage = null;
        this.timerCount = 5;   // 초기 카운트 카운트
        this.timer = null;
        this.textDrawerProvider = new TextDrawerProvider(this.canvasProvider);
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

            // 1초 마다 timerCount 를 줄여줌
            this.timer = setInterval(() => {
                this.timerCount--;
            }, 1000);
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
        // 타이머 (0초가 되면 볼 추가)
        if(this.timerCount <= 0){
            // 랜덤으로 볼의 이미지를 결정 후 push
            const src = `assets/balls/ball${parseInt(Math.random() * 7 + 1)}.png`;
            this.ballArr.push(new Ball(this.canvasProvider, 0, 50, 100, src));

            // 두 번째부터는 20초 뒤에 볼이 추가됨
            this.timerCount = 20;
        }

        // 여러개의 볼을 그리기 및 업데이트
        for(let ball of this.ballArr){
            ball.draw();

            if(ball.x <= 100 && !ball.playingBall){
                ball.moveX(1);
            }else{
                ball.playingBall = true;
                ball.update();
            }
        }
    }

    counterDraw(){
        this.textDrawerProvider.setFont("40px sans-serif");
        if(this.timerCount <= 5){
            this.textDrawerProvider.setColor("red");
        }else{
            this.textDrawerProvider.setColor("pink");
        }

        // 오른쪽 밑 가장자리로 위치 설정
        const x = this.canvasProvider.getCanvasElement().width - 120;
        const y = this.canvasProvider.getCanvasElement().height - 30;

        this.textDrawerProvider.drawText(`counter: ${this.timerCount}`, x, y);
    }

    start(){
        this.init();
        this.changeCharacterImage();
        this.character.draw();
        this.counterDraw();
        this.ballDraw();
        this.pipeDraw();

        // // 충돌 감지
        // const circle = HitBoxProvider.getHitBoxCirclePosition(this.ball);
        // const square = HitBoxProvider.getHitBoxCharacterPosition(this.character);

        // console.log(HitBoxProvider.detectCollision(circle, square));
    }
}