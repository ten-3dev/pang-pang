import { gameConfig } from "../global/Global.js";
import { TextDrawerProvider } from "../utils/Provider.js";

export class Menu{
    constructor(canvasProvider){
        this.canvasProvider = canvasProvider;
        this.canvas = canvasProvider.getCanvasElement();
        this.context = canvasProvider.getContext();

        this.menuTextDrawerProvider = null;

        this.menuItems = ["Start Game", "Exit"];
        this.selectedItem = 0;
        this.selectedChar = 0;
        this.itemSpacing = 40;
        this.menuX = this.canvas.width / 2;
        this.menuY = this.canvas.height / 2;
        
        this.init();
    }

    reset(){
        this.selectedItem = 0;
        this.selectedChar = 0;
        console.log("캐릭터와 메뉴 커서를 초기화")
    }

    // 초기설정
    init(){
        this.menuTextDrawerProvider = new TextDrawerProvider(this.canvasProvider);
        this.menuTextDrawerProvider.setFont("30px sans-serif");
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
                gameConfig.characterIDX = this.selectedChar;
                this.reset();   // 다시 메뉴에 진입할 걸 대비해 미리 reset
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
                this.menuTextDrawerProvider.setColor("blue");
            } else {
                this.menuTextDrawerProvider.setColor("black");
            }

            this.menuTextDrawerProvider.drawText(menuItem, x, y);
        }
    }

    // 캐릭터 테두리 그리기
    createStroke(color, lineWidth, sizeWidth, sizeHeight, x, y){
        this.context.strokeStyle = color;  // 테두리 색상 설정
        this.context.lineWidth = lineWidth;       // 테두리 두께 설정
        const strokeWidth = sizeWidth;
        const strokeHeight = sizeHeight;
        const strokeX = x - sizeWidth / 2     // 더 정확히 중앙에 올 수 있도록
        const strokeY = y;
        this.context.strokeRect(strokeX, strokeY, strokeWidth, strokeHeight);
    }

    // 캐릭터 위치 선정 및 그리기
    characterDraw(){
        const character = gameConfig.characters[this.selectedChar];
        const x = this.menuX - character.frameWidth;
        const y = this.menuY - 250;
        // 정확한 위치를 맞추기 위해 임의 수를 뺌
        character.changeX_Y(x - 15, y);
        character.draw();
    }

    // 시작
    start(){
        this.canvasProvider.clearCanvas();
        this.menuDraw();

        // 캐릭터 및 테두리 그리기
        this.createStroke('blue', 8, 180, 200, (this.canvas.width / 2), 140);
        this.characterDraw();
    }
}