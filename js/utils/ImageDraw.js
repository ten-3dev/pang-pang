import { gameConfig } from "../global/Global.js";
import { BlinkProvider } from "./Provider.js";

// 이미지 표시 관련 클래스
export class ImageDraw {
    constructor(canvasProvider, x, y, width, height, imageSrc) {
        this.canvasProvider = canvasProvider;
        this.canvasElement = this.canvasProvider.getCanvasElement();
        this.context = this.canvasProvider.getContext();
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.image = new Image();
        this.image.src = imageSrc;
    }

    draw() {
        this.context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}

// 이미지 표시 관련 클래스
export class Ball extends ImageDraw {
    constructor(canvasProvider, x, y, radius, imageSrc) {
        // 원 모양이기 때문에 width, height 대신 radius 로 대체
        super(canvasProvider, x, y, 0, 0, imageSrc);
        this.radius = radius;
        this.gravity = 0.5;         // 내려가는 속도
        this.dropSpeed = 0;
        this.moveSize = 5;          // 좌우로 움직이는 속도
        this.playingBall = false;   // 볼이 파이프에 나왔는지 여부
        this.hitCnt = 0;            // this 가 몇 번 무기에 공격 당했는지 카운터
        this.blink = new BlinkProvider(canvasProvider, 20, 100);
        this.isStartLeft = true;    // 왼쪽 파이프에서 시작함(초기값)
    }

    // 공의 상태를 업데이트
    update() {
        this.dropSpeed += this.gravity;

        // 공의 위치 업데이트
        this.y += this.dropSpeed;
        this.x += this.moveSize;

        // 양옆 벽에 닿았을 때 튕기도록 업데이트
        if(this.x + (this.radius * 2) > this.canvasElement.width || this.x < 0){
            this.moveSize *= -1;
        }

        // 바닥에 닿으면 튕기도록 처리
        if (this.y + this.radius * 2 >= this.canvasElement.height) {
            this.dropSpeed *= -1; // 일정 비율로 튕기도록 처리
            this.dropSpeed += -this.gravity; // 점점 떨어지지 않도록 설정
        }
    }

    moveX(speed){
        this.x += speed;
    }

    changeY(y){
        this.y = y;
    }

    // 무기와 닿으면 자식 공 생성 메서드
    createChildBall(){
        const childBall = []

        for(let i = 0; i < 2; i++){
            const ball = new Ball(this.canvasProvider, this.x, this.y, this.radius / 1.4, this.image.src);

            ball.hitCnt = this.hitCnt + 1;
            ball.playingBall = true;            // 파이프에서 나오는 모션 비활성화
            ball.blink.isBlinkStart = false;    // 자식 볼은 무적 비활성화
            // 첫 번째 공은 왼쪽으로 두 번째 공은 오른쪽으로 설정(이동)
            ball.moveSize = i === 0 ? -5 : 5;

            childBall.push(ball);
        }

        return childBall;
    }

    // 재정의
    draw() {
        // 무적 일때 깜빡임을 위해
        if(this.blink.isVisible){
            this.context.drawImage(this.image, this.x, this.y, this.radius * 2, this.radius * 2);
        }

    }
}

// 이미지 표시 관련 클래스
export class Weapon extends ImageDraw{
    constructor(canvasProvider, imageSrc) {
        super(canvasProvider, 0, 0, 0, 0, imageSrc);
        this.width = 30;
        this.height = 3000;
        // height 그대로 주면 무기를 쓰지 않아도 hitBox는 살짝 나와있기 때문에 
        // 공과 닿으면 충돌 감지가 되기 때문에 더 밑으로 내려줌 
        this.y = this.canvasProvider.getCanvasElement().height + 20;
        this.isAttack = false;          // 공격 여부
        this.isSetLocation = false;     // 무기의 x를 고정시키기 위해
    }

    // 공격 중지
    stop(){
        this.isAttack = false;
        this.isSetLocation = false;
        this.y = this.canvasElement.height + 20;
    }

    // weapon 을 원래 자리(화면 아래)로 재배치
    setInitPosition(){
        this.stop();
        this.isSetLocation = true;
    }

    moveX(x){
        this.x = x;
    }

    draw() {
        // 공격
        if(this.y > 0 && this.isAttack){
            this.y -= 15;
        }

        this.context.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}

export class Heart extends ImageDraw{
    constructor(canvasProvider) {
        super(canvasProvider, 0, 0, 40, 40, 'assets/objects/heart.png');
        this.heartNum = 5;  // 초기에 하트는 5개
    }

    attacked(){
        if(this.heartNum > 0){
            this.heartNum--;
        }
    }

    draw(){
        for(let i = 0; i < this.heartNum; i++){
            this.x = gameConfig.getHeartX(this.canvasProvider) + (i * -50);
            this.y = gameConfig.getHeartY(this.canvasProvider);
    
            this.context.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
    }
}