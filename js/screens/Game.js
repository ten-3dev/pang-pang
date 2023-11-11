import { gameConfig } from "../global/Global.js";
import { Ball } from "../utils/ImageDraw.js";

export class Game {
    constructor(canvasProvider) {
        this.canvasProvider = canvasProvider;
        this.character = null;
        this.characterWalk = null;
        this.characterIdle = null;
        this.ball = null;
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

    // 충돌 감지 메서드
    // 원과 사각형의 충돌 감지
    detectCollision(circle, square) {
        // 원과 사격형의 거리를 절댓값으로 구함
        let distX = Math.abs(circle.x - square.x - square.width / 2);
        let distY = Math.abs(circle.y - square.y - square.height / 2);
            
        // 서로의 거리가 원의 반지름 + 사각형의 반폭 또는 반높이보다 그면 충돌이 없음
        if (distX > square.width / 2 + circle.radius || distY > square.height / 2 + circle.radius) {
          return false;
        }
    
        // 서로의 거리가 원의 반지름 + 사각형의 반폭 또는 반높이보다 작으면 충돌이 있음
        if (distX <= square.width / 2 || distY <= square.height / 2) {
          return true;
        }
    
        // 코너(둥근) 부분을 계산하기 위해 대각선을 구해서 계산
        let cornerDistance = Math.pow(distX - square.width / 2, 2) + Math.pow(distY - square.height / 2, 2);
    
        return cornerDistance <= Math.pow(circle.radius, 2);
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
            this.ball = new Ball(this.canvasProvider, 450, 470, 100, 'assets/balls/ball1.png');
        }
        this.ball.draw();
        console.log(this.detectCollision(this.ball.getHitBoxPosition(), this.character.getHitBoxPosition()));
    }
}