// Canvas 관련 기능 클래스
class CanvasProvider {
    constructor(elementId) {
        this.canvasElement = document.getElementById(elementId);
        this.context = this.canvasElement.getContext('2d');
    }

    getCanvasElement() {
        return this.canvasElement;
    }

    getContext() {
        return this.context;
    }

    clearCanvas() {
        this.context.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);
    }
}

// Ball 관련 기능 클래스
class Ball {
    constructor(canvasProvider, x, y, radius, speed, imageSrc) {
        this.canvasElement = canvasProvider.getCanvasElement();
        this.context = canvasProvider.getContext();
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.speed = speed;
        this.dx = this.speed;
        this.dy = this.speed;
        this.image = new Image();
        this.image.src = imageSrc;
    }

    draw() {
        this.context.drawImage(this.image, this.x - this.radius, this.y - this.radius, this.radius * 2, this.radius * 2);
    }
}


// 스프라이트 관련 기능 클래스
class SpriteAnimator {
    constructor(canvasProvider, spriteImage, framesPerSecond, numColumns, x, y, scale) {
        this.canvasElement = canvasProvider.getCanvasElement();
        this.context = canvasProvider.getContext();
        this.spriteImage = spriteImage;
        this.framesPerSecond = framesPerSecond;
        this.numColumns = numColumns;
        this.frameWidth = spriteImage.width / numColumns;
        this.frameHeight = spriteImage.height;
        this.currentFrame = this.column = this.row = 0;
        this.maxFrame = numColumns;
        this.x = x;
        this.y = y;
        this.dxr = 0;
        this.dxl = 0;
        this.dy = 0;
        this.scale = scale;
        this.lastTimestamp = 0;
        this.frameInterval = 1000 / this.framesPerSecond;
    }

    // 스프라이트 변경 속도 조절 메서드
    shouldUpdateFrame(timestamp) {
        const elapsed = timestamp - this.lastTimestamp;
        if (elapsed >= this.frameInterval) {
            this.lastTimestamp = timestamp;
            return true;
        }
        return false;
    }

    // 위치 변경
    changeX_Y(x, y){
        this.x = x;
        this.y = y;
    }

    // 이동 메서드
    moveDxr(dxr){
        this.dxr = dxr;
    }
    moveDxl(dxl){
        this.dxl = dxl;
    }
    moveDy(dy){
        this.dy = dy;
    }


    update(timestamp) {
        if (this.shouldUpdateFrame(timestamp)) {
            this.currentFrame = (this.currentFrame + 1) % this.maxFrame;
            this.column = this.currentFrame % this.numColumns;
            this.row = Math.floor(this.currentFrame / this.numColumns);
        }
    }

    draw() {
        this.update(performance.now());
      
        this.x += this.dxr + this.dxl;
        this.y += this.dy;

        this.context.drawImage(
            this.spriteImage,
            this.column * this.frameWidth,
            this.row * this.frameHeight,
            this.frameWidth,
            this.frameHeight,
            this.x,
            this.y,
            this.frameWidth * this.scale,
            this.frameHeight * this.scale
        );
    }
}

class CharacterAnimate extends SpriteAnimator {
    constructor(canvasProvider, spriteImage, framesPerSecond, numColumns, x, y, scale) {
        super(canvasProvider, spriteImage, framesPerSecond, numColumns, x, y, scale);
        this.isFlipped = false; // 이미지가 좌우로 반전여부
    }

    // 객체의 바뀌는 수(스프라이트를 얼마나 자를건가)를 변경
    changeNumColumns(numColumns){
        this.numColumns = numColumns;
    }

    // 객체의 img 를 변경
    changeImage(newSpriteImage) {
        this.spriteImage = newSpriteImage;
    }

    // 이미지의 좌우반전
    flipImage(img) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.scale(-1, 1);
        ctx.drawImage(img, -img.width, 0);
        const flippedImg = new Image();
        flippedImg.src = canvas.toDataURL();
        return flippedImg;
    }

    // 벽 감지 메서드
    wall_collision_detection(){
        if (this.dxl < 0 && this.x <= -30 || this.dxr > 0 && this.x >= 1090) {
            this.dxl = 0; // 왼쪽 벽에 닿으면 이동을 멈춤
            this.dxr = 0; // 오른쪽쪽 벽에 닿으면 이동을 멈춤
        }
    }

    // 재정의
    draw(){
        this.wall_collision_detection();

        super.update(performance.now());

        this.x += this.dxr + this.dxl;
        this.y += this.dy;

        this.context.drawImage(
            // 좌우반전
            this.isFlipped ? this.flipImage(this.spriteImage) : this.spriteImage,
            this.column * this.frameWidth,
            this.row * this.frameHeight,
            this.frameWidth,
            this.frameHeight,
            // 좌우반전 위치 맞추기
            this.isFlipped ? this.x - this.frameWidth : this.x,
            this.y,
            this.frameWidth * this.scale,
            this.frameHeight * this.scale
        );
    }
}