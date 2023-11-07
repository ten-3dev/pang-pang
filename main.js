const menu = new Menu(canvasProvider)
const game = new Game()

// 리소스 로딩을 모두 끝낸 후에 메뉴 시작
window.onload = () => {
    function animate() {
        requestAnimationFrame(animate);
        if(toggle){
            menu.start()
        }else{
            game.start()
        }
    }
    
    animate(); // 애니메이션 시작
}