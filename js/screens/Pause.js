import { gameConfig } from "../global/Global.js";
import { CanvasProvider, TextDrawerProvider } from "../utils/Provider.js";

export class Pause{
    constructor(canvasProvider){
        this.canvasProvider = canvasProvider;
        this.canvasElement = canvasProvider.getCanvasElement();
        this.context = canvasProvider.getContext();

        this.otherCanvasId = 'otherCanvas';
        this.otherCanvasDOM = null;
        this.otherCanvasProvider = null;

        this.textDrawerProvider = null;
        this.pauseItems = ["Resume", "Go to Menu"];
        this.selectedItem = 0;
        this.menuX = 0;
        this.menuY = 0;
        this.itemSpacing = 40;
    }

    init(){
        this.textDrawerProvider = new TextDrawerProvider(this.otherCanvasProvider);
        this.textDrawerProvider.setFont("30px sans-serif");
        this.menuX = this.otherCanvasProvider.getCanvasElement().width / 2;
        this.menuY = this.otherCanvasProvider.getCanvasElement().height / 2;
    }

    createDOM(){
        // 기존 canvas 의 크기를 복사한 다른 canvas 를 생성
        if(!this.otherCanvasProvider && !this.otherCanvasDOM){
            // canvas DOM 생성
            this.otherCanvasDOM = document.createElement("canvas");

            // ID 설정과 크기 설정
            this.otherCanvasDOM.id = this.otherCanvasId;
            this.otherCanvasDOM.width = this.canvasElement.width;
            this.otherCanvasDOM.height = this.canvasElement.height;

            // otherCanvas 위치 설정
            this.otherCanvasDOM.style.position = 'absolute';

            // otherCanvas DOM 추가
            document.getElementById("canvasBox").appendChild(this.otherCanvasDOM);

            // 새로운 DOM Provider 객체로 생성
            this.otherCanvasProvider = new CanvasProvider(this.otherCanvasId);

            // 중지 메뉴를 그리기 위해 설정 초기화
            this.init();
        }
    }

    // 반투명 백그라운드 그리기
    bgDraw(){
        const width = this.otherCanvasProvider.getCanvasElement().width;
        const height = this.otherCanvasProvider.getCanvasElement().height;
        this.otherCanvasProvider.getContext().fillStyle = 'rgba(0, 0, 0, 0.5)';
        this.otherCanvasProvider.getContext().fillRect(0, 0, width, height);
    }

    exit(){
        if(this.otherCanvasProvider && this.otherCanvasDOM){
            document.getElementById("canvasBox").removeChild(this.otherCanvasDOM);
            this.otherCanvasDOM = null;
            this.otherCanvasProvider = null;
        }

        if(this.selectedItem === 0){
            gameConfig.changeGame();
        }else if(this.selectedItem === 1){
            const characters = [];
            // 반전, 깜빡임, Idle로 초기화 설정
            gameConfig.characters.map((e, idx) => {
                if(gameConfig.characterIDX === idx){
                    e.isFlipped = false;
                    e.blink.stop();
                    e.initImage();
                }
                characters.push(e)
            })

            gameConfig.characters = characters;
            console.log("캐릭터 반전 초기화, 캐릭터 깜빡임, Idle 이미지로 변경")
            this.selectedItem = 0;
            console.log("메뉴 선택 커서 초기화")

            gameConfig.changeMenu();
        }
    }


    handlePause() {
        switch (this.selectedItem) {
            case 0:
                // Resume Game
                console.log("Resume Game");
                this.exit();
                break;
            case 1:
                // Go to Menu
                console.log("Go to Menu");
                this.exit();
                break;
        }
    }

    // 중지 메뉴 선택 그리기
    pauseDraw(){
        for (let i = 0; i < this.pauseItems.length; i++) {
            const menuItem = this.pauseItems[i];
            const x = this.menuX;
            const y = this.menuY + i * this.itemSpacing;

            if (i === this.selectedItem) {
                this.textDrawerProvider.setColor("blue");
            } else {
                this.textDrawerProvider.setColor("black");
            }

            this.textDrawerProvider.drawText(menuItem, x, y);
        }
    }

    // 조작 함수
    arrowUp(){
        if (this.selectedItem > 0) {
            this.selectedItem--;
        }
    }
    arrowDown(){
        if (this.selectedItem < this.pauseItems.length - 1) {
            this.selectedItem++;
        }
    }
    enter(){
        this.handlePause();
    }

    start(){
        // 화면 지우기
        if(this.otherCanvasProvider && this.otherCanvasDOM){
            this.otherCanvasProvider.clearCanvas();
        }

        this.createDOM();
        this.bgDraw();
        this.pauseDraw();
    }
}