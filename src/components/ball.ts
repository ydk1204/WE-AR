export class Ball {
  private i: number;
  private radius: number;
  private angle: number;
  private vx: number;
  private vy: number;
  private container: Ball[];
  private x: number;
  private y: number;
  constructor(i: number, tempRadius: number, tempSpeed: number) {
    this.radius = tempRadius;
    this.angle = Math.floor(Math.random() * 360);
    // 공이 움직이는 속도
    this.vx = tempSpeed * Math.cos(this.angle);
    this.vy = tempSpeed * Math.sin(this.angle);
    this.container = [];

    this.i = i;

    // 공이 화면 밖에 생성되면 안되기 때문에 고정된 캔버스 사이즈에서
    // 최대 공의  반지름인 20px * 2 = 40의 값을 x축과 y축에서 제외한 범위 내에서 생성되도록 설정
    this.x = Math.floor(Math.random() * 960);
    this.y = Math.floor(Math.random() * 460);
    
  }

  // 생성된 공 중 자기 자신을 제외한 공들의 정보를 개별마다 담음
  check(boxes: Ball[]) {
    console.log(boxes.length)
    for (let ball of boxes) {
      if (ball.i !== this.i) {
        this.container.push(ball);
      }
    }
  }

  draw(ctx:CanvasRenderingContext2D, stageWidth:number, stageHeight:number) {
    // 지속적으로 값이 증가함으로써 공이 움직이는 것처럼 보임
    this.x += this.vx;
    this.y += this.vy;
	  // 공이 화면 끝에 충돌하면 반대로 이동
    this.bounceWindow(stageWidth, stageHeight);    
    // 공과 공이 충돌하면 반대로 이동
    this.collisionBall(this.container);

    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }

  bounceWindow(stageWidth:number, stageHeight:number) {
    const minX = this.radius;
    const maxX = stageWidth - this.radius;
    const minY = this.radius;
    const maxY = stageHeight - this.radius;
	  // 화면 끝에 닿으면
    if (this.x <= minX || this.x >= maxX) {
      // 반대로 이동
      this.vx *= -1;
      this.x += this.vx;
    }
    if (this.y <= minY || this.y >= maxY) {
      this.vy *= -1;
      this.y += this.vy;
    }
  }

  collisionBall(balls: Ball[]) {
    for (let ball of balls) {
      let distancX = Math.pow(this.x - ball.x,2);
      let distancY = Math.pow(this.y - ball.y,2);
      // 공 사이의 간격
      let After = {
          MoveBetween : Math.sqrt(distancX + distancY) ,
          Between : ball.radius + this.radius   
      }
      // 공이 맞닿는 경우 반대로
      if(After.MoveBetween < After.Between){

        this.vx *= -1;
        this.vy *= -1;

        this.x += this.vx;
        this.y += this.vy;
      } 
    }
  }
}