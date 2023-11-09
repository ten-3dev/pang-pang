var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

var spriteImage = new Image();
spriteImage.src = './assets/character/1/Idle.png'; // 스프라이트 이미지 파일 경로

spriteImage.onload = function () {
    // 이미지를 원래 크기로 그림
    // ctx.drawImage(spriteImage, 0, 0);

    // 이미지를 좌우로 반전하여 그림
    ctx.scale(-1, 1); // X 방향으로 -1을 곱함 (좌우 반전)
    ctx.drawImage(spriteImage, -spriteImage.width, 0);

    // 다시 원래 크기로 복원
    // ctx.scale(-1, 1); // 원래 크기로 돌려놓음
};
