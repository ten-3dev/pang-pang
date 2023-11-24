import { gameConfig } from "../global/Global.js";
import { CanvasProvider } from "../utils/Provider.js";

export class Pause{
    constructor(canvasProvider){
        this.canvasProvider = canvasProvider;
        this.canvasElement = canvasProvider.getCanvasElement();
        this.context = canvasProvider.getContext();

        this.otherCanvasId = 'otherCanvas';
        this.otherCanvasDOM = null;
        this.otherCanvasProvider = null;
    }

    init(){
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

        gameConfig.changeGame();
    }

    start(){
        // 화면 지우기
        if(this.otherCanvasProvider && this.otherCanvasDOM){
            this.otherCanvasProvider.clearCanvas();
        }

        this.init();
        this.bgDraw();
    }
}