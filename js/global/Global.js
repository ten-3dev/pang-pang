import { CharacterAnimate } from "../utils/SpriteAnimator.js";

// 게임 시작 및 모든 전역 변수들의 객체
const initGameConfig = {
    // 첫 화면에 표시해야하는 이미지 주소 리스트
    img_src: [
        './assets/characters/1/Idle.png',
        './assets/characters/2/Idle.png',
        './assets/characters/3/Idle.png',
        './assets/characters/4/Idle.png',
        './assets/characters/5/Idle.png',
        './assets/characters/6/Idle.png',
        './assets/characters/7/Idle.png',
        './assets/characters/8/Idle.png',
        './assets/characters/9/Idle.png',
        './assets/backgrounds/bg1.png',
        './assets/backgrounds/bg2.png',
        './assets/backgrounds/bg3.png',
        './assets/backgrounds/bg4.png',
        './assets/backgrounds/bg5.png',
        './assets/backgrounds/bg6.png',
        './assets/backgrounds/bg7.png',
        './assets/backgrounds/bg8.png',
    ],

    // 모든 배경화면 이미지를 담는 곳
    backgrounds: [],

    // 모든 캐릭터 객체를 담는 곳
    characters: [],

    // 선택한 캐릭터 idx
    characterIDX: 0,

    // 게임-메뉴-중지 간 토글 변수 및 함수
    state_type: ['menu', 'game', 'pause', 'gameOver'],
    state: 'menu',

    changeMenu(){
        this.state = this.state_type[0]
    },

    changeGame(){
        this.state = this.state_type[1]
    },

    changePause(){
        this.state = this.state_type[2]
    },

    changeGameOver(){
        this.state = this.state_type[3]
    },

    // 리소스를 로드하기 위해서 처음 재귀로 모두 로드시킴
    loadImages(index, canvasProvider) {
        if (index >= this.img_src.length) {
            return;
        }

        const img = new Image();
        img.src = this.img_src[index];
        img.onload = () => {
            // 리소스 중 캐릭터 폴더에 있는 사진들은 곧바로 애니메이터 객체 생성
            if(this.img_src[index].includes('characters')){
                this.characters.push(new CharacterAnimate(canvasProvider, img, 10, 4, 0, 0, 4));
            }else if(this.img_src[index].includes('backgrounds')){
                this.backgrounds.push(img);
            }
            this.loadImages(index + 1, canvasProvider);
        };
    },

    // 카운터, 하트 위치
    getCounterX(canvasProvider){
        return canvasProvider.getCanvasElement().width - 120;
    },
    getCounterY(canvasProvider){
        return canvasProvider.getCanvasElement().height - 30;
    },
    getHeartX(canvasProvider){
        return canvasProvider.getCanvasElement().width - 60;
    },
    getHeartY(canvasProvider){
        return canvasProvider.getCanvasElement().height - 120;
    },
    getScoreX(canvasProvider){
        return canvasProvider.getCanvasElement().width / 2;
    },
    getScoreY(canvasProvider){
        return canvasProvider.getCanvasElement().height - 30;
    },

    score: 0,
}

let gameConfig = {...initGameConfig};

export {
    gameConfig
};