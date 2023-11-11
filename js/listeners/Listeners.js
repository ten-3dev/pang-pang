import { gameConfig } from "../global/Global.js";

export const listener = (menu, game, pause) => {
    // keyDown
    document.addEventListener('keydown', e => {
        switch(e.key){
            case 'ArrowUp':
                if(gameConfig.state === 'menu'){
                    menu.arrowUp();
                }else if(gameConfig.state === 'pause'){
                    // 중지
                }
                break;
            case 'ArrowDown':
                if(gameConfig.state === 'menu'){
                    menu.arrowDown();
                }else if(gameConfig.state === 'pause'){
                    // 중지
                }
                break;
            case 'ArrowLeft':
                if(gameConfig.state === 'menu'){
                    menu.arrowLeft();
                }else if(gameConfig.state === 'game'){
                    game.arrowLeft();
                }else if(gameConfig.state === 'pause'){
                    // 중지
                }
                break;
            case 'ArrowRight':
                if(gameConfig.state === 'menu'){
                    menu.arrowRight();
                }else if(gameConfig.state === 'game'){
                    game.arrowRight();
                }else if(gameConfig.state === 'pause'){
                    // 중지
                }
                break;
            case 'Enter':
                if(gameConfig.state === 'menu'){
                    menu.enter();
                }
                break;
        }
    });

    // keyUp
    document.addEventListener("keyup", e => {
        switch(e.key){
            case 'ArrowLeft':
                if(gameConfig.state === 'game'){
                    game.stopX();
                }
                break;
            case 'ArrowRight':
                if(gameConfig.state === 'game'){
                    game.stopX();
                }
                break;
        }
    });
}