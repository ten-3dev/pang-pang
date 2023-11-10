// 이미지를 좌우로 반전하는 함수
function flipImage(img) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = img.width;
    canvas.height = img.height;
    ctx.scale(-1, 1);
    ctx.drawImage(img, -img.width, 0);
    const flippedImg = new Image();
    flippedImg.src = canvas.toDataURL();
    return flippedImg;
}

// 모든 리소스를 로드하기 위해서 처음 재귀로 모두 로드시킴
function loadImages(index) {
    if (index >= gameConfig.img_src.length) {
        return;
    }

    const img = new Image();
    img.src = gameConfig.img_src[index];
    img.onload = () => {
        // 모든 리소스 중 캐릭터 폴더에 있는 사진들은 곧바로 애니메이터 객체 생성
        if(gameConfig.img_src[index].includes('character')) {
            // 이미지를 좌우로 반전시킴
            const flippedImg = flipImage(img);
            gameConfig.characters.push(new CharacterAnimate(canvasProvider, flippedImg, 10, 4, 0, 0, 4));
        }
        loadImages(index + 1);
    };
}

loadImages(0);
