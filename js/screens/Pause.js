import { gameConfig } from "../global/Global.js";
import { CanvasProvider, LocalStorageProvider, TextDrawerProvider } from "../utils/Provider.js";

export class Pause{
    constructor(canvasProvider){
        this.canvasProvider = canvasProvider;
        this.canvasElement = canvasProvider.getCanvasElement();
        this.context = canvasProvider.getContext();

        this.otherCanvasId = 'otherCanvas';
        this.otherCanvasDOM = null;
        this.otherCanvasProvider = null;

        this.textDrawerProvider = null;
        this.textDrawerProvider = null;
        this.scoreDrawerProvider = null;
        this.bestScoreDrawerProvider = null;
        this.titleDrawerProvider = null;
        this.title = "PAUSE"
        this.pauseItems = ["Resume", "Go to Menu"];
        this.selectedItem = 0;
        this.menuX = 0;
        this.menuY = 0;
        this.itemSpacing = 40;
    }

    reset(){
        // 반전, 깜빡임, Idle로 초기화 설정
        gameConfig.characters[gameConfig.characterIDX].isFlipped = false;
        gameConfig.characters[gameConfig.characterIDX].blink.stop();
        gameConfig.characters[gameConfig.characterIDX].initImage();
        console.log("캐릭터 반전 초기화, 캐릭터 깜빡임, Idle 이미지로 변경")

        this.selectedItem = 0;
        console.log("메뉴 선택 커서 초기화")

        this.canvasProvider.getCanvasElement().style.backgroundImage = `url("${gameConfig.backgrounds[5].src}")`;
    }

    init(){
        this.textDrawerProvider = new TextDrawerProvider(this.otherCanvasProvider);
        this.titleDrawerProvider = new TextDrawerProvider(this.otherCanvasProvider);
        this.scoreDrawerProvider = new TextDrawerProvider(this.otherCanvasProvider);
        this.bestScoreDrawerProvider = new TextDrawerProvider(this.otherCanvasProvider);

        this.textDrawerProvider.setFont("30px sans-serif");
        this.menuX = this.otherCanvasProvider.getCanvasElement().width / 2;
        this.menuY = this.otherCanvasProvider.getCanvasElement().height / 2;

        // 로컬 스토리지 조회 후 없으면 생성
        const score = LocalStorageProvider.getItem("score");

        if(!score){
            LocalStorageProvider.setItem("score", 0);
        }
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

    // 메뉴에 보이는 빈 사각형 그리기
    rectDraw(){
        const width = 400;
        const height = 600;
        const x = (this.otherCanvasProvider.getCanvasElement().width / 2) - width / 2;
        const y = (this.otherCanvasProvider.getCanvasElement().height / 2) - height / 2;

        this.otherCanvasProvider.getContext().fillStyle = "#FFFFFF"; // 사각형의 색상
        this.otherCanvasProvider.getContext().fillRect(x, y, width, height); // 사각형 그리기
    }

    // 메뉴 제목을 설정 (pause - game over)
    titleDraw(){
        const x = (this.otherCanvasProvider.getCanvasElement().width / 2);
        const y = (this.otherCanvasProvider.getCanvasElement().height / 2) - 200;

        this.titleDrawerProvider.setFont("60px sans-serif");
        this.titleDrawerProvider.setColor('black');
        this.titleDrawerProvider.drawText(this.title, x, y);
    }

    // 점수 그리기 (pause - game over)
    scoreDraw(){
        const x = (this.otherCanvasProvider.getCanvasElement().width / 2);
        const y = (this.otherCanvasProvider.getCanvasElement().height / 2) - 100;

        // 로컬스토리지에 저장된 최고 점수 가져오기
        const bestScore = LocalStorageProvider.getItem("score")

        this.scoreDrawerProvider.setFont("20px sans-serif");
        this.scoreDrawerProvider.drawText(`Score: ${gameConfig.score}`, x, y);

        this.bestScoreDrawerProvider.setFont("20px sans-serif");
        this.bestScoreDrawerProvider.drawText(`Best Score: ${bestScore}`, x, y - 20);

        if(gameConfig.score <= bestScore){
            this.bestScoreDrawerProvider.setColor('green');
            this.scoreDrawerProvider.setColor('black');
        }else{
            this.scoreDrawerProvider.setColor('green');
            this.bestScoreDrawerProvider.setColor('black');
        }
    }

    exit(){
        if(this.otherCanvasProvider && this.otherCanvasDOM){
            document.getElementById("canvasBox").removeChild(this.otherCanvasDOM);
            this.otherCanvasDOM = null;
            this.otherCanvasProvider = null;
        }

        if(this.selectedItem === 0){
            gameConfig.characters[gameConfig.characterIDX].initImage();
            gameConfig.changeGame();

        }else if(this.selectedItem === 1){
            this.reset();
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
        this.rectDraw();
        this.titleDraw();
        this.scoreDraw();
        this.pauseDraw();
    }
}

export class GameOver extends Pause{
    constructor(canvasProvider){
        super(canvasProvider)
        this.title = "GAME OVER";
        this.pauseItems = ["Retry", "Go to Menu"];
    }

    
    handlePause() {
        const bestScore = LocalStorageProvider.getItem("score")

        console.log(bestScore, gameConfig.score);

        if(bestScore < gameConfig.score){
            LocalStorageProvider.setItem("score", gameConfig.score);
        }

        gameConfig.score = 0;
        console.log("점수 초기화")

        switch (this.selectedItem) {
            case 0:
                // Resume Game
                console.log("Retry Game");
                this.exit();
                break;
            case 1:
                // Go to Menu
                console.log("Go to Menu");
                this.exit();
                break;
        }
    }

    // 재정의
    start(){
        super.start();
    }
}