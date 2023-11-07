class Menu {
    constructor(canvasProvider, characters) {
        this.canvas = canvasProvider.getCanvasElement();
        this.context = canvasProvider.getContext();
        this.menuItems = ["Start Game", "Exit"];
        this.characters = characters;
        this.selectedItem = 0;
        this.selectedChar = 0;
        this.itemSpacing = 40;
        this.menuX = this.canvas.width / 2;
        this.menuY = this.canvas.height / 2;
        this.menuFont = "30px sans-serif";
        this.initializeInputListeners();
    }

    initializeInputListeners() {
        document.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowUp' && this.selectedItem > 0) {
                this.selectedItem--;
            } else if (event.key === 'ArrowDown' && this.selectedItem < this.menuItems.length - 1) {
                this.selectedItem++;
            } else if (event.key === 'ArrowLeft' && this.selectedChar > 0) {
                this.selectedChar--;
            } else if (event.key === 'ArrowRight' && this.selectedChar < this.characters.length - 1) {
                this.selectedChar++;
            } else if (event.key === 'Enter') {
                this.handleMenuItemSelection();
            }
        });
    }

    handleMenuItemSelection() {
        switch (this.selectedItem) {
            case 0:
                // Start Game
                console.log("Start Game selected");
                break;
            case 1:
                // Exit
                console.log("Exit");
                break;
        }
    }

    draw() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.context.textAlign = "center";
        this.context.font = this.menuFont;

        // 캐릭터 테두리 그리기
        this.context.strokeStyle = 'blue';  // 테두리 색상 설정
        this.context.lineWidth = 8;       // 테두리 두께 설정

        const strokeWidth = 180
        const strokeHeight = 200
        const strokeX = (this.canvas.width - strokeWidth) / 2
        const strokeY = 160

        this.context.strokeRect(strokeX, strokeY, strokeWidth, strokeHeight);

        for(let i = 0; i < this.characters.length; i++){
            const character = this.characters[i];
            const x = this.menuX - character.frameWidth;
            const y = this.menuY - 250;

            if(this.selectedChar === i){
                character.changeX_Y(x - 15, y);
                character.draw();
            }
        }

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
}