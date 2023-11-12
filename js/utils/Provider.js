// Canvas 관련 기능 클래스
export class CanvasProvider {
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

// HitBox 관련 기능 클래스
export class HitBoxProvider{
    static getHitBoxCirclePosition(circle){
        const x = circle.x;
        const y = circle.y;
        const radius = circle.radius;

        const result = {
            x: x + circle.radius,
            y: y + circle.radius,
            radius: radius
        };
        
        circle.context.strokeStyle = 'blue';
        circle.context.strokeRect(x, y, radius * 2, radius * 2);

        return result;
    }

    // hitBox 의 크기를 보내줌
    // Flipped 을 하게 되면 위치가 조금씩 틀리기 때문에 삼항연산자 사용
    // 캐릭터마다 가지고 있는 크기(투명 제외)가 다르기 때문에 따로 숫자를 넣어서 사용 (추후 객체로 만들어 사용하기 쉽게 만들 예정)
    static getHitBoxCharacterPosition(character){
        const correctionX = character.isFlipped ? 60 : 45;
        const correctionY = character.isFlipped ? 55 : 55;
        const correctionWidth = character.isFlipped ? -145 : -145;

        const result = {
            x: character.x + correctionX,
            y: character.y + correctionY,
            width: character.frameWidth * character.scale + correctionWidth,
            height: character.frameHeight * character.scale,
        }

        character.context.strokeStyle = 'red';
        character.context.strokeRect(result.x, result.y, result.width, result.height);

        return result;
    }

    // 충돌 감지 메서드
    // 원과 사각형의 충돌 감지
    static detectCollision(circle, square) {
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
}