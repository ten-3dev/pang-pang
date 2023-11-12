import { CharacterAnimate } from "../utils/SpriteAnimator.js";

// 게임 시작 및 모든 전역 변수들의 객체
const initGameConfig = {
    // 게임 내에 모든 이미지 주소 리스트
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
    ],

    // 모든 캐릭터 객체를 담는 곳
    characters: [],

    // 선택한 캐릭터 idx
    characterIDX: 0,

    // 게임-메뉴-중지 간 토글 변수 및 함수
    state_type: ['menu', 'game', 'pause'],
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

    // 모든 리소스를 로드하기 위해서 처음 재귀로 모두 로드시킴
    loadImages(index, canvasProvider) {
        if (index >= this.img_src.length) {
            return;
        }

        const img = new Image();
        img.src = this.img_src[index];
        img.onload = () => {
            // 모든 리소스 중 캐릭터 폴더에 있는 사진들은 곧바로 애니메이터 객체 생성
            if(this.img_src[index].includes('characters')){
                this.characters.push(new CharacterAnimate(canvasProvider, img, 10, 4, 0, 0, 4));
            }
            this.loadImages(index + 1, canvasProvider);
        };
    }
}

let gameConfig = {...initGameConfig};

export {
    gameConfig
};