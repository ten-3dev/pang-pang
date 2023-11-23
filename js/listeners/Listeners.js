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
            case ' ':   // space
                if(gameConfig.state === 'game'){
                    game.weaponAttack();
                }
                break;
            case 'Escape':
                // 게임 중일때만 중지버튼 사용가능
                if(gameConfig.state === 'game'){
                    gameConfig.changePause();
                // 이미 중지가 되어 있다면 다시 게임으로 변경
                }else if(gameConfig.state === 'pause'){
                    gameConfig.changeGame();
                }
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
            case ' ':   // space
                if(gameConfig.state === 'game'){
                    game.weaponStop();
                }
                break;
        }
    });
}