import {HEIGHT, midHeight, midWidth, width, WIDTH} from "./variables";

export class Points{
  public points:number =0;
  constructor(private x:number) {
      this.points = x
  }

  render(ctx:CanvasRenderingContext2D)
  {
      ctx.font = "20px Arial";
      ctx.fillText(`Points: ${this.points}`, 10, 20);
  }
  addPoints()
  {
      this.points +=1
  }
  renderNewGame(ctx:CanvasRenderingContext2D,hasWon:boolean|null)
  {
      ctx.beginPath();
      ctx.fillStyle = "black";
      ctx.fillRect(WIDTH/2 - width*3, HEIGHT/2-width*2, width*7, width*4);
      ctx.stroke();
      ctx.fillStyle = "white";
      if(hasWon)
      {
          ctx.font = "20px Arial";
          ctx.fillText("Gratuluje wygrałeś!", WIDTH/2 - 30, HEIGHT/2 - width);
          ctx.fillText(`Uzyskałeś: ${this.points} punktów`, WIDTH/2 - 40, HEIGHT/2);
          ctx.fillText("Zagraj ponownie [ENTER]", WIDTH/2 - 60, HEIGHT/2 + width);
      }
      else
      {
          ctx.font = "30px Arial";
          ctx.fillText("Przegrałeś", WIDTH/2 - 30, HEIGHT/2 - width);
          ctx.fillText("Zagraj ponownie [ENTER]", WIDTH/2 - 120, HEIGHT/2 + width);

      }

  }
}