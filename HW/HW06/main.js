// Canvas Element 불러오기
var canvas = document.getElementById("GameScreenCanvas");
var ctx = canvas.getContext("2d");

class HeartObject {
    constructor() {
        this.color = getRandomColor(); // 색상 랜덤 선택
        this.speed = Math.random() * 2 + 1; // 이동 속도 (1에서 3 사이의 랜덤값)
        this.rotationSpeed = Math.random() * 0.1 - 0.05; // 회전 속도 (-0.05에서 0.05 사이의 랜덤값)
        this.direction = Math.random() * Math.PI * 2; // 이동 방향 (0에서 2π 사이의 랜덤값)
        this.positionX = canvas.width / 2; // 초기 X 위치 (캔버스 중앙)
        this.positionY = canvas.height / 2; // 초기 Y 위치 (캔버스 중앙)
    }

    update() {
        // 이동
        this.positionX += Math.cos(this.direction) * this.speed;
        this.positionY += Math.sin(this.direction) * this.speed;

        // 회전
        this.direction += this.rotationSpeed;

        // 화면 경계 처리
        if (this.positionX < 0 || this.positionX > canvas.width || this.positionY < 0 || this.positionY > canvas.height) {
            // 화면을 벗어나면 다시 중앙으로 이동
            this.positionX = canvas.width / 2;
            this.positionY = canvas.height / 2;
        }
    }

    draw() {
        ctx.save();
        ctx.translate(this.positionX, this.positionY);
        ctx.rotate(this.direction);
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(0, 50);
        ctx.bezierCurveTo(0, 50, 0, -70, -70, -70);
        ctx.bezierCurveTo(-170, -70, -170, 20, -170, 20);
        ctx.bezierCurveTo(-170, 90, -70, 170, 0, 200);
        ctx.bezierCurveTo(70, 170, 170, 90, 170, 20);
        ctx.bezierCurveTo(170, 20, 170, -70, 70, -70);
        ctx.bezierCurveTo(0, -70, 0, 50, 0, 50);
        ctx.fill();
        ctx.closePath();
        ctx.restore();
    }
 }
        
    


// 랜덤 색상 반환 함수
function getRandomColor() {
    var letters = "0123456789ABCDEF";
    var color = "#";
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

var hearts = [];

// 마우스 이벤트 처리
canvas.addEventListener("mousemove", function(event) {
    // 마우스 이동에 따라 하트 생성
    var heart = new HeartObject();
    heart.positionX = event.clientX;
    heart.positionY = event.clientY;
    hearts.push(heart);

    // 하트 개수가 100개가 넘으면 삭제
    if (hearts.length > 100) {
        hearts.shift(); // 가장 오래된 하트 삭제
    }
});

function render() {
    // 캔버스 초기화
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 모든 하트 업데이트 및 그리기
    hearts.forEach(function(heart) {
        heart.update();
        heart.draw();
    });

    // 0.2초마다 render 함수 호출
    setTimeout(function() {
        requestAnimationFrame(render);
    }, 200);
}

render();
