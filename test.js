const elementId = "menuCanvas";
const canvasProvider = new CanvasProvider(elementId);
const spriteImage = new Image();
spriteImage.src = './assets/character/2/Idle.png';

spriteImage.onload = function () {
    const spriteAnimation1 = new SpriteAnimation(canvasProvider, spriteImage, 10, 4, 50, 50, 4);
    const spriteAnimation2 = new SpriteAnimation(canvasProvider, spriteImage, 10, 4, 50, 200, 4);

    function animate() {
        requestAnimationFrame(animate);
        canvasProvider.clearCanvas();
        spriteAnimation1.draw();
        spriteAnimation2.draw();
    }

    animate(); // 애니메이션 시작
};
