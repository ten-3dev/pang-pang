class Menu{
    constructor(){
        this.canvas = canvasProvider.getCanvasElement();
        this.context = canvasProvider.getContext();
        this.menuItems = ["Start Game", "Exit"];
        this.selectedItem = 0;
        this.selectedChar = 0;
        this.itemSpacing = 40;
        this.menuX = this.canvas.width / 2;
        this.menuY = this.canvas.height / 2;
        this.menuFont = "30px sans-serif";
        this.init();
    }

    // 초기설정
    init(){
        console.log('메뉴 시작');
        this.context.textAlign = "center";
        this.context.font = this.menuFont;
    }

    // 조작 함수
    arrowUp(){
        if (this.selectedItem > 0) {
            this.selectedItem--;
        }
    }
    arrowDown(){
        if (this.selectedItem < this.menuItems.length - 1) {
            this.selectedItem++;
        }
    }
    arrowLeft(){
        if (this.selectedChar > 0) {
            this.selectedChar--;
        }
    }
    arrowRight(){
        if (this.selectedChar < gameConfig.characters.length - 1) {
            this.selectedChar++;
        }
    }
    enter(){
        this.handleMenu();
    }

    handleMenu() {
        switch (this.selectedItem) {
            case 0:
                // Start Game
                console.log("Start Game selected");
                canvasProvider.clearCanvas();
                gameConfig.characterIDX = this.selectedChar;
                // 게임으로 전환
                gameConfig.changeGame();
                break;
            case 1:
                // Exit
                console.log("Exit");
                break;
        }
    }

    // 메뉴 선택 그리기
    menuDraw(){
        for (let i = 0; i < this.menuItems.length; i++) {
            const menuItem = this.menuItems[i];
            const x = this.menuX;
            const y = this.menuY + i * this.itemSpacing;

            if (i === this.selectedItem) {
                this.context.fillStyle = "blue";
            } else {
                this.context.fillStyle = "black";
            }

            this.context.fillText(menuItem, x, y);
        }
    }

    // 캐릭터 테두리 그리기
    createStroke(context, color, lineWidth, sizeWidth, sizeHeight, x, y){
        this.context.strokeStyle = color;  // 테두리 색상 설정
        this.context.lineWidth = lineWidth;       // 테두리 두께 설정
        const strokeWidth = sizeWidth;
        const strokeHeight = sizeHeight;
        const strokeX = ((this.canvas.width - strokeWidth) / 2)     // 테두리 크기 비례 자동 중앙 정렬
        const strokeY = y;
        context.strokeRect(strokeX, strokeY, strokeWidth, strokeHeight);
    }

    // 캐릭터 위치 선정 및 그리기
    characterDraw(){
        const character = gameConfig.characters[this.selectedChar];
        const x = this.menuX - character.frameWidth;
        const y = this.menuY - 250;
        character.changeX_Y(x - 15, y);
        character.draw();
    }

    // 시작
    start(){
        canvasProvider.clearCanvas();
        this.menuDraw();
        this.createStroke(this.context, 'blue', 8, 180, 200, 180, 160);
        this.characterDraw();
    }
}