import { Ball } from "./components/ball.js";

class App {  
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D | null;
  private boxes: Ball[] | undefined;
  private rand: number;
  private stageWidth: number;
  private stageHeight: number;

  constructor() {
    this.canvas = document.createElement("canvas");
    // 10~20 사이의 공 생성을 위한 랜덤 값
    this.rand = Math.floor(Math.random() * 10) + 10;

    document.body.appendChild(this.canvas);

    this.ctx = this.canvas.getContext("2d");
    this.boxes = [];

    this.stageWidth = 1000;
    this.stageHeight = 500;

    this.canvas.width = this.stageWidth;
    this.canvas.height = this.stageHeight;
  
    this.ctx && this.ctx.scale(1, 1);

    // 여러 공을 만들기 위해 변수 지정
    let tempRadius, tempSpeed, box;
    // 반복문을 통해 공 여러번 생성
    for(let i=0; i <= this.rand; i++){
      tempRadius = Math.floor(Math.random() * (20 - 10 + 1)) + 10;
      tempSpeed = Math.floor(Math.random() * (4 - 2 + 1)) + 2;
      box = new Ball(i, tempRadius, tempSpeed);
      this.boxes.push(box);
    }

    // 생성된 공마다 자기 자신을 제외한 공의 정보를 확인(공과 공이 충돌 했을 때 반대로 이동하기 위해 각 공의 정보 필요)
    for (let i = 0; i <= this.rand; i++) {
      if (this.boxes !== undefined) {
        this.boxes[i]?.check(this.boxes);
      }
    }
    
    
    window.requestAnimationFrame(this.animate.bind(this));
  }
  
  animate() {
    window.requestAnimationFrame(this.animate.bind(this));
	  // 만들어진 공을 그림
    
    this.ctx && this.ctx.clearRect(0, 0, this.stageWidth, this.stageHeight);
    
    for (let i = 0; i <= this.rand; i++){
      if (this.boxes !== undefined) {
        if (this.ctx !== null) {
          this.boxes[i]?.draw(this.ctx, this.stageWidth, this.stageHeight);
        }
      }
    }
  }
}
// 캔버스 실행
window.onload = () => {
  new App();
};