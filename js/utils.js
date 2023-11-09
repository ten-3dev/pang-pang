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

    shouldUpdateFrame(timestamp) {
        const elapsed = timestamp - this.lastTimestamp;
        if (elapsed >= this.frameInterval) {
            this.lastTimestamp = timestamp;
            return true;
        }
        return false;
    }

    changeX_Y(x, y){
        this.x = x;
        this.y = y;
    }

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
    }
}