// 필요한 변수 선언
const character = document.getElementById('character');
const frameWidth = document.getElementById('gameBox').clientWidth;

let posX = 0;
let isFacingRight = true;
let keysPressed = [];
let idleTimer;

// 캐릭터 중앙으로 이동
character.style.left = (frameWidth / 2) - (character.clientWidth / 2) + "px";

// 캐릭터의 좌우반전과 이동을 담당
function setCharacterTransform(translateX, scaleX) {
    character.style.transform = `translate(${translateX}px, 0px) ${scaleX ? 'scaleX(-1)' : ''}`;
}

// 캐릭터를 걷는 이미지로 변경
function changeToWalkImage() {
    character.style.backgroundImage = 'url("./assets/character/10/Walk.png")';
}

// 캐릭터를 서 있는 이미지로 변경
function changeToIdleImage() {
    character.style.backgroundImage = 'url("./assets/character/10/Idle.png")';
}

// 캐릭터 이동 핵심 리스너
document.addEventListener('keydown', e => {
    keysPressed.push(e.key);

    if (keysPressed.includes('ArrowLeft')) {
        changeToWalkImage();
        posX > ((frameWidth / 2) - 60) * -1 ? posX -= 15 : 0;
        isFacingRight = false;
    } else if (keysPressed.includes('ArrowRight')) {
        changeToWalkImage();
        posX < ((frameWidth / 2) - 60) ? posX += 15 : 0;
        isFacingRight = true;
    }

    setCharacterTransform(posX, !isFacingRight);

    // 타이머 재시작
    clearTimeout(idleTimer);
    idleTimer = setTimeout(changeToIdleImage, 100); // 0.1초 (100ms) 후에 Idle 이미지로 변경
});

// 리스트 초기화
document.addEventListener('keyup', e => {
    keysPressed = []
});
