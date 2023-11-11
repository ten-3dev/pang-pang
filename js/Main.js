import { gameConfig } from "./global/Global.js";    // 전역(공유변수)
import { CanvasProvider } from "./utils/Provider.js";
import { CharacterAnimate } from "./utils/SpriteAnimator.js";
import { Menu } from "./screens/Menu.js";
import { Game } from "./screens/Game.js";
import { listener } from './listeners/Listeners.js';

const canvasProvider = new CanvasProvider('canvas');
const menu = new Menu(canvasProvider);
const game = new Game(canvasProvider);


// 모든 리소스를 로드하기 위해서 처음 재귀로 모두 로드시킴
function loadImages(index) {
    if (index >= gameConfig.img_src.length) {
        return;
    }

    const img = new Image();
    img.src = gameConfig.img_src[index];
    img.onload = () => {
        // 모든 리소스 중 캐릭터 폴더에 있는 사진들은 곧바로 애니메이터 객체 생성
        if(gameConfig.img_src[index].includes('character')){
            gameConfig.characters.push(new CharacterAnimate(canvasProvider, img, 10, 4, 0, 0, 4));
        }
        loadImages(index + 1);
    };
}

loadImages(0);

// 리소스 로딩을 모두 끝낸 후에 메뉴 시작
window.onload = () => {
    // 키보드 이벤트 추가
    listener(menu, game);

    function animate() {
        requestAnimationFrame(animate);
        switch(gameConfig.state){
            case 'menu':
                menu.start();
                break;
            case 'game':
                game.start();
                break;
            case 'pause':
                break;
        }
    }
    animate(); // 애니메이션 시작
}