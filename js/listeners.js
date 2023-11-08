function listener(menu, game, pause){
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
}