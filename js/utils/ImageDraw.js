// 이미지 표시 관련 클래스
export class ImageDraw {
    constructor(canvasProvider, x, y, width, height, imageSrc) {
        this.canvasElement = canvasProvider.getCanvasElement();
        this.context = canvasProvider.getContext();
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
        this.bounceHeight = 100;
        this.gravity = 0.5;
        this.dropSpeed = 0;
        this.moveSize = 5;
        this.playingBall = false; // 볼이 파이프에 나왔는지 여부
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

    // 재정의
    draw() {
        this.context.drawImage(this.image, this.x, this.y, this.radius * 2, this.radius * 2);
    }
}

// 이미지 표시 관련 클래스
export class Weapon extends ImageDraw{
    constructor(canvasProvider, imageSrc) {
        super(canvasProvider, 0, 0, 0, 0, imageSrc);
        this.width = 30;
        this.height = 3000;
        this.y = canvasProvider.getCanvasElement().height;
        this.isAttack = false;
        this.onTimer = false;
        this.timer = null;
        this.warning = null;
        this.blink = null;
        this.isVisible = true;
    }

    stop(){
        this.isAttack = false;
        this.onTimer = false;
        this.isVisible = true;
        this.y = this.canvasElement.height;
        clearTimeout(this.timer);
        clearTimeout(this.warning);
        clearInterval(this.blink);
    }

    moveX(x){
        this.x = x;
    }

    draw() {
        // 공격
        if(this.y > 0 && this.isAttack){
            this.y -= 15;
        }

        // 위로 끝까지 갔는데도 3초동안 공격 취소를 하지 않으면 강제 취소
        if(this.y < 0 && this.isAttack && !this.onTimer){
            // 경고 timeOut
            this.warning = setTimeout(() => {
                this.blink = setInterval(() => {
                    this.isVisible = !this.isVisible;
                }, 100);
            }, 500);

            // 무기 제거 timeOut
            this.timer = setTimeout(() => {
                this.stop();
            }, 2000);
            this.onTimer = true;
        }

        if(this.isVisible){
            this.context.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
    }
}