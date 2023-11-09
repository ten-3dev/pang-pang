var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

class Box {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.dx = 0; // X 방향 이동 속도
  }

  draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillRect(this.x, this.y, this.size, this.size);
  }

  move() {
    this.x += this.dx;
  }
}

var box = new Box(50, 50, 50);

// 키보드 이벤트 핸들러 함수
document.addEventListener("keydown", function (event) {
  switch (event.key) {
    case "ArrowLeft":
      box.dx = -10;
      break;
    case "ArrowRight":
      box.dx = 10;
      break;
  }
});

document.addEventListener("keyup", function (event) {
  switch (event.key) {
    case "ArrowLeft":
    case "ArrowRight":
      box.dx = 0;
      break;
  }
});

// 애니메이션 프레임 업데이트
function update() {
  box.move();
  box.draw();
  requestAnimationFrame(update);
}

// 초기 애니메이션 시작
update();
