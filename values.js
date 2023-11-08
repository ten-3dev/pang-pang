const canvasProvider = new CanvasProvider('menuCanvas');

const initialState = {
    toggle: true,
    character: ''
};

let state = { ...initialState };

const characters_src = [
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

function changeToggle() {
    canvasProvider.clearCanvas();
    state.toggle = !state.toggle;
}

function loadCharacterImages(index) {
    if (index >= characters_src.length) {
        return;
    }

    const characterImg = new Image();
    characterImg.src = characters_src[index];
    characterImg.onload = () => {
        characters.push(new SpriteAnimation(canvasProvider, characterImg, 10, 4, 0, 0, 4));
        loadCharacterImages(index + 1);
    };
}


function resetState() {
    state = { ...initialState };
}


loadCharacterImages(0);