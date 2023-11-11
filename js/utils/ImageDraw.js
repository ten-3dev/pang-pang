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
    }

    // hitBox 의 크기를 보내줌
    getHitBoxPosition() {
        const x = this.x;
        const y = this.y;
        const radius = this.radius;
        
        this.context.strokeStyle = 'blue';
        this.context.strokeRect(x, y, radius * 2, radius * 2);
        
        return {
            x: this.x + this.radius,
            y: this.y + this.radius,
            radius: this.radius
        }
    }
    
    // 재정의
    draw() {
        this.context.drawImage(this.image, this.x, this.y, this.radius * 2, this.radius * 2);
    }
}