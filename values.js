const canvasProvider = new CanvasProvider('menuCanvas');
let toggle = true;

let values = {
    toggle: true,
    character: ''
}

function changeToggle(){
    canvasProvider.clearCanvas();
    toggle = !toggle;
}

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

// 재귀를 이용해 모든 이미지가 로딩에 성공하면 화면에 표시
function loadCharacterImages(index) {
    if (index >= characters_src.length) {
        return;
    }

    const characterImg = new Image();
    characterImg.src = characters_src[index];
    characterImg.onload = () => {
        characters.push(new SpriteAnimation(canvasProvider, characterImg, 10, 4, 0, 0, 4));
        // 다음 이미지 로딩을 시작
        loadCharacterImages(index + 1);
    };
}

// 0번째 캐릭터 이미지 로딩 시작
loadCharacterImages(0);