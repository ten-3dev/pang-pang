const canvasProvider = new CanvasProvider('menuCanvas');

const idleCharacterItems = [
    './assets/character/1/Idle.png',
    './assets/character/2/Idle.png',
    './assets/character/3/Idle.png',
    './assets/character/4/Idle.png',
    './assets/character/5/Idle.png',
    './assets/character/6/Idle.png',
    './assets/character/7/Idle.png',
    './assets/character/8/Idle.png',
    './assets/character/9/Idle.png',
];
const characters = [];

for(let i = 0; i < idleCharacterItems.length; i++){
    const spriteImg = new Image();
    spriteImg.src = idleCharacterItems[i];

    characters.push(new SpriteAnimation(canvasProvider, spriteImg, 10, 4, 0, 0, 4));
}

const menu = new Menu(canvasProvider, characters)

function animateMenu() {
    requestAnimationFrame(animateMenu);
    menu.draw();
}

animateMenu();
