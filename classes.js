class Animation {
    constructor(ElementId, sprite, framesPerSecond, numColumns, x, y) {
        this.canvas = document.getElementById(ElementId);
        this.context = this.canvas.getContext('2d');
        this.sprite = sprite;
        this.framesPerSecond = framesPerSecond;
        this.numColumns = numColumns;
        this.frameWidth = sprite.width / numColumns;
        this.frameHeight = sprite.height;
        this.currentFrame = this.column = this.row = 0;
        this.maxFrame = numColumns;
        this.x = x;
        this.y = y;
        this.lastTimestamp = 0;
        this.frameInterval = 1000 / this.framesPerSecond;
    }

    // 객체를 생성하지 않고도 사용할 수 있도록 static으로 생성
    static clear(ElementId){
        const canvas = document.getElementById(ElementId);
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    // 프레임 속도 조절
    shouldUpdateFrame(timestamp) {
        const elapsed = timestamp - this.lastTimestamp;
        if (elapsed >= this.frameInterval) {
            this.lastTimestamp = timestamp;
            return true;
        }
        return false;
    }

    // 스프라이트 이미지 위치 업데이트
    update(timestamp) {
        if (this.shouldUpdateFrame(timestamp)) {
            this.currentFrame = (this.currentFrame + 1) % this.maxFrame;
            this.column = this.currentFrame % this.numColumns;
            this.row = Math.floor(this.currentFrame / this.numColumns);
        }
    }

    draw() {
        this.update(performance.now());

        this.context.drawImage(
            this.sprite,
            this.column * this.frameWidth,
            this.row * this.frameHeight,
            this.frameWidth,
            this.frameHeight,
            this.x,
            this.y,
            this.frameWidth,
            this.frameHeight
        );
    }
}

class SpriteAnimation extends Animation {
    constructor(ElementId, sprite, framesPerSecond, numColumns, x, y) {
        super(ElementId, sprite, framesPerSecond, numColumns, x, y);
    }
}