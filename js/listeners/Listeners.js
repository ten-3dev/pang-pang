import { gameConfig } from "../global/Global.js";

export const listener = (menu, game, pause, gameOver) => {
    // keyDown
    document.addEventListener('keydown', e => {
        switch(e.key){
            case 'ArrowUp':
                if(gameConfig.state === 'menu'){
                    menu.arrowUp();
                }else if(gameConfig.state === 'pause'){
                    pause.arrowUp();
                }else if(gameConfig.state === 'gameOver'){
                    gameOver.arrowUp();
                }
                break;
            case 'ArrowDown':
                if(gameConfig.state === 'menu'){
                    menu.arrowDown();
                }else if(gameConfig.state === 'pause'){
                    pause.arrowDown();
                }else if(gameConfig.state === 'gameOver'){
                    gameOver.arrowDown();
                }
                break;
            case 'ArrowLeft':
                if(gameConfig.state === 'menu'){
                    menu.arrowLeft();
                }else if(gameConfig.state === 'game'){
                    game.arrowLeft();
                }
                break;
            case 'ArrowRight':
                if(gameConfig.state === 'menu'){
                    menu.arrowRight();
                }else if(gameConfig.state === 'game'){
                    game.arrowRight();
                }
                break;
            case 'Enter':
                if(gameConfig.state === 'menu'){
                    game.reset();       // 메뉴 화면에서 Enter 시 game reset
                    menu.enter();
                }else if(gameConfig.state === 'pause'){
                    game.weaponStop();  // 중지 화면에서 Enter 시 무기 제거
                    pause.enter();
                }else if(gameConfig.state === 'gameOver'){
                    game.reset();       // 게임오버 화면에서 Enter 시 game reset
                    game.weaponStop();  // 게임오버 화면에서 Enter 시 무기 제거
                    gameOver.enter();
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
                }else if(gameConfig.state === 'pause'){
                    game.weaponStop();  // 중지 화면에서 ESC 시 무기 제거

                    // 중지 화면에서 ESC를 누르면 무조건 Resume
                    pause.selectedItem = 0;
                    pause.exit();
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