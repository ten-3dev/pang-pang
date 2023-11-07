const ElementId = "gameBox"

const spriteImage = new Image();
spriteImage.src = './assets/character/2/Idle.png';

const spriteAnimation1 = new SpriteAnimation(ElementId, spriteImage, 10, 4, 50, 50);
const spriteAnimation2 = new SpriteAnimation(ElementId, spriteImage, 10, 4, 50, 100);

function animate() {
    requestAnimationFrame(animate);
    Animation.clear(ElementId);

    spriteAnimation1.draw();
    spriteAnimation2.draw();
}

spriteImage.onload = function() {
    // Start the animation loop
    animate();
};
