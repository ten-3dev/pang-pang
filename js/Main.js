import { gameConfig } from "./global/Global.js";    // 전역(공유변수)
import { CanvasProvider } from "./utils/Provider.js";
import { Menu } from "./screens/Menu.js";
import { Game } from "./screens/Game.js";
import { listener } from './listeners/Listeners.js';

const canvasProvider = new CanvasProvider('canvas');
const menu = new Menu(canvasProvider);
const game = new Game(canvasProvider);

gameConfig.loadImages(0, canvasProvider);

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