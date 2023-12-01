import { gameConfig } from "../global/Global.js";
import { Ball, ImageDraw, Weapon, Heart } from "../utils/ImageDraw.js";
import { HitBoxProvider, TextDrawerProvider } from "../utils/Provider.js";

export class Game {
    constructor(canvasProvider) {
        this.canvasProvider = canvasProvider;
        this.character = null;
        this.characterWalk = null;
        this.characterIdle = null;
        this.ballArr = [];
        this.pipeLeftImage = null;
        this.pipeRightImage = null;
        this.timerCount = 5;   // 초기 볼 카운트 카운트
        this.timer = null;
        this.counterDrawerProvider = new TextDrawerProvider(this.canvasProvider);
        this.hearts = new Heart(this.canvasProvider);
        this.weapon = null;
        this.isReset = false;
        this.scoreDrawerProvider = new TextDrawerProvider(this.canvasProvider);;
    }

    reset(){
        this.hearts = new Heart(this.canvasProvider);
        console.log("하트 초기화 완료")
        clearInterval(this.timer);
        this.timerCount = 5;
        console.log("타이머 초기화")
        this.ballArr = []
        console.log("볼 초기화")
        this.isReset = true;
        console.log("위치 및 이미지 초기화")
    }

    init(){
        this.character = gameConfig.characters[gameConfig.characterIDX];

        // 배경 설정 및 첫 실행 시 초기 위치 설정
        if(!this.characterIdle || !this.characterWalk || this.isReset){
            this.isReset = false;

            const bgIdx = Math.floor(Math.random() * (gameConfig.backgrounds.length - 1));
            this.canvasProvider.getCanvasElement().style.backgroundImage = `url("${gameConfig.backgrounds[bgIdx].src}")`;

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
                // state 상태가 game 일때만 카운터가 실행됨
                if(gameConfig.state === 'game') this.timerCount--;
            }, 1000);

            // weapon 설정
            this.weapon = new Weapon(this.canvasProvider, 'assets/weapons/weapon.png');
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

        // 좌우 방향키가 모두 눌렸을 때 Idle 이미지로 변경
        if(this.character.dxr != 0 && this.character.dxl != 0){
            this.character.changeNumColumns(4);
            this.character.changeImage(this.characterIdle); 
        }
    }

    pipeDraw(){
        if(!this.pipeLeftImage){
            this.pipeLeftImage = new ImageDraw(this.canvasProvider, 0, 50, 100, 200, '/assets/objects/pipe_left.png');
        }
        if(!this.pipeRightImage){
            this.pipeRightImage = new ImageDraw(this.canvasProvider, this.canvasProvider.getCanvasElement().width - 100, 50, 100, 200, '/assets/objects/pipe_right.png');
        }

        this.pipeRightImage.draw();
        this.pipeLeftImage.draw();
    }

    ballDraw(){
        // 타이머 (0초가 되면 볼 추가)
        if(this.timerCount <= 0){
            // 랜덤으로 볼의 이미지를 결정 후 push
            const src = `assets/balls/ball${parseInt(Math.random() * 7 + 1)}.png`;

            // 왼쪽, 오른쪽 선택을 랜덤으로 0: 오른쪽, 1: 왼쪽
            const position = Math.floor(Math.random() * 2);
            const ball = new Ball(this.canvasProvider, 0, 50, 100, src);

            if(position){  // position에 따라 초기 x 와 움직이는 방향을 미리 설정
                ball.x = this.canvasProvider.getCanvasElement().width - ball.radius * 2;
                ball.moveSize = -5;
                ball.isStartLeft = false;
            }
            this.ballArr.push(ball);

            // 두 번째부터는 8 ~ 15 초 뒤에 볼이 추가됨
            this.timerCount = Math.floor(Math.random() * 8) + 8;
        }

        // 여러개의 볼을 그리기 및 업데이트
        for(let ball of this.ballArr){
            ball.draw();
            ball.blink.start();
            
            // 파이프에서 나오도록
            if(ball.isStartLeft){ // 왼쪽이면
                if(ball.x <= 100 && !ball.playingBall){
                    ball.moveX(1);
                }else{
                    ball.playingBall = true;
                    ball.update();
                }                
            }else{  // 오른쪽이면
                if(ball.x >= this.canvasProvider.getCanvasElement().width - (ball.radius * 2) - 100 && !ball.playingBall){
                    ball.moveX(-1);
                }else{
                    ball.playingBall = true;
                    ball.update();
                }  
            }
        }
    }

    scoreDraw(){
        this.scoreDrawerProvider.setFont("40px sans-serif");

        this.scoreDrawerProvider.setColor("white");

        // 오른쪽 밑 가장자리로 위치 설정
        const x = gameConfig.getScoreX(this.canvasProvider);
        const y = gameConfig.getScoreY(this.canvasProvider);

        this.scoreDrawerProvider.drawText(`score: ${gameConfig.score}`, x, y);
    }

    counterDraw(){
        this.counterDrawerProvider.setFont("40px sans-serif");
        if(this.timerCount <= 5){
            this.counterDrawerProvider.setColor("red");
        }else{
            this.counterDrawerProvider.setColor("pink");
        }

        // 오른쪽 밑 가장자리로 위치 설정
        const x = gameConfig.getCounterX(this.canvasProvider);
        const y = gameConfig.getCounterY(this.canvasProvider);

        this.counterDrawerProvider.drawText(`counter: ${this.timerCount}`, x, y);
    }

    // 무기 공격
    weaponAttack(){
        // 무기를 캐릭터의 중앙 위치로 이동
        if(!this.weapon.isSetLocation){
            this.weapon.moveX(this.character.x + (this.character.frameWidth / 2) + 30);
            this.weapon.isSetLocation = true;
            this.weapon.isAttack = true;
        }
    }

    weaponStop(){
        this.weapon.stop();
    }

    detectCollision(){
        // // 충돌 감지
        const character = HitBoxProvider.getHitBoxCharacterPosition(this.character);
        const weapon = HitBoxProvider.getHitBoxWeaponPosition(this.weapon)

        // 여러개의 볼과 충돌 감지
        for(let ball of this.ballArr){
            const circle = HitBoxProvider.getHitBoxCirclePosition(ball);

            // 무기와 볼이 닿았는지
            if(HitBoxProvider.detectCollision(circle, weapon)){
                console.log("무기와 공이 닿음");
                this.weapon.setInitPosition();

                // 무적일땐 아무런 효과 없이 바로 리턴
                if(ball.blink.isInvincible){
                    return;
                }
            
                const findBall = this.ballArr.find(e => e === ball);
                const childBalls = findBall.createChildBall();

                // 점수 처리
                if(findBall.hitCnt === 0){
                    gameConfig.score += 20;
                }else if(findBall.hitCnt === 1){
                    gameConfig.score += 40;
                }else if(findBall.hitCnt === 2){
                    gameConfig.score += 60;
                }

                // 닿은 볼을 찾은 후 삭제
                const balls = this.ballArr.filter(e => e != ball);
                this.ballArr = balls;

                // 무기에 3번 맞았으면 제거. 아니면 배열에 추가
                childBalls.map(e => {
                    if(e.hitCnt < 3) this.ballArr.push(e);
                })
            }
        
            // 캐릭터와 볼이 닿았는지
            if(HitBoxProvider.detectCollision(circle, character)){
                console.log("공과 캐릭터에 닿음");
                // 무적이 아닐 때 생명 - 1
                if(!this.character.blink.isInvincible){
                    this.hearts.attacked();

                    // 피가 0일때 GAME OVER
                    if(this.hearts.heartNum === 0){
                        gameConfig.changeGameOver();
                        return;
                    }
                    // 무적효과
                    this.character.blink.again();
                }
            }
        }
    }

    start(){
        this.canvasProvider.clearCanvas();

        this.init();
        this.changeCharacterImage();
        this.character.draw();

        this.counterDraw();
        this.scoreDraw();
        this.ballDraw();
        this.pipeDraw();

        this.weapon.draw();
        this.detectCollision();

        this.hearts.draw();
    }
}