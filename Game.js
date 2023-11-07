class Game {
    constructor(canvasElement) {
        this.canvas = canvasElement;
        this.context = canvasElement.getContext('2d');
        this.player = {
            x: 50,
            y: canvasElement.height / 2,
            width: 50,
            height: 50,
            speed: 5
        };

        this.initializeInputListeners();
    }

    initializeInputListeners() {
        document.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowRight') {
                this.player.x += this.player.speed;
            } else if (event.key === 'ArrowLeft') {
                this.player.x -= this.player.speed;
            }
        });
    }

    update() {
        // 게임 상태 업데이트 로직을 추가 (예: 충돌 검사, 게임 오버 체크 등)
    }

    draw() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // 캐릭터 그리기
        this.context.fillStyle = 'red';
        this.context.fillRect(this.player.x, this.player.y, this.player.width, this.player.height);
    }
}

const gameCanvas = document.getElementById('gameCanvas');
const game = new Game(gameCanvas);

function animateGame() {
    requestAnimationFrame(animateGame);
    game.update();
    game.draw();
}

animateGame();
