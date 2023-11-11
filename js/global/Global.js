// 게임 시작 및 모든 전역 변수들의 객체
const initGameConfig = {
    // 게임 내에 모든 이미지 주소 리스트
    img_src: [
        './assets/character/1/Idle.png',
        './assets/character/2/Idle.png',
        './assets/character/3/Idle.png',
        './assets/character/4/Idle.png',
        './assets/character/5/Idle.png',
        './assets/character/6/Idle.png',
        './assets/character/7/Idle.png',
        './assets/character/8/Idle.png',
        './assets/character/9/Idle.png',
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
}

let gameConfig = {...initGameConfig};

export {
    gameConfig
};